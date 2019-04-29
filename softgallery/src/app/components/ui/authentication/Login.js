//Libraries
import React, {Component} from 'react';
import { Form, Layout } from 'antd';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

//Styles
import '../../../styles/login/login.css';

//Pictures
import background from "../../../assets/fondo4.jpg";
import icon from "../../../assets/logo.png";

//Subcomponents
import LoginForm from "./LoginForm";
//import ForgotPassword from "./ForgotPassword";
//import Register from "./Register";
import routes from "../../../utils/constants";

//Constants
const { Content, Sider } = Layout;
const WrappedNormalLoginStandard = Form.create()(LoginForm);
//const WrappedForgotPassword = Form.create()(ForgotPassword);
//const WrappedRegister = Form.create()(Register);

class Login extends Component {
  
  render() {
  
    return (
      <div className='login'>

        <Layout>
          <Sider width={400} style={{backgroundColor: "#fff"}}>
            <div className="div-logo">
              <img src={icon} alt="icon" className="logo" />
            </div>
            <div className={"login-card"}>
                <div className="login-form">
                  <Switch>
                    <Route path={routes.login} component={WrappedNormalLoginStandard} />
                    <Route render = {()=><Redirect to={routes.login}/>}/>
                  </Switch>
                </div>
            </div>
            <div className={"bottom-title"}>
              SoftGallery © 2019
            </div>
          </Sider>
          <Layout>
            <Content className={"background-picture-login"}>
              <img src={background} alt="shopping_cart" className="shop"/>
            </Content>
            
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Login;