import {Col, Layout, Row} from 'antd';
import 'antd/dist/antd.css';
import 'cropperjs/dist/cropper.css';
import {convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import * as html2canvas from 'html2canvas'
import * as React from 'react';
import MediaQuery from 'react-responsive';
// import RichTextEditor from 'react-rte';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '../assets/css/main.css';
import Details from "../components/details";
import FooterView from "../components/footer";
import HeaderView from "../components/header";
import CropModal from "../components/modals/cropModal";
import Preview from "../components/preview";
import Swipe from "../components/swipe/swipe";
import Templates from "../components/templates";
import TemplateType from '../components/templates/templateTypes';


class MainPage extends React.Component<{}, IState> {

    private templates = [
        {
            id: 1,
            picture: 'images/template1.jpg',
            selected: true,
            title: 'Overlay Info',
            type: TemplateType.Overlay
        },
        {
            id: 3,
            picture: 'images/template3.jpg',
            selected: false,
            title: 'Breath Logo',
            type: TemplateType.Breath
        },
        {
            id: 4,
            picture: 'images/template4.jpg',
            selected: false,
            title: 'Top Most',
            type: TemplateType.TopMost
        },
        {
            id: 5,
            picture: 'images/template5.jpg',
            selected: false,
            title: 'Animation 1',
            type: TemplateType.Animation1
        },
        {
            id: 6,
            picture: 'images/template6.jpg',
            selected: false,
            title: 'Animation 2',
            type: TemplateType.Animation2
        },
        {
            id: 7,
            picture: 'images/template7.jpg',
            selected: false,
            title: 'Animation 3',
            type: TemplateType.Animation3
        }];
    private cropModal: any;
    private slider: any;

    constructor(props: any) {
        super(props);
        this.state = {
            backgroundColor: 'white',
            backgroundImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
            layoutText: '',
            logoImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
            templateType: TemplateType.Overlay,
            templates: this.templates,
            text: EditorState.createEmpty()
        };
    }

    public render() {
        const {Content, Sider} = Layout;
        const { text, backgroundImg, logoImg, templateType, layoutText, backgroundColor} = this.state;

        return (
            <Layout className="layout">
                <div className="header-element">
                    <HeaderView />
                </div>
                <Layout className="layout-element">
                    <MediaQuery minWidth={901}>
                        <Content className="content">
                            <Col className="main-container content">
                                <Row>
                                    <Templates templates={this.templates}
                                               actionTemplateClick={this.actionTemplateClick}/>
                                </Row>
                                <Row>
                                    <Details text={text}
                                             backgroundColor={backgroundColor}
                                             backgroundImg={backgroundImg}
                                             logoImg={logoImg}
                                             actionBackColorChange={this.actionBackColorChange}
                                             actionOnUpload={this.actionOnUpload}
                                             actionChangeText={this.actionChangeText}/>
                                </Row>
                            </Col>
                            <CropModal ref={ref => this.cropModal = ref}
                                       actionCrop={this.actionOnCrop}/>
                        </Content>
                        <Sider className="sider" width={'40%'}>
                            <div className="previewDesktop">
                                <Preview
                                    backgroundImg={backgroundImg}
                                    backgroundColor={backgroundColor}
                                    logo={logoImg}
                                    text={layoutText}
                                    previewType={templateType}
                                    actionCreateInsta={this.actionCreateInstaNews}
                                    device='desktop'/>
                            </div>
                        </Sider>
                    </MediaQuery>
                    <MediaQuery maxWidth={900}>
                        <div className="slider-element">
                            <Slider ref={ref => this.slider = ref}
                                    dots={false}
                                    infinite={false}
                                    slidesToScroll={1}
                                    slidesToShow={1}
                                    swipeToSlide={false}
                                    swipe={false}
                                    speed={1}>
                                <div className="content">
                                    <Templates templates={this.templates}
                                               actionTemplateClick={this.actionTemplateClick}/>
                                </div>
                                <div className="content">
                                    <Details text={text}
                                             backgroundColor={backgroundColor}
                                             backgroundImg={backgroundImg}
                                             logoImg={logoImg}
                                             actionBackColorChange={this.actionBackColorChange}
                                             actionOnUpload={this.actionOnUpload}
                                             actionChangeText={this.actionChangeText}/>
                                </div>
                                <div className="content">
                                    <div className="previewMobile">
                                        <Preview
                                            backgroundImg={backgroundImg}
                                            backgroundColor={backgroundColor}
                                            logo={logoImg}
                                            text={layoutText}
                                            device='mobile'
                                            previewType={templateType}
                                            actionCreateInsta={this.actionCreateInstaNews}/>
                                    </div>
                                </div>
                            </Slider>
                            <Col className="swipe-control-element">
                                <Swipe actionMoveNext={this.moveNextPage} actionMovePrev={this.movePrevPage}/>
                            </Col>
                        </div>
                    </MediaQuery>
                </Layout>
                <div className="footer-element">
                    <FooterView />
                </div>
            </Layout>
        );
    }

    private actionBackColorChange = (color: any) => {
        this.setState({backgroundColor: color.hex});
    };

    private actionChangeText = (value: any) => {
        const text = draftToHtml(convertToRaw(value.getCurrentContent()))
        this.setState({layoutText: text, text: value});
    };

    private actionOnUpload = (data: any, type: string) => {
        this.cropModal.showCropModal(data, type);
    };

    private actionOnCrop = (data: any, type: string) => {
        if (type === 'background') {
            this.setState({backgroundImg: data});
        } else {
            this.setState({logoImg: data});
        }
    };

    private actionTemplateClick = (pos: number, items: any) => {
        items.forEach((item: any) => item.selected = false);
        items[pos].selected = true;
        this.setState({templates: items, templateType: items[pos].type});

    };

    private actionCreateInstaNews = () => {
        if (window.innerWidth > 900) {
            this.takeScreenshot('.preview-picture-desktop');
        } else {
            this.takeScreenshot('.preview-picture-mobile');
        }
    };

    private takeScreenshot = (elementID: string) => {
        const preview = document.querySelector(elementID) as HTMLElement;

        html2canvas(preview).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            this.downloadURI(imgData, "instanews.png");
        });
    };

    private downloadURI(uri: any, name: any) {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }

    private moveNextPage = () => {
        this.slider.slickNext();
    };

    private movePrevPage = () => {
        this.slider.slickPrev();
    };
}

interface IState {
    backgroundColor: any,
    text: string,
    layoutText: string,
    backgroundImg: string,
    logoImg: string,
    templateType: any,
    templates: any
}

export default MainPage;