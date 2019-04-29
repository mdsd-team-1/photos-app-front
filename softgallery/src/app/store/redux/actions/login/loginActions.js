import {LOGOUT} from '../../types';
//import { initializeClient } from '../../../../services/requestWrapper';

/*function setLogin (isLogin) {
  return {
    type: LOGGING,
    isLogin
  };
}*/

function setLogout (isLogin) {
  return {
    type: LOGOUT,
    isLogin
  };
}

/*function saveLocalStorage(user_name, access_token, expires_on, role){
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('user_name', user_name);
  localStorage.setItem('expires_on', expires_on);
  localStorage.setItem('role', role);
  //initializeClient();
}*/

/*export const login = (email, password) => {
  return dispatch => {
    dispatch(setLogin(false));
    return loginServices.token(email, password)
        .then(response => {
          let data = response.data;
          saveLocalStorage(data.user_name, data.access_token, data.expires_on, data.render_role);
          dispatch(setLogin(true));
          dispatch({
            type: SET_ROLE,
            payload: data.render_role
          })
        }).catch(err => {
          dispatch(setLogin(false));
          //ERROR_MODAL('Error iniciando sesión', err.data);
        })
  }
};*/

export const logout = () => {
  return dispatch => {
    dispatch(setLogout(false));
    localStorage.clear();
  }
};