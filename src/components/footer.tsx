import {Layout} from 'antd';
import * as React from 'react';

class FooterView extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {Footer} = Layout;

        return (
            <Footer className="footer-ant">
                <div className="footer">
                    <span className="footer-text">Powered by: Iurie Gaitur</span>
                    <span className="footer-text">Contact us : iura.gaitur@gmail.com</span>
                </div>
            </Footer>
        );
    }

}

export default FooterView;