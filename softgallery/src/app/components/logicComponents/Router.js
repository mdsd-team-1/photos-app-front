//Libraries
import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {Layout} from "antd";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

//Components
import Home from "../viewComponents/ui/home/index";
import Upload from "../viewComponents/ui/upload/index";
import Album from "../viewComponents/ui/album/index";
import Profile from "../viewComponents/ui/users/index";
import Gallery from "../viewComponents/ui/gallery/index";

//Subcomponents
import routes from '../../configuration/routing/routes';

//Styles
//import '../../../../styles/general/layout/router.css';

class Router extends Component {
  
  render() {

    return (
        <Layout.Content className={"content"}>
          <Switch>
            <Route path={routes.home} component={Home}/>
            <Route path={routes.upload} component={Upload}/>
            <Route path={routes.album} component={Album}/>
            <Route path={routes.gallery} component={Gallery}/>
            <Route path={routes.profile} component={Profile}/>
            <Route render = {()=><Redirect to={routes.home}/>}/>
          </Switch>
        </Layout.Content>  
    );
  };
}

Router.propTypes = {
  role: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    role: state.login.role
  }
};

export default withRouter(connect(mapStateToProps, {})(Router));