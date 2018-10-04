import {Col, Popover, Row} from 'antd';
import * as React from "react";
import {CompactPicker} from 'react-color';
import Avatar from "./avatar";
import TextLayout from "./textLayout";


class Details extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {text, backgroundColor, actionBackColorChange, actionChangeText, actionOnUpload, backgroundImg, logoImg} = this.props;
        return (
            <div>
                <Row type="flex" justify="start" align="top" className="content-margin">
                    <Col>
                        <TextLayout text={text}
                                    actionChangeText={actionChangeText}/>
                    </Col>
                    <div className="upload-content">
                        <Col>
                            <span className="subtitle">Background</span>
                            <Popover title="Color"
                                     trigger="click"
                                     content={<div>
                                         <CompactPicker color={backgroundColor}
                                                        onChangeComplete={ actionBackColorChange }/>
                                     </div>}>
                                <div className="center ant-upload ant-upload-select-picture-card">
                                    <div style={{'width': '70px', 'height': '70px', margin: '8px', 'backgroundColor': backgroundColor}}/>
                                </div>
                            </Popover>
                        </Col>
                        <Col >
                            <span className="subtitle">Cover</span>
                            <div className="left">
                                <Avatar onUpload={actionOnUpload} imageUrl={backgroundImg} type='background'/>
                            </div>
                        </Col>
                        <Col>
                            <span className="subtitle">Logo</span>
                            <Avatar onUpload={actionOnUpload} imageUrl={logoImg} type='logo'/>
                        </Col>

                    </div>
                </Row>
            </div>
        );
    }
}

interface IProps {
    text: string,
    backgroundColor: string,
    backgroundImg: string,
    logoImg: string,
    actionOnUpload: any,
    actionChangeText: any,
    actionBackColorChange: any
}

export default Details;