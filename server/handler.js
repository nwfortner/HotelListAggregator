const { parseHotelData, requestHotelData, mergeSortedArraysByEcstasy } = require('./controllers.js');

module.exports = {

  // Call scraper API, parse JSON response, merge parsed data,
  // and respond to HTTP request with merged and sorted by ecstasy hotel data;

  async hotelSearchHandler(req, res) {
    let hotelData;
    try {
      hotelData = await requestHotelData();
    } catch (error) {
      res.status(400).json({ error });
      return;
    }
    const mergedData = mergeSortedArraysByEcstasy(parseHotelData(hotelData));
    res.status(200).json({
      results: mergedData
    });
  },

  // Catch all routes not of type Get /hotels/search and respond with error

  catchAllRoutesHandler(req, res) {
    res.status(400).json({
      error: 'This api only serves request to route "GET /hotels/search". Please try again.'
    });
  }

};
