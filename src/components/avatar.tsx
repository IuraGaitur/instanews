import {Icon, Upload} from 'antd';
import * as React from 'react';

class Avatar extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {loading: false};
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.props.imageUrl !== null && this.props.imageUrl !== nextProps.imageUrl) {
            this.setState({loading: false});
        }
    }

    public render = () => {
        const {loading} = this.state;
        const {imageUrl} = this.props;
        const uploadButton = (
            <div className="btn-add">
                <Icon type={loading ? 'loading' : 'plus'}/>
                <span className="ant-upload-text">Upload</span>
            </div>
        );
        return (
            <Upload
                accept="image/*"
                beforeUpload={this.handleBeforeUpload}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                name='avatar'>
                {this.isNotEmptyPic(imageUrl) ? <img src={imageUrl} alt="avatar" className="avatar"/> : uploadButton}
            </Upload>);
    };

    public setLoading = (state: boolean) => {
        console.log("Setting state", state);
        this.setState({loading: state});
    };

    private handleBeforeUpload = (info: any) => {
        const uploadCallback = this.props.onUpload;
        this.setLoading(true);
        this.getBase64(info, (data: any) => {
            this.setLoading(false);
            uploadCallback(data, this.props.type,);
        });
        return false;
    };

    private isNotEmptyPic = (data: string) => {
        return data != null && data !== 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    };

    private getBase64(img: any, callback: any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            callback(reader.result)
        });
        reader.readAsDataURL(img);
    }
}


interface IState {
    loading: boolean
}

interface IProps {
    imageUrl: string,
    type: string,
    onUpload: any,
}


export default Avatar;