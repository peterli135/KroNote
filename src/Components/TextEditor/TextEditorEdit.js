import React from "react";
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor, convertFromRaw, EditorState, convertToRaw, KeyBindingUtil, RichUtils, getDefaultKeyBinding } from "draft-js";
import Toolbar from "./Toolbar";
import { styleMap } from "./ConstantStyles";

// function to create keybindings for custom styles
function keyBindingFunction(event) {
    if (KeyBindingUtil.hasCommandModifier(event) && event.key === "d") {
        return "strikethrough";
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.key === "h") {
        return "highlight";
    }
    return getDefaultKeyBinding(event);
}

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

    handleKeyCommand(command) {
        // inline formatting key commands handles bold, italic, code, underline
        var editorState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if (!editorState && command === "strikethrough") {
            editorState = RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH");
        } else if (!editorState && command === "highlight") {
            editorState = RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT");
        }
        if (editorState) {
            this.setState({editorState});
            return "handled";
        }
        return "not-handled";
    }

    onContentStateChange = contentState => {
        this.setState({
            contentState
        });
    };

    changeEditorState(editorState) {
        this.setState({ editorState });
    }

    render() {
        const { editorState } = this.state;
        const onEditorStateChange = (editorState) => {
            this.setState({
                editorState
            });
            return this.props.onChange(convertToRaw(editorState.getCurrentContent()));
        }

        return (
            <div className="TextEditor-root form__input__editor">
                <div className="TextEditor-wrapper">
                    <Toolbar editorState={editorState} changeEditorState={this.changeEditorState.bind(this)} />
                    <div className="TextEditor-container">
                        <Editor
                            customStyleMap={styleMap}
                            //placeholder={placeholderText}
                            editorState={this.state.editorState}
                            onChange={onEditorStateChange}
                            handleKeyCommand={this.handleKeyCommand}
                            keyBindingFn={keyBindingFunction}
                        />
                    </div>
                </div>
            </div>
        );
    } 
}

export default TextEditorEdit;