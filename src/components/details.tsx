import {Col, Popover, Row} from 'antd';
import * as React from "react";
import {SketchPicker} from 'react-color';
import Avatar from "./avatar";
import TextLayout from "./textLayout";


class Details extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {text, backgroundColor, actionBackColorChange, actionClickText, actionChangeText,
                actionOnUpload, backgroundImg, logoImg,
                hasBackground, hasCoverImage, secondText, hasSecondText, actionChangeTextSecond} = this.props;
        return (
            <div>
                <Row type="flex" justify="start" align="top" className="content-margin">
                    <Col>
                        <TextLayout text={text}
                                    secondText={secondText}
                                    actionClickText={actionClickText}
                                    actionChangeText={actionChangeText}
                                    hasSecondText={hasSecondText}
                                    actionChangeTextSecond={actionChangeTextSecond}/>
                    </Col>
                    <div className="upload-content">
                        {hasBackground &&
                        <Col className="space-right">
                            <span className="subtitle">Background</span>
                            <Popover title="Color"
                                     trigger="click"
                                     content={<div>
                                         <SketchPicker color={backgroundColor}
                                                       onChangeComplete={ actionBackColorChange }/>
                                     </div>}>
                                <div className="center ant-upload ant-upload-select-picture-card">
                                    <div style={{'width': '70px', 'height': '70px', margin: '8px', 'backgroundColor': backgroundColor}}/>
                                </div>
                            </Popover>
                        </Col>
                        }
                        {hasCoverImage &&
                        <Col className="space-right">
                            <span className="subtitle">Cover</span>
                            <div className="left">
                                <Avatar onUpload={actionOnUpload} imageUrl={backgroundImg} type='background'/>
                            </div>
                        </Col>}
                        <Col className="space-right">
                            <span className="subtitle">Logo</span>
                            <div className="left">
                                <Avatar onUpload={actionOnUpload} imageUrl={logoImg} type='logo'/>
                            </div>
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
    actionClickText: any,
    actionChangeText: any,
    actionBackColorChange: any,
    hasBackground: boolean,
    hasCoverImage: boolean,

    hasSecondText: boolean,
    secondText: string,
    actionChangeTextSecond: any,
}

export default Details;