import request from '../requestWrapper';

function uploadPhoto(data){
 
  let bodyFormData = new FormData();
  bodyFormData.append('file', data.file);
  bodyFormData.append('photo_name', data.photo_name);
  bodyFormData.append('album_id', data.album_id);

  return request({
    url: '/photo/upload',
    method: 'POST',
    data: bodyFormData,
    /*headers: {
      isFile: true
    }*/
    headers: {
      'Content-Type': 'application/x-www-form-data',
      "Authorization": "Bearer " + localStorage.access_token
    }
  });
};

const uploadService = {
  uploadPhoto
};

export default uploadService;