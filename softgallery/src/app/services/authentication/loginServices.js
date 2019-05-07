import request from '../requestWrapper';
import loginRequest from '../requestWrapperAux';
import queryString from 'query-string';

function token() {
 
  let data = { 
    username: "web_client",
    password: "secret",
    grant_type: "password"
  };  

  return loginRequest({
    url: '/oauth/token',
    method: 'POST',
    data: queryString.stringify(data),
    auth: {
      username: "modelos-client",
      password: "modelos-secret"
    },
    headers: { 
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });
};

function login(email, password, token){
  console.log(token);
  let data = {
    email: email,
    password: password,
  };

  return request({
    url: '/user/login',
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    }
  }); 
};

const userSessionService = {
  token, login
};

export default userSessionService;