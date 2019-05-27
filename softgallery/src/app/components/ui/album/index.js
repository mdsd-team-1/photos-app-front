//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, List, Card, Icon, Button, Modal, Input, Select} from 'antd';

//Components
import CardImageModal from "./CardImageModal";

//Subcomponents
import FieldTitle from '../subcomponents/FieldTitle';
import MainLoading from '../subcomponents/MainLoading';

//Styles
import '../../../styles/album/album.css'

//Assets
/*import slider_1 from "../../../assets/slider_6.jpg";
import slider_2 from "../../../assets/slider_2.jpg";
import slider_3 from "../../../assets/slider_5.jpg";
import slider_4 from "../../../assets/slider_4.jpg";
import slider_5 from "../../../assets/slider_3.jpg";*/

//Services
import albumService from "../../../actions/services/album/albumServices";
import {ERROR_MODAL, CONFIRM_MODAL} from "../../../actions/store/redux/types";

//Constants
const { Meta } = Card;


class Album extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      cardImageModalVisible: false,
      cardImage: null,
      cardName: null,
      albumName: null,
      albumModal: null,
      userAlbums: null,
      albumSelected: null,
      albumPhotos: null,
      loading: true,
    };

    this.toggleCardImageModal = this.toggleCardImageModal.bind(this);
    
  };

  componentDidMount(){
    albumService.getAlbums(localStorage.id)
      .then( response => {
        this.setState({
          userAlbums: response.data,
          loading: false
        });
      })
      .catch( () => {
        ERROR_MODAL("Operación errónea", "No es posible traer información del usuario.");
        this.setState({
          loading: false
        });
      }); 
  }

  toggleCardImageModal(value, item, name){
    this.setState({
      cardImageModalVisible: value,
      cardImage: item,
      cardName: name
    });
  };

  opencreateAlbum(){
    this.setState({
      albumModal: true
    });
  };

  changeDescription(e){
    if(e.target.value !== ""){
      this.setState({
        albumName: e.target.value,
      })
    }
  }

  createAlbum(){
    if(this.state.albumName !== ""){
      albumService.createAlbum(this.state.albumName, localStorage.id)
      .then( response => {
        this.setState({
          albumModal: false,
        });
        CONFIRM_MODAL("Operación exitosa", "Álbum creado exitosamente.");
      })
      .catch( () => {
        ERROR_MODAL("Operación errónea", "No es posible traer información del usuario.");
      }); 
    }
  };

  changeAlbum(e){
    console.log(e);
    if(this.state.albumSelected !== ""){
      this.setState({
        loading: true,
        albumSelected: e
      });
      albumService.getPhotos(e)
      .then( response => {
        this.setState({
          albumPhotos: response.data,
          loading: false
        });
      })
      .catch( () => {
        ERROR_MODAL("Operación errónea", "No es posible traer información del usuario.");
        this.setState({
          loading: false
        });
      }); 
    }
  };

  render() {

    let { cardImageModalVisible, userAlbums, albumPhotos } = this.state;
    
    console.log(albumPhotos);
    if(this.state.loading === null || this.state.userAlbums === null){
      return(
          <MainLoading visible={this.state.loading}/>
      );
    }else{ 
      return (
          <div className={"initial-div2"}>
            <div className={"second-div2"}>
              <div >
                <Row >
                  <Col xxl={20} lg={20} md={20} sm={12} xs={24}>
                    <h2 className={'header-title'}>Álbumes</h2>
                  </Col>
                  <Divider/>
                  <Row gutter={20} style={{margin: "auto"}}>
                    <Col xs={24} sm={14} md={12} lg={14}/>
                    <Col xs={24} sm={14} md={6} lg={6} >
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
                    <Col xs={24} sm={24} md={6} lg={4}>
                    <FieldTitle title={"Crear álbum"}/>
                      <Button size="small" type="primary"
                              icon="upload" style={{fontSize:15, height: 32,
                              marginBottom: "5px", width:'100%' }} onClick={() => this.opencreateAlbum()}>
                              Crear álbum
                      </Button> 
                    </Col>
                  </Row> 
                </Row> 
                {
                  this.state.albumPhotos !== null &&
                  <Row style={{marginRight: "10px"}}className="row-content">
                    <List
                      grid={{ gutter: 12, lg: 3, md: 2, sm: window.innerWidth < 640 ? 1 : 2, xm: 1 }}
                      size={window.innerWidth < 992 ? 10 : 9}
                      style={{ paddingLeft: window.innerWidth < 640 && 50, paddingRight: window.innerWidth < 640 && 50}}
                      dataSource={albumPhotos}
                      renderItem={(item, k) => (
                      <List.Item key={k}>
                        <br />
                        <Card
                          className={"categoryCard"}
                          cover={ 
                            <img alt={item.name} src={item.url}
                              style={{ height: "200px", maxHeight: "200px", cursor: "zoom-in" }}
                              onClick={() => this.toggleCardImageModal(true, item.url, item.name)}/>}
                              actions={[
                              <Icon type="eye" onClick={() => this.toggleCardImageModal(true, item.url, item.name)} />,
                                ]}>
                          <Meta
                              style={{ textAlign: "center", lineHeight: "1" }}
                              title={<span style={{fontSize: "12px", whiteSpace: "normal" }}>{item.name}</span>}
                              description={<span>{item.category}<br/>{item.description}</span>}
                          />
                        </Card>
                      </List.Item>
                      )}
                        />
                  </Row>
                }
                {
                  this.state.albumPhotos === null &&
                  <div style={{textAlign: "center", marginTop: "50px"}}>
                    Selecciona un álbum, por favor.
                  </div>
                }
                {cardImageModalVisible &&
                  <CardImageModal visible={cardImageModalVisible} item={this.state}
                                  toggleCardImageModal={(value) => this.toggleCardImageModal(value, this.state.cardImage, this.state.cardName)}/>
                }
                {
                  this.state.albumModal && 
                    <Modal
                      title="Crear álbum"
                      visible={this.state.albumModal}
                      onOk={() =>  this.createAlbum()}
                      okText={"Crear álbum"}
                      onCancel={() =>  this.setState({albumModal: false})}
                      cancelText={"Cancelar"}
                      width={500}
                      className={"log-out-modal"}>
                        <Row>

                          <Col lg={8} style={{textAlign: "left", marginTop: "5px"}}>
                            Nombre del álbum:
                          </Col>
                          <Col lg={16}>
                            <Input onChange={(e) => this.changeDescription(e)} placeholder={"Nombre"}/>
                          </Col>
                        </Row>
                    </Modal>
                } 
              </div>
            </div>
          </div>
      );
              } 
  }
}

export default Album;