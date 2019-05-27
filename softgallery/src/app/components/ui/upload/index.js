//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, Select} from 'antd';

//Components
import  UploadForm from './UploadForm';

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';

//Styles
import '../../../styles/upload/upload.css'

//Assets

//Services

import albumService from "../../../actions/services/album/albumServices";
import {ERROR_MODAL} from "../../../actions/store/redux/types";
import MainLoading from '../subcomponents/MainLoading';


class UploadPhotos extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      userAlbums: null,
      albumSelected: null,
      loading: true
    };

    this.changeAlbum = this.changeAlbum.bind(this);
    
  };


  componentDidMount(){
    albumService.getAlbums(localStorage.id)
      .then( response => {
        this.setState({
          userAlbums: response.data
        });
      })
      .catch( () => {
        ERROR_MODAL("Operación errónea", "No es posible traer información del usuario.");
        this.setState({
          loading: false
        });
      }); 
  }

  changeAlbum(e){
    
    //let name = e.split("¨")
    if(e !== ""){
      this.setState({
        albumSelected: e,
      });
    }

  };


  render() {
    console.log(this.state.albumSelected);
    let {userAlbums} = this.state;

    if(this.state.userAlbums === null){
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
                    <h2 className={'header-title'}>Cargar fotos</h2>
                  </Col>
                  <Divider/> 
                </Row>
                <Row style={{marginRight: "10px"}} className="row-content">
                  <Col xxl={18} lg={18} md={20} sm={12} xs={24}/>
                  <Col xxl={6} lg={6} md={20} sm={12} xs={24} >
                    <FieldTitle title={"Álbum"}/>
                    <Select className="album-select" placeholder='Seleccione un rol' onChange={(value) => this.changeAlbum(value)}
                              showSearch optionFilterProp="children" filterOption={this.filterSelect}
                              notFoundContent='No hay roles'>
                      {userAlbums.map((album, i) => (
                        <Select.Option key={album.id} value={album.id}>
                          {album.name}
                        </Select.Option>
                    ))}
                    </Select>
                  </Col>
                </Row>
                <Divider/> 
                <UploadForm album={this.state.albumSelected}/>
              </div>
            </div>
          </div>
      );
    }
  }
}

export default UploadPhotos;