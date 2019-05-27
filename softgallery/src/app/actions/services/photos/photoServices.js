import request from '../requestWrapper';

function getAllPhotos(){

  return request({
    url: '/photo/all',
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + localStorage.access_token
    }
  });

};

const photoService = {
  getAllPhotos
};

export default photoService;