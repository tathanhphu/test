var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/task/UpdateAll', function(req, res, next) {
  const t = (+req.query.time || 60) *  1000; // one minute
  setTimeout(() => {
    res.send(`Reponse from server after ${t}ms`);
  }, t );
});
module.exports = router;
