//Libraries
import React from 'react';
import {Button, Modal} from'antd';

//Styles
import '../../../styles/album/RegisterItems.css'

class CardImageModal extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = { 
            height: -1, 
            width: -1 };
    }

    onImgLoad({target:img}) {
        this.setState({height: img.offsetHeight, width: img.offsetWidth});
    }

    render() {
        const { toggleCardImageModal, item } = this.props;

        let modalWidth = this.state.width > this.state.height+(this.state.height/3) ? 750 : 520;
        let imgStyle = this.state.width > this.state.height+(this.state.height/3) ? "categoryModalPictureWallPaper" : "categoryModalPicture";
        console.log(this.props.item);
        return (
            <div>
                <Modal
                    title={item.name}
                    visible={this.props.visible}
                    onCancel={() => toggleCardImageModal(false, "", "")}
                    footer={[
                        <Button key="back" type={"primary"} onClick={() => toggleCardImageModal(false)}> Aceptar </Button>
                    ]}
                    width={modalWidth}
                >
                    <div style={{ textAlign: "center" }}>
                        <img
                            alt={item.cardName}
                            src={item.cardImage}
                            className={imgStyle}
                            onLoad={this.onImgLoad.bind(this)}
                            onClick={() => toggleCardImageModal(false, "", "")}/>
                        <div>
                            <div>
                                {item.description}
                            </div>
                            <div>
                                {item.date}
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CardImageModal;