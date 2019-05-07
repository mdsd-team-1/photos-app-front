//Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Modal} from 'antd';

//Styles
import "../../../styles/subcomponents/loadings.css"

class MainLoading extends Component {
  render() {
    return (
        <Modal visible={this.props.visible} footer={''} closable={false} className={"main-loading"}>
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"/>
              <div className="sk-cube2 sk-cube"/>
              <div className="sk-cube4 sk-cube"/>
              <div className="sk-cube3 sk-cube"/>
            </div>
        </Modal>
    );
  }
}

MainLoading.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default MainLoading;