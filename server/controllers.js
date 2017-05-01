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

  // Parse array of JSON responses from scraper API

  parseHotelData(hotelData) {
    return hotelData.map(JSON.parse).map(entry => entry.results);
  },

  // Merge sorted response data into one list of responses,
  // sorted in descending order by ecstasy.

  mergeSortedArraysByEcstasy(parsedHotelData) {
    let mergedResult = [];
    let tempMergedResult = [];
    for (let i = 0; i < parsedHotelData.length; i++) {
      while (parsedHotelData[i].length && tempMergedResult.length) {
        if (parsedHotelData[i][0].ecstasy > tempMergedResult[0].ecstasy) {
          mergedResult.push(parsedHotelData[i].shift());
        } else {
          mergedResult.push(tempMergedResult.shift());
        }
      }
      if (parsedHotelData[i].length) {
        mergedResult.push(...parsedHotelData[i]);
      }
      if (tempMergedResult.length) {
        mergedResult.push(...tempMergedResult);
      }
      if (i < parsedHotelData.length - 1) {
        tempMergedResult = mergedResult;
        mergedResult = [];
      }
    }
    return mergedResult;
  }

};
