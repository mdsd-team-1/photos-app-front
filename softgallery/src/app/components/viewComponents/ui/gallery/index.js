//Libraries
import React, {Component} from 'react';
import {Row, Col, Divider, List, Card} from 'antd';

//Subcomponents
//import FieldTitle from '../subcomponents/FieldTitle';
import MainLoading from '../subcomponents/MainLoading';

//Styles
import '../../styles/album/album.css'

//Assets
/*import slider_1 from "../../../assets/slider_6.jpg";
import slider_2 from "../../../assets/slider_2.jpg";
import slider_3 from "../../../assets/slider_5.jpg";
import slider_4 from "../../../assets/slider_4.jpg";
import slider_5 from "../../../assets/slider_3.jpg";*/

//Services
import photoServices from "../../../../actions/services/photos/photoServices";
import {ERROR_MODAL} from "../../../../actions/store/redux/types";

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

    
  };

  componentDidMount(){
    photoServices.getAllPhotos()
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





  render() {

    let { userAlbums, albumPhotos } = this.state;
    
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
                    <h2 className={'header-title'}>Galería</h2>
                  </Col>
                  <Divider/>
                </Row> 
                {
                  this.state.userAlbums !== null &&
                  <Row style={{marginRight: "10px"}}className="row-content">
                    <List
                      grid={{ gutter: 12, lg: 3, md: 2, sm: window.innerWidth < 640 ? 1 : 2, xm: 1 }}
                      size={window.innerWidth < 992 ? 10 : 9}
                      style={{ paddingLeft: window.innerWidth < 640 && 50, paddingRight: window.innerWidth < 640 && 50}}
                      dataSource={userAlbums}
                      renderItem={(item, k) => (
                      <List.Item key={k}>
                        <br />
                        <Card
                          className={"categoryCard"}
                          cover={ 
                            <img alt={item.name} src={item.url}
                              style={{ height: "200px", maxHeight: "200px", cursor: "zoom-in" }}
                              />}>
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
}              </div>
            </div>
          </div>
      );
    } 
  }
}

export default Album;