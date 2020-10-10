var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { response } = require('../app');
var http = require('../utils/http');
const PRIVATE_KEY = 'a6ded638f7c16cf27cb048dadcb31ae05f5f771af8121a013cdba583fdebbc0e';
const METABASE_URL = 'http://localhost:3000';
const COOKIE_OPTION =  {
  maxAge: 1209600 * 1000, // millisecond
  httpOnly: true,
  secure: false
}
/* POST auth. */
router.post('/', async (req, res, next) => {
  const qtestUrl = req.body.qtestUrl;
  const username = req.body.username;
  const password = req.body.password;
  let loginRet = await http.login(qtestUrl, username, password);
  if (loginRet && 200 === loginRet.status) {
    const accessToken = loginRet.data.access_token;
    const headers = http.buildHeader(loginRet.data.token_type, accessToken);
    const userInfo = await http.getUserInfo(qtestUrl, headers);
    var token = jwt.sign({ 
      email: userInfo.user_name,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      projects: userInfo.projects.join(','),
      clientId: userInfo.client_id
    }, PRIVATE_KEY);
    return res.redirect(`${METABASE_URL}/auth/sso?jwt=${token}&return_to=/`)  
  }
  res.render('index', { title: 'TA lite', error: 'Double check your credential' });
});

module.exports = router;
