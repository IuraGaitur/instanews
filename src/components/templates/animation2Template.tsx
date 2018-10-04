import * as React from 'react';

class Animation2Template extends React.Component<IProps, {}> {

    // private picture = 'images/template5.jpg';
    // private logoDefaultYPos = 20;
    // private textDefaultYPos = 80;

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {image, logo, text, backgroundColor} = this.props;

        return (
            <div className="previewThumb center">
                <div style={{'backgroundColor': backgroundColor, width: '100%', height: '100%'}}>
                    <div className="preview-background"/>
                    <img src={image}/>
                    <div style={{
                        'paddingLeft': 8, 'paddingRight': 8,
                        'position': 'relative'
                    }}>
                        <div className="content" dangerouslySetInnerHTML={{__html: text}}/>
                    </div>
                    <img src={logo} style={{'position': 'relative'}}/>
                </div>
            </div>
        );
    }

}

interface IProps {
    backgroundColor: string,
    image: string,
    logo: string,
    text: string
}

export default Animation2Template;