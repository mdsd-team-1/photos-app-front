//Libraries
import React, {Component} from 'react';
import{Row, Col, Modal, Input, Form} from 'antd';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import PropTypes from "prop-types";
//import {updatePerson} from "../../../store/redux/actions/person/personActions";
import connect from "react-redux/es/connect/connect";
import Button from "antd/es/button/button";

//Services
import profileService from "../../../actions/services/users/userServices";
import {ERROR_MODAL, CONFIRM_MODAL} from "../../../actions/store/redux/types";

//Constants
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class EditUser extends Component {

  constructor(props){
    super(props);

    this.state={
      isMounted: false,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      userName: this.props.user.userName,
      profileDescription: this.props.user.profileDescription,
      email: this.props.user.email,
      loading: false,
      visible: this.props.visible,
    };

    this.changeName = this.changeName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.submit = this.submit.bind(this);
  };


  changeName(e){
    if(e.target.value !== ""){
      this.setState({
        firstName: e.target.value
      });
    }
  };

  changeLastName(e){
    if(e.target.value !== ""){
      this.setState({
        lastName: e.target.value
      });
    }
  };

  changeUserName(e){
    if(e.target.value !== ""){
      this.setState({
        userName: e.target.value
      });
    }
  };

  changeDescription(e){
    if(e.target.value !== ""){
      this.setState({
        profileDescription: e.target.value
      });
    }
  };


  submit(){
    console.log(this.state);
    //let {user} = this.state
    let profile = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      profile_description: this.state.profileDescription,
      user_name: this.state.userName,
    };
    profileService.editUser(localStorage.id, profile)
    .then( response => {
      this.setState({
        visible: false,
      });
      CONFIRM_MODAL("Operación exitosa", "Usuario editado exitosamente.");
    })
    .catch( () => {
      ERROR_MODAL("Operación errónea", "No es posible traer información del usuario.");
    }); 
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
 
    const isUpdateReady = true;
 
    return (
      <Modal
        title={ "Editar usuario "}
        onCancel={()=>this.setState({visible: false})}
        key={this.state.keyBurstingKey}
        onOk={this.handleReject}
        visible={this.state.visible}
        footer={[
          isUpdateReady
              ? <Button key='submit' type='primary'
                        onClick={this.submit}>Editar usuario</Button>
              : <Button key='submit' type='primary' disabled={true} loading={this.state.loading}>Editar usuario</Button>,
          <Button key='back' onClick={()=>this.setState({visible: false})} loading={this.state.loading}> Cancelar </Button>
        ]}
        maskClosable={!this.state.loading}
        keyboard={!this.state.loading}
        closable={!this.state.loading}
      >
          
        <Form>
          <Row gutter={8}>
            <Col xs={24} sm={24} md={12} lg={8} >
              <FieldTitle title={"Nombres"}/>
              <FormItem>
                {getFieldDecorator('name',
                  {initialValue: user.firstName,
                    rules: [
                    {required: true, message: 'Por favor ingresa un nombre'}
                    ]
                  })(
                    <Input onChange={(e) => this.changeName(e)} placeholder={"Nombres"}/>
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} >
              <FieldTitle title={"Apellidos"}/>
              <FormItem>
                {getFieldDecorator('lastName',
                  {initialValue: user.lastName,
                    rules: [
                    {required: true, message: 'Por favor ingresa un apellido'}
                    ]
                  })(
                    <Input onChange={(e) => this.changeLastName(e)} placeholder={"Apellidos"}/>
                  )
                }
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} >
              <FieldTitle title={"Nombre de usuario"}/>
              <FormItem >
                {getFieldDecorator('lname',
                  {initialValue: user.userName,
                    rules: [
                    {required: true, message: 'Por favor ingresa un username', whitespace: true }
                  ]})(
                    <Input onChange={(e) => this.changeUserName(e)} placeholder={"Username"}/>
                  )
                }
              </FormItem>  
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={24} >
              <FieldTitle title={"Descripción de perfil"}/>
              <FormItem >
                {getFieldDecorator('description',
                  {initialValue: user.profileDescription,
                    rules: [
                    {type: 'description', message: 'La descripción ingresada no es válida'},
                    {required: true, message: 'Debe ingresar una descripción'}
                  ]})(
                    <TextArea onChange={(e) => this.changeDescription(e)} placeholder={"Descripción de perfil"} autosize={true}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>      


          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={24} >
              <FieldTitle title={"Correo electrónico"}/>
              <FormItem >
                {getFieldDecorator('email',
                  {initialValue: user.email,
                    rules: [
                    {type: 'email', message: 'El correo ingresado no es válido'},
                    {required: true, message: 'Debe ingresar un correo electrónico'}
                  ]})(
                    <Input placeholder={"Correo electrónico"} disabled={true}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>                          
        </Form>
      </Modal>
    );
  }
}

EditUser.propTypes = {
  //updatePerson: PropTypes.func,
  toggleCreateModal: PropTypes.func,
 // user: PropTypes.object,
 // personStates: PropTypes.array,
 // roles: PropTypes.array,
  //isAddingEditDelete: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    //isAddingEditDelete: state.person.isAddingEditDelete,
    //personStates: state.person.personStates,
    //roles: state.person.roles
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   //updatePerson: (person) => dispatch(updatePerson(person))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditUser));