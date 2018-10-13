import * as React from 'react';
// import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextareaAutosize from 'react-textarea-autosize';

class TextLayout extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {text, secondText, actionClickText, actionChangeText, hasSecondText, actionChangeTextSecond} = this.props;
        return (
            <div className="text-content">
                <span className="subtitle">Add your text</span>

                {hasSecondText && <TextareaAutosize
                    minRows={1}
                    maxRows={1}
                    maxlength="4"
                    value={secondText}
                    onChange={actionChangeTextSecond}
                />}

                <TextareaAutosize
                    minRows={3}
                    maxRows={6}
                    value={text}
                    onClick={actionClickText}
                    onChange={actionChangeText}
                />
            </div>
        );
    };
}

interface IProps {
    text: string,
    secondText: string,
    actionChangeText: any,
    actionClickText: any,
    hasSecondText: any,
    actionChangeTextSecond: any
}

export default TextLayout;