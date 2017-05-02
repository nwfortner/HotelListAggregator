const requestPromise = require('request-promise');
const providers = require('../providers.json');


module.exports = {

  // Make get requests to scraper API for all providers asynchronously

  async requestHotelData() {
    let hotelData;
    try {
      hotelData = await Promise.all(
        providers.map(provider => requestPromise(`http://localhost:9000/scrapers/${provider}`))
      );
    } catch (error) {
      hotelData = error;
    }
    return hotelData;
  },

  // Parse array of JSON responses from scraper API and return as 2D array of arrays.

  parseHotelData(hotelData) {
    return hotelData.map(JSON.parse).map(entry => entry.results);
  },

  // Merge sorted response data into one list of responses,
  // sorted in descending order by ecstasy.

  // The single argument for the mergeSortedArraysByEcstasy function
  // is a 2D list(Array of Arrays) containing the individual lists(Array)
  // retreived by the scraper API.

  mergeSortedArraysByEcstasy(parsedHotelData) {
    let mergedResult = [];
    let tempMergedResult = [];

    // Iterate over the list of lists
    for (let i = 0; i < parsedHotelData.length; i++) {

      // For each of these sorted lists merge the data into an aggreagte list
      // that is itself sorted.

      while (parsedHotelData[i].length && tempMergedResult.length) {

        // Given the lists are sorted and the aggreagate list is also sorted
        // we can be sure that the values at index 0 will always have the highest ecsatasy values.
        // Therefore we compare the valaues at index 0, remove the larger value, and insert it
        // into the aggregate list. This method always maintains a sorted aggregate list.

        if (parsedHotelData[i][0].ecstasy > tempMergedResult[0].ecstasy) {
          mergedResult.push(parsedHotelData[i].shift());
        } else {
          mergedResult.push(tempMergedResult.shift());
        }
      }

      // Once one of the lists has been exhausted of its values, this means the remaining values
      // in the other list are all lower than the lowest value of the exhausted list. We now
      // conactenate the remainder onto the aggregate.

      if (parsedHotelData[i].length) {
        mergedResult.push(...parsedHotelData[i]);
      }
      if (tempMergedResult.length) {
        mergedResult.push(...tempMergedResult);
      }

      // Below on each iteration, except for the final iteration, we reassign the mergedResult over
      // to a new variable and assign mergedResult to an empty array to be used again as the
      // aggregaor array in the next iteration. On the final iteration we return the mergedResult
      // array as all values will have now been merged into in.

      if (i < parsedHotelData.length - 1) {
        tempMergedResult = mergedResult;
        mergedResult = [];
      }
    }

    // The result will be a a list(Array) of hotel data sorted by ecstasy in descending order.

    return mergedResult;
  }

};
