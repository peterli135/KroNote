import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bold from "../Components/Icons/bold-solid.svg"
import { faBold } from "@fortawesome/free-solid-svg-icons";

const TextEditor = props => {
    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());
    
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        //console.log("props: ", props);

        return props.onChange(
            convertToRaw(editorState.getCurrentContent())
        );
    }
    
    return(
        <div className="form__input">
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName form__input"
                onEditorStateChange={onEditorStateChange}
                placeholder="Enter information..."
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'emoji', 'history'],
                    inline: {
                        inDropdown: true,
                        options: ["bold", "italic", "underline", "strikethrough", "monospace", "superscript"],
                        bold: { icon: <FontAwesomeIcon icon={faBold} />, className: "demo-option-custom" },
                        italic: { icon: <FontAwesomeIcon icon="fa-solid fa-italic" />, className: "demo-option-custom" },
                        underline: { icon: <FontAwesomeIcon icon="fa-solid fa-underline" />, className: "demo-option-custom" },
                        strikethrough: {
                            icon: <FontAwesomeIcon icon="fa-solid fa-strikethrough" />,
                            className: "demo-option-custom"
                        },
                        monospace: { className: "demo-option-custom" },
                        superscript: {
                            icon: <FontAwesomeIcon icon="fa-solid fa-superscript" />,
                            className: "demo-option-custom"
                        },
                        subscript: { icon: <FontAwesomeIcon icon="fa-solid fa-subscript" />, className: "demo-option-custom" }
                    },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
            />
        </div>
    );
}
    
export default TextEditor;