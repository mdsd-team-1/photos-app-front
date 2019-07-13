//Libraries
import React, {Component} from 'react';
import { Form, Layout } from 'antd';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";

//Subcomponents
import LoginForm from "./LoginForm";
//import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import routes from "../../../../configuration/routing/routes";

//Styles
import '../../styles/authentication/login.css';

//Pictures
//import background from "../../assets/bogota.jpg";
import second_background from "../../assets/fondo4444.jpg";

//Constants
const { Content, Sider } = Layout;
const WrappedNormalLoginStandard = Form.create()(LoginForm);
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
              <img src={second_background} alt="shopping_cart" className="shop"/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Login;