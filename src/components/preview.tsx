import {Button} from 'antd';
import * as React from 'react';
import Animation1Template from "./templates/animation1Template";
import Animation2Template from "./templates/animation2Template";
import Animation3Template from "./templates/animation3Template";
import BreathTemplate from "./templates/breathTemplate";
import OverlayTemplate from "./templates/overlayTemplate";
import TemplateType from './templates/templateTypes';
import TopMostTemplate from "./templates/topMostTemplate";

class Preview extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {backgroundImg, backgroundColor, logo, text, actionCreateInsta, previewType, device} = this.props;
        const template = this.getTemplate(previewType, text, backgroundColor, backgroundImg, logo);

        return (
            <div className="preview">
                <h2 className="subtitle">Result</h2>
                <div className={"gray-box center preview-picture-" + device}>
                    {template}
                </div>

                <Button type="primary" className="btn submit-btn" onClick={actionCreateInsta}>
                    <span className="caption">Download</span>
                </Button>
            </div>
        );
    };

    private getTemplate = (type: any, text: string, backgroundColor: string, backgroundImg: string, logo: string) => {
        switch (type) {
            case TemplateType.Overlay:
                return (
                    <OverlayTemplate text={text} backgroundColor={backgroundColor}
                                     image={backgroundImg} logo={logo}/>);
            case TemplateType.Breath:
                return (
                    <BreathTemplate text={text} backgroundColor={backgroundColor}
                                    image={backgroundImg} logo={logo}/>);
            case TemplateType.TopMost:
                return (
                    <TopMostTemplate text={text} backgroundColor={backgroundColor}
                                     image={backgroundImg} logo={logo}/>);
            case TemplateType.Animation1:
                return (
                    <Animation1Template text={text} backgroundColor={backgroundColor}
                                        image={backgroundImg} logo={logo}/>);
            case TemplateType.Animation2:
                return (
                    <Animation2Template text={text} backgroundColor={backgroundColor}
                                        image={backgroundImg} logo={logo}/>);
            case TemplateType.Animation3:
                return (
                    <Animation3Template text={text} backgroundColor={backgroundColor}
                                        image={backgroundImg} logo={logo}/>);

            default:
                return (
                    <OverlayTemplate text={text} backgroundColor={backgroundColor}
                                     image={backgroundImg} logo={logo}/>);
        }
    };
}

interface IProps {
    backgroundImg: string,
    backgroundColor: string,
    logo: string,
    text: string,
    actionCreateInsta: any,
    previewType: any
    device: string
}

export default Preview;