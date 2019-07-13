//Libraries
import React, {Component} from 'react';
import {Carousel, Row, Col, Icon} from 'antd';

//Styles
import '../../styles/home/home.css'

//Assets
import slider_1 from "../../assets/slider_6.jpg";
import slider_2 from "../../assets/slider_2.jpg";
import slider_3 from "../../assets/slider_5.jpg";
import slider_4 from "../../assets/slider_4.jpg";

class Home extends Component {

  constructor(props){
    
    super(props);
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();

  };

  next() {
    this.carousel.next();
  };

  previous() {
    this.carousel.prev();
  };

  render() {

    const props = {
      autoplay: true,
      autoplaySpeed:5000
    };

    return (
        <div className={"initial-home-div"}>
          <div className={"second-div"}>
            <Carousel className={"carousel"} ref={node => (this.carousel = node)} {...props}>
              <div>
                <img className="background-picture" src={slider_1} alt={"Slider 1"}/>
                <div className={"carousel-text"}>
                  <span className={"title"}>
                  La vida está hecha a partir de fotografias
                  </span><br/>
                </div>
              </div>
              <div>
                <img className="background-picture" src={slider_4} alt={"Slider 2"}/>
                <div className={"carousel-text"}>
                  <span className={"title"}>
                    Retrata tus experiencias
                  </span><br/>
                </div>
              </div>
              <div>
                <img className="background-picture" src={slider_3} alt={"Slider 3"}/>
                <div className={"carousel-text"}>
                  <span className={"title"}>
                    Guarda uno de tus recuerdos
                  </span><br/>
                </div>
              </div>
              <div>
                <img className="background-picture" src={slider_2} alt={"Slider 4"}/>
                <div className={"carousel-text"}>
                  <span className={"title"}>
                    
                    Visualiza el mundo
                  </span><br/>
                </div>
              </div>
            </Carousel>
            <div className={"arrows"}>
              <Row>
                <Col span = {1}>
                  <Icon type="left" className={"left-arrow"} onClick={this.previous}/>
                </Col>
                <Col xs = {14} sm={18} md={19} lg={21}/>
                <Col span = {1}>
                  <Icon type="right" className={"right-arrow"} onClick={this.next} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;