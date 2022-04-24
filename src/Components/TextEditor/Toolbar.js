import React from "react";
import RenderInlineStyles from "./RenderInlineStyles";
import RenderBlockStyles from "./RenderBlockStyles"
import "./TextEditor.css";

export default class Toolbar extends React.Component {
    
    render() {
        //console.log("EditorState: TOOLBAR", this.props.editorState);
        return (
            <div className="TextEditor-toolbar">
                <RenderInlineStyles
                    editorState={this.props.editorState}
                    changeEditorState={this.props.changeEditorState}
                />
                <RenderBlockStyles
                    editorState={this.props.editorState}
                    changeEditorState={this.props.changeEditorState}
                />
            </div>
        );
    }
}