const express = require('express');
const app = express();
const router = require('./router.js');


app.use(router);

app.listen(8000, () => {
  console.log('Hipmunk search aggregator listening on port 8000');
});
