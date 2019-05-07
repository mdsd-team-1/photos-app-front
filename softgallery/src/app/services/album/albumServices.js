import request from '../requestWrapper';

function createAlbum(data, id) {

  let new_data = {
    name: data,
    user_id: id
  };

  return request({
    url: '/album/create',
    method: 'POST',
    data: new_data,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.access_token
    }
  });

};

function getAlbums(id){

  return request({
    url: '/user/'+id+'/albums',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.access_token
    }
  });

};


function getPhotos(id){

  return request({
    url: '/album/'+id+'/photos',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.access_token
    }
  });

};

const albumService = {
  createAlbum, getAlbums, getPhotos
};

export default albumService;