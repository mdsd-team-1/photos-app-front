//Libraries
import {Layout, Menu, Modal, Icon} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import {withRouter, NavLink} from 'react-router-dom';

//Subcomponents
import routes from '../../../utils/constants';
import icon from "../../../assets/logo2.png";

//Styles
import '../../../styles/general/mainmenu.css';
import PropTypes from "prop-types";

import {logout} from "../../../store/redux/actions/login/loginActions";
import connect from "react-redux/es/connect/connect";

//Constants
const { Header } = Layout;

class MainMenu extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      log_out: 0,
      visible: false,
      redirectTo: "",
      loggedIn: this.isSignedIn()
    };

    this.logOut = this.logOut.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.isSignedIn=this.isSignedIn.bind(this);

  };

  logOut(){
    //this.props.logout();
    localStorage.clear();
    this.setState({loggedIn: false})
  };

  handleCancelModal(){
    this.setState({
      visible: false,
    });
  };

  isSignedIn () {
    /*if(localStorage.access_token !== undefined && localStorage.access_token !== null && localStorage.access_token !== 'null' && localStorage.access_token){
      let expireTime = new Date(localStorage.expires_on);
      let today = new Date();
      if(today<expireTime){
        return true;
      }else{
        localStorage.clear();
        //this.props.logout();
        return false;
      }
    }
    //this.props.logout();
    return false;*/
    if(localStorage.email !== undefined && localStorage.email !== ''){
      return true;
    }else{
      return false;
    }
  };
 
  render(){
    
    let {loggedIn} = this.state;
    //let {role} = this.props;
    let defaultSelectedKeys = [this.props.location.pathname];

    return(
      <Layout className="layout" >
        <Header className={"header-menu1"} >
          <Modal
              title="Cerrar sesión"
              visible={this.state.visible}
              onOk={this.logOut}
              okText={"Confirmar"}
              onCancel={this.handleCancelModal}
              cancelText={"Cancelar"}
              width={400}
              className={"log-out-modal"}>
            <p>¿Confirma que desea cerrar sesión?</p>
          </Modal>
          
          <Menu
            mode="horizontal"
            className={"menu-style"}
            defaultSelectedKeys={defaultSelectedKeys}>
            <Menu.Item>
            <img src={icon} alt="menulogo" className="menu-logo" />
            </Menu.Item>
            <Menu.Item key={routes.home} className={"menu-key-home"}>
              <NavLink to={routes.home}><Icon type="home"/>Inicio</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={routes.profile}>< Icon type="upload"/>Cargar fotos</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={routes.profile}>< Icon type="appstore"/>Álbumes</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={routes.profile}>< Icon type="picture"/>Galería</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={routes.profile}>< Icon type="user"/>Perfil</NavLink>
            </Menu.Item>
            <Menu.Item onClick={() => this.setState({visible: true})}>
              <Icon type="poweroff" />Cerrar sesión
            </Menu.Item>
          </Menu>
        </Header>
        {
          !loggedIn &&
          <Redirect to={routes.login}/>
        }
      </Layout>
    );
  };
  
}

MainMenu.propTypes = {
  logout: PropTypes.func,
  isLogin: PropTypes.bool,
  role: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
    role: state.login.role
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainMenu));