import React from "react";
import { RichUtils } from "draft-js";
import { BlockStyles } from "./ConstantStyles";

const RenderBlockStyles = (props) => { 
    const { editorState, changeEditorState } = props;

    // functions for applying block based on clicks
    const applyStyle = (e, style) => {
        e.preventDefault();
        changeEditorState(RichUtils.toggleBlockType(editorState, style));
    };
    const isActive = style => {
        const currentBlock = RichUtils.getCurrentBlockType(editorState);
        if (currentBlock === style) {
            return true;
        } else return false;
    };

    return (
        <>
            <ul className="TextEditor-toolbar-menu-list">
                {BlockStyles.map((item, index) => {
                    return (
                        <li key={`${item.label}-${index}`}
                            onMouseDown={(event) => {
                                event.preventDefault();
                            }}
                        >
                            <button className={"TextEditor-toolbar-item-button TextEditor-tooltip " + (isActive(item.block) === true ? "active" : "")}
                                onClick={e => applyStyle(e, item.block)}
                            >
                                {item.icon || item.label}
                                <span className="TextEditor-toolbar-item-inner">
                                    <span className="TextEditor-tooltip-text">
                                        {item.label} ({item.shortcut}
                                        <span className="TextEditor-tooltip-shortcut-key">{item.shortcutKey})</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default RenderBlockStyles;