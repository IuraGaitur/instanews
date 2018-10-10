import {Col, Layout, Row} from 'antd';
import 'antd/dist/antd.css';
import 'cropperjs/dist/cropper.css';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import MediaQuery from 'react-responsive';
import Slider from "react-slick";
import domtoimage from 'retina-dom-to-image';
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
            cropDimension: 9 / 16,
            hasBackground: false,
            hasCover: true,
            id: 1,
            picture: 'images/template1.jpg',
            selected: true,
            title: 'Overlay Info',
            type: TemplateType.Overlay,
        },
        {
            cropDimension: 0.8,
            hasBackground: true,
            hasCover: true,
            id: 3,
            picture: 'images/template3.jpg',
            selected: false,
            title: 'Breath Logo',
            type: TemplateType.Breath
        },
        {
            cropDimension: 9 / 16,
            hasBackground: true,
            hasCover: false,
            id: 4,
            picture: 'images/template4.jpg',
            selected: false,
            title: 'Top Most',
            type: TemplateType.TopMost
        },
        {
            cropDimension: 1,
            hasBackground: true,
            hasCover: true,
            id: 5,
            picture: 'images/template5.jpg',
            selected: false,
            title: 'Animation 1',
            type: TemplateType.Animation1
        },
        {
            cropDimension: 1,
            hasBackground: true,
            hasCover: true,
            id: 6,
            picture: 'images/template6.jpg',
            selected: false,
            title: 'Animation 2',
            type: TemplateType.Animation2
        }];
    private cropModal: any;
    private cropModalMobile: any;
    private slider: any;

    constructor(props: any) {
        super(props);
        this.state = {
            activeTemplate: this.templates[0],
            backgroundColor: 'transparent',
            backgroundImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
            layoutText: '',
            logoImg: localStorage.getItem("logoImg"),
            templateType: TemplateType.Overlay,
            templates: this.templates,
            text: 'Please insert your text here'
        };
        ReactGA.initialize('UA-127299798-1', {
            debug: false,
            titleCase: false
        });
    }

    public render() {
        const {Content, Sider} = Layout;
        const {text, backgroundImg, logoImg, templateType, backgroundColor, activeTemplate} = this.state;

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
                                             hasBackground={activeTemplate.hasBackground}
                                             hasCoverImage={activeTemplate.hasCover}
                                             backgroundColor={backgroundColor}
                                             backgroundImg={backgroundImg}
                                             logoImg={logoImg}
                                             actionBackColorChange={this.actionBackColorChange}
                                             actionOnUpload={this.actionOnUpload}
                                             actionChangeText={this.actionChangeText}/>
                                </Row>
                            </Col>
                            <CropModal ref={ref => this.cropModal = ref}
                                       actionCrop={this.actionOnCrop}
                                       size={activeTemplate.cropDimension}/>
                        </Content>
                        <Sider className="sider" width={'40%'}>
                            <div className="previewDesktop">
                                <Preview
                                    backgroundImg={backgroundImg}
                                    backgroundColor={backgroundColor}
                                    logo={logoImg}
                                    text={text}
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
                                             hasBackground={activeTemplate.hasBackground}
                                             hasCoverImage={activeTemplate.hasCover}
                                             backgroundColor={backgroundColor}
                                             backgroundImg={backgroundImg}
                                             logoImg={logoImg}
                                             actionBackColorChange={this.actionBackColorChange}
                                             actionOnUpload={this.actionOnUploadMobile}
                                             actionChangeText={this.actionChangeText}/>

                                    <CropModal ref={ref => this.cropModalMobile = ref}
                                               actionCrop={this.actionOnCrop}
                                               size={activeTemplate.cropDimension}/>
                                </div>
                                <div className="content">
                                    <div className="previewMobile">
                                        <Preview
                                            backgroundImg={backgroundImg}
                                            backgroundColor={backgroundColor}
                                            logo={logoImg}
                                            text={text}
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
        this.setState({backgroundColor: `rgba(${ color.rgb.r }, ${ color.rgb.g }, ${ color.rgb.b }, ${ color.rgb.a })`});
    };

    private actionChangeText = (value: any) => {
        this.setState({text: value.target.value});
    };

    private actionOnUpload = (data: any, type: string) => {
        this.cropModal.showCropModal(data, type);
    };

    private actionOnUploadMobile = (data: any, type: string) => {
        this.cropModalMobile.showCropModal(data, type);
    };

    private actionOnCrop = (data: any, type: string) => {
        if (type === 'background') {
            this.setState({backgroundImg: data});
        } else {
            localStorage.setItem("logoImg", data);
            this.setState({logoImg: data});
        }
        this.sendCropEvent(type)
    };

    private actionTemplateClick = (pos: number, items: any) => {
        items.forEach((item: any) => item.selected = false);
        items[pos].selected = true;
        this.setState({activeTemplate: items[pos], templates: items, templateType: items[pos].type});
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
        domtoimage.toPng(preview)
            .then((dataUrl: any) => {
                this.downloadURI(dataUrl, "instanews.png");
            });
    };

    private downloadURI(uri: any, name: any) {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        this.sendFinalTemplate(this.state.activeTemplate.title);
        this.sendDownloadEvent();
    }

    private moveNextPage = () => {
        this.slider.slickNext();
    };

    private movePrevPage = () => {
        this.slider.slickPrev();
    };

    private sendCropEvent = (type: string) => {
        ReactGA.event({
            action: 'Crop',
            category: 'Action',
            label: type
        });
    }

    private sendFinalTemplate = (template: string) => {
        ReactGA.event({
            action: 'Template',
            category: 'Action',
            label: template
        });
    }

    private sendDownloadEvent = () => {
        ReactGA.event({
            action: 'Download',
            category: 'Action'
        });
    }
}

interface IState {
    activeTemplate: any,
    backgroundColor: any,
    text: string,
    layoutText: string,
    backgroundImg: string,
    logoImg: string,
    templateType: any,
    templates: any
}

export default MainPage;