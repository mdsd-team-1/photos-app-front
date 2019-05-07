//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Button} from 'antd';

//Components
import EditUser from './EditUser';
import MainLoading from '../subcomponents/MainLoading';

//Styles
import '../../../styles/profile/profile.css'

//Assets
import slider_1 from "../../../assets/profile.png";

//Services
import profileService from "../../../services/users/userServices";
import {ERROR_MODAL} from "../../../store/redux/types";

class Profile extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      visibleModal: false,
      userInfo: null,
      loading: true
    };
    
    this.openEditModal = this.openEditModal.bind(this);
  };

  componentDidMount(){
    profileService.getUser(localStorage.id)
      .then( response => {
        this.setState({
          userInfo: response.data
        });
      })
      .catch( () => {
        ERROR_MODAL("Operación errónea", "No es posible traer información del usuario.");
        this.setState({
          loading: false,
        });
      }); 
  };

  openEditModal(){
    this.setState({
      visibleModal: true,
    });
  };

  render() {

    let { visibleModal, userInfo } = this.state;

    if(this.state.userInfo === null){
      return(
          <MainLoading visible={this.state.loading}/>
      );
    }else{
      return (
        <div className={"initial-div"}>
          <div className={"second-div"}>
            <div className={"upload-content"}>
              <Row >
                <Col xxl={20} lg={20} md={20} sm={12} xs={24}>
                  <h2 className={'header-title'}>Perfil - {userInfo.userName}</h2>
                </Col>
                <Divider/> 
              </Row>
              <Row gutter={20} style={{margin: "auto"}}>
                <Col xs={24} sm={14} md={14} lg={20}/>
                <Col xs={24} sm={24} md={12} lg={4}>
                  <Button size="small" type="primary" className={"field-style custom-button"}
                          icon="user-add" style={{fontSize:15, height: 32,
                          marginBottom: "5px", width:'100%' }} onClick={() => this.openEditModal()}>
                          Editar perfil
                  </Button> 
                </Col>
              </Row>  
              <Row className="users-row1">
                <Col xxl={6} lg={6} md={8} sm={8} xs={8}>
                  <img alt={"Name"} src={slider_1}
                    style={{ height: "200px", maxHeight: "200px", cursor: "zoom-in", borderRadius: "50px" }}/>
                  
                </Col>
                <Col xxl={18} lg={18} md={16} sm={16} xs={16}>
                  <div style={{fontSize: "25px", fontWeight: "bold", marginLeft: "50px", marginTop: "20px", marginBottom: "5px"}}>
                    {userInfo.firstName + " " +userInfo.lastName}
                  </div>
                  <div style={{fontSize: "15px", fontStyle: "italic", marginLeft: "50px", marginTop: "10px", marginBottom: "20px"}}>
                    {userInfo.email}
                  </div>
                  <div style={{fontSize: "17px", marginLeft: "50px",  marginTop: "40px", marginBottom: "20px"}}>
                    {userInfo.profileDescription}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {
            visibleModal && 
            <EditUser visible={visibleModal} user={userInfo} toggle/>

          }
        </div>
    );
    }
    
  }
}

export default Profile;