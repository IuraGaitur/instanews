import {Button, Icon} from 'antd';
import * as React from 'react';

class Swipe extends React.Component<IProps, IState> {

    private elements = [{id: 1, active: true}, {id: 2, active: false}, {id: 3, active: false}];

    constructor(props: any) {
        super(props);
        this.state = {tabs: this.elements, disableBack: true, disableNext: false};
    }

    public render = () => {
        const {tabs, disableBack, disableNext} = this.state;
        return (
            <div className="swipe-footer">
                <Button className="transparent-btn transparent-btn-disabled"
                        onClick={this.changePage.bind(this, tabs, 'back')}
                        disabled={disableBack}>
                    <Icon className="arrow-icon" type="arrow-left"/>Back</Button>
                <div className="dots">
                    {tabs.map((item: any, pos: number) =>
                        <div key={pos} className={item.active ? 'dot-active' : 'dot'}/>
                    )}
                </div>
                <Button className="transparent-btn"
                        onClick={this.changePage.bind(this, tabs, 'next')}
                        disabled={disableNext}>Next
                    <Icon className="arrow-icon" type="arrow-right"/>
                </Button>
            </div>
        );
    };

    private getActivePos = (tabs: any) => {
        return tabs.findIndex((item: any) => item.active === true);
    };

    private changePage = (tabs: any, actionType: string) => {
        let activePos: number = this.getActivePos(tabs);
        const canNext: boolean = (actionType === 'next' && activePos < tabs.length - 1);
        const canBack: boolean = (actionType === 'back' && activePos > 0);

        if (!canNext && !canBack) {
            return;
        }
        if (canNext) {
            activePos++;
            this.props.actionMoveNext();
        }
        if (canBack) {
            activePos--;
            this.props.actionMovePrev();
        }

        this.setButtonsState(activePos, tabs.length - 1);
        tabs.forEach((item: any) => item.active = false);
        tabs[activePos].active = true;
        this.setState({tabs});
    };

    private setButtonsState = (activePos: number, totalLength: number) => {
        if (activePos === 0) {
            this.setState({disableBack: true});
        } else {
            this.setState({disableBack: false});
        }
        if (activePos === totalLength) {
            this.setState({disableNext: true});
        } else {
            this.setState({disableNext: false});
        }
    }

}

interface IState {
    tabs: any,
    disableBack: boolean,
    disableNext: boolean
}

interface IProps {
    actionMoveNext: any,
    actionMovePrev: any
}

export default Swipe;