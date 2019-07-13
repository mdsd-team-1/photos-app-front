//Libraries
import React, {Component} from 'react';
import {Form, Row, Col, Tag, Input, Button, Divider, Modal, Upload} from 'antd';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';

//Actions
import {ERROR_MODAL, SUCCESS_MODAL} from "../../actions/store/redux/types";

//Styles
import '../../styles/upload/upload.css'

//Constants
const FormItem = Form.Item;
const { TextArea } = Input;

class UserForm extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      photo: {
        name: null,
        lastName: null,
        email: null,
        activeState: null,
        role: null
      },
      file: null,
      kBk: 0,
      visible: null,
      isReady: null,
    };

    this.onClickPhoto=this.onClickPhoto.bind(this);
    this.onChange=this.onChange.bind(this);
    this.uploadPhoto=this.uploadPhoto.bind(this);

  };

  onClickPhoto(){
    this.setState({
      visible: true,
    });
  };

  onChange(e){
    console.log(e.target.files[0].type);
    let b=[".jpg", ".png", ".PNG", ".JPG", "image/png", "image/jpg"];
    if(b.includes(e.target.files[0].type)){
      this.setState({file: e.target.files[0]})
    }else{
      this.setState({kBK:this.state.kBK+1});
      ERROR_MODAL("Error cargando la foto.", "El archivo no corresponde al formato especificado, por favor asegurese que la foto tenga formato JPG o PNG");
    }
  };

  onChangeFile(e){

  }

  uploadPhoto(e){
    console.log(e);
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    const { name, lastName, email, activeState, role } = this.state.photo;
    const { file, visible, kBk } = this.state;
    const props = { name: 'file', onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          this.setState({file: info.file});
        }
      },
    };
    console.log(this.state.visible);

    return (
        <div>
          <Form>
            <Row gutter={20} style={{margin: "auto"}}>
              <Col xs={24} sm={24} md={12} lg={10} >
                <FieldTitle title={"Nombre"}/>
                <FormItem>
                  {getFieldDecorator('name',
                    {rules: [
                      {required: true, message: 'Por favor ingresa un nombre', whitespace: true}
                    ]})(
                      <Input onChange={(e) => this.changeName(e)} placeholder={"Nombres"}/>
                    )
                  }
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={14}>
                <FieldTitle title={"Descripción"}/>
                <FormItem >
                  {getFieldDecorator('lastName',
                    {rules: [
                      {required: true, message: 'Por favor ingresa una descripción', whitespace: true }
                    ]})(
                      <Input onChange={(e) => this.changeDescription(e)} placeholder={"Descripción"}/>
                    )
                  }
                </FormItem>  
              </Col>
            </Row>
            <Row gutter={20} style={{margin: "auto"}}>
              <Col xs={24} sm={14} md={14} lg={10}>
                <FieldTitle title={"Nombre del archivo"}/>
                <Tag className={"UploadTag"} style={{ width: "100%", height: 30, cursor: 'default'}}>
                  <p>
                    {file && 
                      file.name
                    }</p>
                </Tag>
              </Col>
              <Col xs={24} sm={24} md={12} lg={4}>
                <FieldTitle title={"Foto"}/>
                <Button size="small" type="primary" className={"field-style custom-button"}
                        icon="paper-clip" style={{display: "inline-block", fontSize:14, height: 30,
                        marginBottom: "5px", width:'100%' }} onClick={() => this.onClickPhoto()}>
                        Seleccionar foto
                </Button> 
              </Col>
              <Col xs={24} sm={24} md={12} lg={10}/>
            </Row>
            <Divider style={{marginTop: "20px !important", marginBottom: "15px !important"}}/>
            <Row gutter={20} style={{margin: "auto"}}>
              <Col xs={24} sm={14} md={14} lg={20}/>
              <Col xs={24} sm={24} md={12} lg={4}>
                <Button size="small" type="primary" className={"field-style custom-button"}
                        icon="upload" style={{fontSize:15, height: 32,
                        marginBottom: "5px", width:'100%' }} onClick={() => this.uploadPhoto()}>
                        Cargar foto
                </Button> 
              </Col>
              <Col xs={24} sm={24} md={12} lg={10}/>
            </Row>  
          </Form>
          <Modal 
             title = "Cargar foto"
             visible={this.state.visible}
             onCancel={()=>{this.setState({visible: false})}}
             okText={"Cargar"}
             onOk={()=>{this.setState({isReady: true, visible: false})}}
             >
            <div>
              <div className="upload-text">
                Seleccione la foto que desea cargar:
              </div>
              <Row style={{width: "100%"}} gutter={8}>
                <Col xs={24} sm={10} md={10} lg={10}>
                    <input className="upload-input" key={this.state.kBK} type="file" onChange={this.onChange} 
                           accept=".jpg, .png, .PNG, .JPG, image/png, image/jpg"/>
                  </Col>
              </Row>

            </div>
          </Modal>
        </div>
    );
  }
}

export default (Form.create()(UserForm));
      

