import * as React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextLayout extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render = () => {
        const {text, actionChangeText} = this.props;

        return (
            <div className="text-content">
                <span className="subtitle">Add your text</span>
                <Editor
                    editorState={text}
                    toolbarClassName="toolbar-editor"
                    wrapperClassName="wrapperClassName"
                    editorClassName="text-editor"
                    onEditorStateChange={actionChangeText}
                    toolbar={{
                        inline: {options: ['bold', 'italic', 'underline']},
                        options: ['inline', 'fontSize', 'fontFamily', 'textAlign', 'colorPicker'],
                        textAlign: {inDropdown: true},
                    }}/>
            </div>
        );
    };
}

interface IProps {
    text: string,
    actionChangeText: any,
}

export default TextLayout;