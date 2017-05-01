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
    const mergedData = mergeSortedArraysByEcstasy(parseHotelData(hotelData));
    res.status(200).json(mergedData);
  }
};
