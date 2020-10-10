const axios = require('axios').default;
const qs = require('querystring');

function buildHeader(tokenType, accessToken) {
  return {
    Authorization: `${tokenType} ${accessToken}`
  }
}
async function login(qtestUrl, username, password) {
  let ret = undefined;
  try {
    ret = await axios.post(`${qtestUrl}/oauth/token`, qs.stringify({
      grant_type: 'password',
      username,
      password
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic d2ViLWV4cGxvcmVyOkRnZ0NZZ0RSU2F5djEwY2EyV2NrRWFKUnpLRFRhU1gy'
      }
    });
  } catch (error) {
    console.error(error);
  }
  return ret;
} 

async function getUserInfo(qtestUrl, headers) {
  let ret = undefined;
  try {
    const reevaluate = axios.get(`${qtestUrl}/api/v3/re-evaluation`, { headers });
    const projects = axios.get(`${qtestUrl}/api/v3/projects`, { headers });
    const rets = await Promise.all([reevaluate, projects]);
    ret = {
      first_name: rets[0].data.first_name,
      user_name: rets[0].data.user_name,
      last_name: rets[0].data.last_name,
      client_id: rets[0].data.client_id,
      projects: rets[1].data.map(element => {
        return element.id
      }) || []
    }
  } catch (error) {
    console.error(error);
  }
  return ret;
}


module.exports = {
  login,
  buildHeader,
  getUserInfo
};