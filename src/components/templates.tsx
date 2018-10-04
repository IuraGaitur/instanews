import {Card, Col, Row} from 'antd';
import * as React from 'react';

class Templates extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {templates, actionTemplateClick} = this.props;
        const {Meta} = Card;
        return (
            <div>
                <h3 className="subtitle">Select template</h3>
                <Row className="thumbs">
                    {templates.map((item: any, pos: number, items: any) =>
                        <Col key={item.id} xs={{span: 10, offset: (pos % 2 === 0) ? 0 : 1}}
                             lg={{span: 6, offset: (pos === 0) ? 0 : 1}}
                             id={'thumb' + item.id} className="gutter-box">
                            <Card hoverable={item.selected ? false : true}
                                  onClick={actionTemplateClick.bind(this, pos, items)}
                                  className={(item.selected ? 'thumb-selected' : '')}
                                  cover={<img src={item.picture} alt="..." className='thumb-img'/>}>
                                <Meta title={item.title}/>
                            </Card>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}

interface IProps {
    templates: any,
    actionTemplateClick: any
}


export default Templates;