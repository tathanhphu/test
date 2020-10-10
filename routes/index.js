var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TA lite' });
});

router.get('/task/UpdateAll', function(req, res, next) {
  const t = (process.env.TIME_IN_SECOND || 1) *  1000;
  setTimeout(() => {
    res.send(`Reponse from server after ${t}ms`);
  }, t );
});
module.exports = router;
