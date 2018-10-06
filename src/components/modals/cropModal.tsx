import {Button, Modal} from 'antd';
import * as React from 'react';
import Cropper from 'react-cropper';

class CropModal extends React.Component<IProps, IState> {

    private cropper: any;
    private source: string = '';

    constructor(props: any) {
        super(props);
        this.state = {imageUrl: '', visible: false, source: ''};
    }

    public render = () => {
        const {visible, imageUrl, source} = this.state;
        const aspectRation = source === 'logo' ? 0 : 9 / 16;
        const style = source !== 'logo' ? {height: 400, width: '100%'} : {height: 55, width: '100%'};
        return (
            <Modal
                visible={visible}
                title="Add Cover Image"
                onOk={this.actionCropOk}
                onCancel={this.actionCropCancel}
                footer={[
                    <Button key="back" onClick={this.actionCropCancel}>Return</Button>,
                    <Button key="submit" type="primary" onClick={this.actionCropOk}>Submit</Button>
                ]}>
                <Cropper
                    ref={(cropper:any) => this.cropper = cropper}
                    src={imageUrl}
                    style={style}
                    aspectRatio={aspectRation}
                    guides={false}/>
            </Modal>
        );
    };

    public showCropModal = (data: any, sourceUrl: string) => {
        console.log(data, sourceUrl);

        this.source = sourceUrl;
        this.setState({visible: true, imageUrl: data, source: sourceUrl});
    };

    public hideCropModal = () => {
        this.setState({visible: false});
    };

    private actionCropOk = () => {
        setTimeout(() => {
            this.setState({visible: false});
        }, 500);
        const data = this.cropper.getCroppedCanvas({
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
        }).toDataURL('image/png');
        this.props.actionCrop(data, this.source);
    };

    private actionCropCancel = () => {
        this.setState({visible: false});
    };
}

interface IProps {
    actionCrop: any
}

interface IState {
    imageUrl: any,
    visible: boolean,
    source: string
}

export default CropModal;