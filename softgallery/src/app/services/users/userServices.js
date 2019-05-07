import request from '../requestWrapper';

function getUser(id) {

  return request({
    url: '/user/id/'+id,
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + localStorage.access_token
    }
  });

};


function editUser(id, data) {
  console.log(data);

  return request({
    url: '/user/'+id+'/edit',
    method: 'PUT',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.access_token
    }
  });

};

const profileService = {
  editUser, getUser
};

export default profileService;