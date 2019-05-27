//Libraries
import React, {Component} from 'react';
import { Form, Layout } from 'antd';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

//Subcomponents
import LoginForm from "./LoginForm";
//import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import routes from "../../../utils/constants";
//import Home from "../home/index";

//Services
//import userSessionService from "../../../actions/services/authentication/loginServices";

//Actions
//import {ERROR_MODAL, SUCCESS_MODAL} from "../../../actions/store/redux/types";

//Styles
import '../../../styles/login/login.css';

//Pictures
import background from "../../../assets/fondo0.jpg";
//import icon from "../../../assets/logo.png";

//Constants
const { Content, Sider } = Layout;
const WrappedNormalLoginStandard = Form.create()(LoginForm);
//const WrappedForgotPassword = Form.create()(ForgotPassword);
const WrappedRegister = Form.create()(Register);

class Login extends Component {
  
  render() {
  
    return (
      <div className='login'>

        <Layout>
          <Sider width={400} style={{backgroundColor: "#fff"}}>
              <Switch>
                <Route path={routes.login} component={WrappedNormalLoginStandard} />
                <Route path={routes.register} component={WrappedRegister} />
                <Route render = {()=><Redirect to={routes.login}/>}/>
              </Switch>
          </Sider>
          <Layout className={"background-sider"}>
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