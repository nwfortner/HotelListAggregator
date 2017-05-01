const { parseHotelData, requestHotelData, mergeSortedArraysByEcstasy } = require('./controllers.js');

module.exports = {
  async hotelSearchHandler(req, res) {
    let hotelData;
    try {
      hotelData = await requestHotelData();
    } catch (error) {
      res.status(400).json({ error });
      return;
    }
    res.status(200).json(mergeSortedArraysByEcstasy(parseHotelData(hotelData)));
  }
};
