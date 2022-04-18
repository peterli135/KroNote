import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState, convertToRaw} from "draft-js";

class TextEditorEdit extends React.Component {
    constructor(props) {
        super(props);
        const content = this.props.contentBlock;
        const contentState = convertFromRaw(content);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            contentState,
            editorState,
        };
    }

    onContentStateChange = contentState => {
        this.setState({
            contentState
        });
    };

    /*onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
        this.onEditorStateChangeOne(editorState);
    };*/

    render() {
        const { editorState } = this.state;

        const onEditorStateChange = (editorState) => {
            this.setState({
                editorState
            });
            return this.props.onChange(
                convertToRaw(editorState.getCurrentContent())
            );
        }

        return (
            <div className="form__input">
                <Editor
                    editorState={editorState}
                    editorClassName={"editorClassName form__input"}
                    wrapperClassName="wrapperClassName"
                    onEditorStateChange={onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                />
            </div>
        );
    } 
}

export default TextEditorEdit;