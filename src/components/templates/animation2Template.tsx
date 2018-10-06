import * as React from 'react';
import {Rnd} from 'react-rnd';

class Animation2Template extends React.Component<IProps, IState> {

    private disableResizing = { top:false, right: false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }

    constructor(props: any) {
        super(props);
        this.state = {
            height: 18,
            textX: 0,
            textY: 40,
            width: 91,
            x: 80,
            y: 10
        };
    }

    public render = () => {
        const {image, logo, text, backgroundColor} = this.props;

        return (
            <div className="previewThumb center-hor relative">
                <div style={{'backgroundColor': backgroundColor, width: '100%', height: '100%'}}>
                    <div className="preview-background"/>
                    <img src={image} className="previewThumb img-animation-2" style={{width: '100%', height: '100%'}}/>
                    <Rnd bounds="parent" enableResizing={this.disableResizing}
                         position={{ x: this.state.textX, y: this.state.textY }}
                         onDragStop={(e, d) => { this.setState({ textX: d.x, textY: d.y }) }}>
                        <div style={{
                            'display': 'block',
                            'paddingLeft': 8, 'paddingRight': 8,
                            'position': 'relative'
                        }}>
                            <div className="content-text red-background" dangerouslySetInnerHTML={{__html: text}}/>
                        </div>
                    </Rnd>
                    <Rnd
                        style={{
                            alignItems: "center",
                            backgroundImage: "url('" + logo + "')",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}
                        size={{width: this.state.width, height: this.state.height}}
                        position={{x: this.state.x, y: this.state.y}}
                        onDragStop={(e, d) => {
                            this.setState({x: d.x, y: d.y});
                        }}
                        bounds="parent"
                        onResize={(e, direction, ref, delta, position) => {
                            this.setState({
                                height: ref.style.height,
                                width: ref.style.width,
                                ...position
                            });
                        }}
                    />
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

interface IState {
    height: any,
    width: any,
    x: number,
    y: number,
    textX: number,
    textY: number
}

export default Animation2Template;