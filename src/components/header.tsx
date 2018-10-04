import {Layout} from 'antd';
import * as React from 'react';

class HeaderView extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {Header} = Layout;

        return (
            <Header className="header-background">
                <div className="header-background">
                    <img src="images/back_header.png" className="header-picture"/>
                    <div className="header-gradient"/>
                    <div className="header-text-wrapper">
                        <div className="header-text-layout">
                            <div className="header-title">InstaNews Builder</div>
                            <div className="header-subtitle">Create your instastory Faster</div>
                        </div>
                    </div>
                </div>
            </Header>
        );
    }

}

export default HeaderView;