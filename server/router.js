const router = require('express').Router();
const { hotelSearchHandler } = require('./handler.js');

// Handle get request on route /hotels/search
router.get('/hotels/search', hotelSearchHandler);

// Handle all other requests made to this API
router.all('*', (req, res) => {
  res.status(400).json({
    error: 'This api only serves request to route "GET /hotels/search". Please try again.'
  });
});

module.exports = router;
