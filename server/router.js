const router = require('express').Router();
const { hotelSearchHandler, catchAllRoutesHandler } = require('./handler.js');

// Handle get request on route /hotels/search
router.get('/hotels/search', hotelSearchHandler);

// Handle all other requests made to this API and respond with error
router.all('*', catchAllRoutesHandler);

module.exports = router;
