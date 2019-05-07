//Libraries
import {Form, Icon, Input, Button} from 'antd';
import React, {Component} from 'react';
import { Redirect } from "react-router";
import routes from "../../../utils/constants";
import {Link} from "react-router-dom";

import icon from "../../../assets/logo.png";

import {ERROR_MODAL, SUCCESS_MODAL} from "../../../store/redux/types";
import registerService from '../../../services/authentication/registerServices';
import userSessionService from '../../../services/authentication/loginServices';

//Constants
const FormItem = Form.Item;

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      names: null,
      username: null,
      description: null,
      email: null,
      password: null,
      loginError: null,
      isLogged: null,
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  onChangeValue(value, param){
    let modifier = this.state;
    modifier[param] = value.target.value;
    if(param !== ""){
      this.setState({
        state: modifier
      });
    }else{
      ERROR_MODAL("Acción erronea", "Los valores ingresados están incompletos o están vacíos.")
    }
  };

  handleSubmit(){
    let {names, username, description, email, password} = this.state;
    userSessionService.token()
      .then( response => {
        localStorage.setItem('access_token', response.data.access_token);
        this.setState({
          loginError: false
        });
        if(names !== "" && names !== null && username !== "" && username !== null && description !== "" &&
          description !== null && email !== "" && email !== null && password !== "" && password !== null ){
            let name = names.split(" ");
            console.log(names, name);
            let data = {     
              first_name: name[0],
              last_name: name[1],
              profile_description: description,
              user_name: username,
              password: password,
              email: email          
            }
            registerService.register(data, response.data.access_token)
            .then( response => {
              this.setState({
                isLogged: true,
              }, SUCCESS_MODAL("Operación realizada exitosamente", "Se ha registrado satisfactoriamente. Por favor, ingrese con su correo electrónico y contraseña."));
            })
            .catch( () => {
              ERROR_MODAL("Error al registrarse", "Intente nuevamente más tarde");
            }); 
        }
      })
      .catch( () => {
        ERROR_MODAL("Error al ingresar", "Intente nuevamente más tarde");
          this.setState({
            loginError: true
          });
      }); 
  }

  registerInformation(){
    
    
  }

  render() {
    //const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="div-logo">
          <img src={icon} alt="icon" className="logo2" />
        </div>
        <div className={"login-card"}>
          <div className="login-form">
            <Form className="login-form">
              <FormItem className={"form-content"} >
                <Input className="my-form" prefix={<Icon type="user" className={"field-icon"} />} 
                      placeholder="Nombres - Apellidos" onChange={(value) => this.onChangeValue(value, 'names')}/>
              </FormItem>

              <FormItem>
                <Input className="my-form" prefix={<Icon type="smile" className={"field-icon"} />} 
                       placeholder="Username" onChange={(value) => this.onChangeValue(value, 'username')} />
              </FormItem>

              <FormItem >
                <Input className="my-form" prefix={<Icon type="align-center" className={"field-icon"} />} 
                       placeholder="Descripción de perfil" onChange={(value) => this.onChangeValue(value, 'description')}/>
              </FormItem>

              <FormItem>
                <Input className="my-form" prefix={<Icon type="mail" className={"field-icon"} />} 
                       placeholder="Email" onChange={(value) => this.onChangeValue(value, 'email')} />
              </FormItem>

              <FormItem>
                <Input prefix={<Icon type="lock" className={"field-icon"} />} type="password" 
                       placeholder="Contraseña" onChange={(value) => this.onChangeValue(value, 'password')} />
              </FormItem>

              <FormItem className={"submit"}>
                <Button type="primary" htmlType="submit" className=" my-button login-form-button" onClick={this.handleSubmit}  >
                  Registrar
                </Button>
                <div>
                  <Link to={routes.login}>
                    <p className={"url-form"}>¿Ya está registrado? Inicie Sesión.</p>
                  </Link>
                </div>
                {this.state.isLogged &&
                  <Redirect to={routes.login}/>
                }
              </FormItem>
            </Form>
        </div>
      </div>
      <div className={"bottom-title2"}>
        SoftGallery © 2019
      </div>
    </div>
    );
  }
}

export default Register;