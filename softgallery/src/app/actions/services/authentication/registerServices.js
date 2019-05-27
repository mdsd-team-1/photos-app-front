import request from '../requestWrapper';

function register(data, token){

  return request({
    url: '/user/create',
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    }
  });

};

const registerService = {
  register
};

export default registerService;