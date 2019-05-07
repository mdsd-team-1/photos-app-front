//Libraries
import { Form, Icon, Input, Button } from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
//import connect from 'react-redux/es/connect/connect';
//import PropTypes from 'prop-types';

//Subcomponents
import routes from "../../../utils/constants";

//Actions
//import {login} from "../../../../store/redux/actions/login/loginActions";
import {ERROR_MODAL, SUCCESS_MODAL} from "../../../store/redux/types";
import icon from "../../../assets/logo.png";

//Services
import userSessionService from "../../../services/authentication/loginServices";


//Constants
const FormItem = Form.Item;

class LoginForm extends Component {

  constructor(props){
    
    super(props);

    this.state={

      isLoading: false,
      login_success: 0,
      email: '',
      password: '',
      isLogin: false,
      token: null,
      loginError: null,
    };

  }

  onChangeEmail (email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword (password) {
    this.setState({ password: password.target.value })
  };

  loginAction (email, password) {
    if (email === '' || password === '') {
      this.setState({ isLogin: false });
      ERROR_MODAL("Error al ingresar", "Ingrese un email y una contraseña válidos.");
    } else {
      userSessionService.token().then( response => {
        let new_token;
        if(localStorage.access_token === null || localStorage.access_token === undefined){
          localStorage.setItem('access_token', response.data.access_token);
          new_token = response.data.access_token;
        }else{
          new_token = localStorage.access_token;
        }
        
        userSessionService.login(email, password, new_token).then( response => {
        let result = response.data['Login Status'];
        let id = response.data['User Id'];
        if (result === "Successfully logged in"){
          SUCCESS_MODAL("Operación realizada exitosamente", "Ha ingresado satisfactoriamente.");
          localStorage.setItem('isLogged', true);
          localStorage.setItem('id', id);
          this.setState({
            isLogin: true,
          });
        }else{
          ERROR_MODAL("Error al ingresar", "El email o la contraseña no son correctos.");
          this.setState({
            isLogin: false,
          });
        }          
      })
      .catch( () => {
        ERROR_MODAL("Error al ingresar", "Intente nuevamente más tarde.");
          this.setState({
            isLogin: false
          });
      });
        this.setState({
          loginError: false,
        });
      })
      .catch( () => {
        ERROR_MODAL("Error al ingresar", "Intente nuevamente más tarde");
          this.setState({
            loginError: true
          });
      }); 
    }    
  };

  render() {
    const { email, password, isLogin } = this.state;
    return (
      <div>
        <div className="div-logo">
          <img src={icon} alt="icon" className="logo" />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div> 
                <FormItem>
                  <Input className={"form-content"} prefix={<Icon type="user" className={"field-icon"} />} placeholder="Email" 
                    onChange={(value) => this.onChangeEmail(value)} onPressEnter={() => this.loginAction(email, password)}/>
                </FormItem>
                <FormItem>
                  <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" placeholder="Contraseña"
                    onChange={(value) => this.onChangePassword(value)} onPressEnter={() => this.loginAction(email, password)}/>
                </FormItem>
                <FormItem className={"submit"}>
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => this.loginAction(email, password)}>
                    <p className={"login-button-text"}>Iniciar Sesión</p>
                  </Button>
                  {isLogin &&
                    <Redirect to={"/home"}/>
                  }
                  <div className={"for-links"}>
                    <Link to={routes.register}>
                      <p className={"url-form"}>¿Desea Registrarse?</p>
                    </Link>
                  </div>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
        <div className={"bottom-title"}>
          SoftGallery © 2019
        </div>
      </div>
    );
  }
}

/*LoginForm.propTypes = {
  isLogin: PropTypes.bool,
  login: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);*/

export default LoginForm;