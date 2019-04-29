//Libraries
import { Form, Icon, Input, Button } from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
//import connect from 'react-redux/es/connect/connect';
import routes from "../../../utils/constants";
//import {login} from "../../../../store/redux/actions/login/loginActions";
//import PropTypes from 'prop-types';

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
      isLogin: this.isSignedIn(),
    };

  }

  onChangeEmail (email) {
    this.setState({ email: email.target.value })
  };

  onChangePassword (password) {
    this.setState({ password: password.target.value })
  };

  loginAction (email, password) {
/*    if (email === '' || password === '') {
      this.setState({ loginError: true });
    } else {
      localStorage.setItem('email', email);
      //this.props.login(email, password);
    }
  */
    localStorage.setItem('email', email);
    this.setState({
      isLogin: true,
    });
    
  };

  isSignedIn(){
    /*if (localStorage.access_token !== undefined && localStorage.access_token !== null &&
        localStorage.access_token !== 'null' && localStorage.access_token){
      let expireTime = new Date(localStorage.expires_on);
      let today = new Date();
      if (today < expireTime) {
        return true;
      } else {
        localStorage.clear();
        return false;
      }
    }
    return false;
    */
    if(localStorage.email !== undefined && localStorage.email !== ''){
      return true;
    }else{
      return false;
    }
  };

  render() {
    const { email, password, isLogin } = this.state;
    console.log(isLogin);

    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div > 
            <FormItem>
              <Input className={"form-content"} prefix={<Icon type="user" className={"field-icon"} />} placeholder="Usuario" 
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
                <Link to={routes.forgot_password}>
                  <p className={"url-form"}>¿Olvidó su contraseña?</p>
                </Link>
                <Link to={routes.register}>
                  <p className={"url-form"}>¿Desea Registrarse?</p>
                </Link>
              </div>
            </FormItem>
          </div>
          

        </Form>
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