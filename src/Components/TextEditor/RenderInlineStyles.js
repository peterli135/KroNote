import React, { useState, useEffect, useRef } from "react";
import { undoredoStyles, fontSizes, fontStyles, inlineStyles } from "./ConstantStyles";
import { EditorState, RichUtils } from "draft-js";
import { Modifier } from "draft-js";

const RenderInlineStyles = (props) => { 
    const { editorState, changeEditorState } = props;
    const [isDown, setIsDown] = useState(false);
    const [isUndoRedo, setIsUndoRedo] = useState("");
    const [fontSizeDropdown, setFontSizeDropdown] = useState(false);
    const [selectedFontSize, setSelectedFontSize] = useState("");
    const [fontDropdown, setFontDropdown] = useState(false);
    const [selectedFont, setSelectedFont] = useState("");
    const refFontSizeDropdown = useRef();
    const refFontDropdown = useRef();

    // hooks to open/close the font dropdown menu
    useEffect(() => {
        const checkIfClickedOutside = event => {
            // If the menu is open and the clicked target is not within the menu, then close the menu
            if (fontSizeDropdown && refFontSizeDropdown.current && !refFontSizeDropdown.current.contains(event.target)) {
                setFontSizeDropdown(false)
            }
            if (fontDropdown && refFontDropdown.current && !refFontDropdown.current.contains(event.target)) {
                setFontDropdown(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    })
    // hook to set selected font size to default size (16), if no font is currently selected
    useEffect(() => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        var matchCurrentStyle = currentStyle.filter(customFontSize => customFontSize.match(/^FONT_SIZE_/));
        if (matchCurrentStyle.isEmpty()) {
            setSelectedFontSize("16");
        } else {
            fontSizes.forEach((fontSize) => {
                if (matchCurrentStyle.has(fontSize.style)) {
                    setSelectedFontSize(fontSize.label);
                }
            })
        }
    }, [props.editorState]);
    // hook to set selected font to default, if no font is currently selected
    useEffect(() => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        var matchCurrentStyle = currentStyle.filter(customFontSize => customFontSize.match(/^FONT-/));
        if (matchCurrentStyle.isEmpty()) {
            setSelectedFont("Default");
        } else {
            fontStyles.forEach((fontStyle) => {
                if (matchCurrentStyle.has(fontStyle.style)) {
                    setSelectedFont(fontStyle.label);
                }
            })
        }
    }, [props.editorState]);

    // functions for clicking on undo and redo buttons
    const applyUndoRedo = (e, style) => {
        e.preventDefault();
        if (style === "UNDO") {
            changeEditorState(EditorState.undo(editorState));
        } else if (style === "REDO") {
            changeEditorState(EditorState.redo(editorState));
        }
    }
    const handleMouseDown = (e, style) => {
        e.preventDefault();
        setIsDown(true);
        setIsUndoRedo(style);
        window.addEventListener("mouseup", handleMouseUp, true);
    }
    const handleMouseUp = (e) => {
        e.preventDefault();
        setIsDown(false);
        setIsUndoRedo("");
        window.removeEventListener("mouseup", handleMouseUp, true);
    }

    // functions for applying styles based on clicks
    const applyStyle = (e, style) => {
        e.preventDefault();
        changeEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };
    const isActive = style => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    };

    // functions for applying fontsize/font (only one can be applied at a time)
    const applyFontSize = (e, style, label) => {
        e.preventDefault();
        const selection = editorState.getSelection();

        // only allow one font size at a time. turn off all other active font sizes
        const nextContentState = Object.keys(fontSizes).reduce((contentState, fontSize) => {
            return Modifier.removeInlineStyle(contentState, selection, fontSize)
        }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(editorState, nextContentState, "change-inline-style");
        const currentStyle = editorState.getCurrentInlineStyle();
        const matchCurrentStyle = currentStyle.filter(customFontSize => customFontSize.match(/^FONT_SIZE_/));

        // unset style override for current font size
        if (selection.isCollapsed()) {
            nextEditorState = matchCurrentStyle.reduce((state, fontSize) => {
                return RichUtils.toggleInlineStyle(state, fontSize);
            }, nextEditorState);
        }
        // if font size is being toggled on, apply it
        if (!matchCurrentStyle.has(style)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, style);
            setSelectedFontSize(label);
        }
        changeEditorState(nextEditorState);
    }
    const applyFont = (e, style, label) => {
        e.preventDefault();
        const selection = editorState.getSelection();

        // only allow one font at a time. turn off all other active fonts
        const nextContentState = Object.keys(fontStyles).reduce((contentState, font) => {
            return Modifier.removeInlineStyle(contentState, selection, font)
        }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(editorState, nextContentState, "change-inline-style");
        const currentStyle = editorState.getCurrentInlineStyle();
        const matchCurrentStyle = currentStyle.filter(customFontSize => customFontSize.match(/^FONT-/));

        // unset style override for current font
        if (selection.isCollapsed()) {
            nextEditorState = matchCurrentStyle.reduce((state, font) => {
                return RichUtils.toggleInlineStyle(state, font);
            }, nextEditorState);
        }
        // if font size is being toggled on, apply it
        if (!matchCurrentStyle.has(style)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, style);
            setSelectedFont(label);
        }
        changeEditorState(nextEditorState);
    }
    const isFontOrFontSizeActive = style => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    }

    return (
        <>
            {/* Undo/Redo Buttons */}
            <ul className="TextEditor-toolbar-menu-list">
                {undoredoStyles.map((item, index) => {
                    return (
                        <li key={`${item.label}-${index}`} onMouseDown={(event) => {event.preventDefault();}}>
                            <button className={"TextEditor-toolbar-item-button undoredo TextEditor-tooltip " + (isDown && item.style === isUndoRedo ? "active" : "")}
                                onClick={e => applyUndoRedo(e, item.style)}
                                onMouseDown={e => handleMouseDown(e, item.style)}
                                onMouseUp={e => handleMouseUp(e)}
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
            {/* Font & Font Size Dropdown Buttons */}
            <ul className="TextEditor-toolbar-menu-list">
                {/* For Fonts */}
                <li onMouseDown={(event) => {event.preventDefault();}} ref={refFontDropdown} >
                    <button className={"TextEditor-toolbar-item-button TextEditor-tooltip TextEditor-tooltip-size font " + (fontDropdown ? "show" : "")}
                        onClick={(event) => {event.preventDefault(); setFontDropdown(!fontDropdown);}}
                    >
                        <span className="TextEditor-toolbar-fontsize-text">{selectedFont ? selectedFont : "Font"}</span>
                        <img src="/expand_more.png" alt="" className={"expand__icon " + (fontDropdown ? "rotate" : "")}></img>
                        <span className="TextEditor-toolbar-item-inner">
                            <span className="TextEditor-tooltip-text">Size</span>
                        </span>
                    </button>
                    <ul className={"TextEditor-toolbar-fontsize-dropdown " + (fontDropdown ? "show" : "")}>
                        {fontStyles.map((item, index) => {
                            return (
                                <li onClick = {(e) => {
                                        applyFont(e, item.style, item.label);
                                        setFontDropdown(false);
                                    }}
                                    className={"TextEditor-toolbar-fontsize-dropdown-options " + (isFontOrFontSizeActive(item.style) ? "active" : "")}
                                    key={"font-size" + (index + 1)}
                                >
                                    {item.label}
                                </li>
                            );
                        })}
                    </ul>
                </li>
                {/*For Font Sizes */}
                <li onMouseDown={(event) => {event.preventDefault();}} ref={refFontSizeDropdown}>
                    <button className={"TextEditor-toolbar-item-button TextEditor-tooltip TextEditor-tooltip-size " + (fontSizeDropdown ? "show" : "")}
                        onClick={(event) => {event.preventDefault(); setFontSizeDropdown(!fontSizeDropdown);}}
                    >
                        <span className="TextEditor-toolbar-fontsize-text">{selectedFontSize ? selectedFontSize : "Size"}</span>
                        <img src="/expand_more.png" alt="" className={"expand__icon " + (fontSizeDropdown ? "rotate" : "")}></img>
                        <span className="TextEditor-toolbar-item-inner">
                            <span className="TextEditor-tooltip-text">Size</span>
                        </span>
                    </button>
                    <ul className={"TextEditor-toolbar-fontsize-dropdown " + (fontSizeDropdown ? "show" : "")}>
                        {fontSizes.map((item, index) => {
                            return (
                                <li onClick = {(e) => {
                                        applyFontSize(e, item.style, item.label);
                                        setFontSizeDropdown(false);
                                    }}
                                    className={"TextEditor-toolbar-fontsize-dropdown-options " + (isFontOrFontSizeActive(item.style) ? "active" : "")}
                                    key={"font-size" + (index + 1)}
                                >
                                    {item.label}
                                </li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
            {/* Rest of Inline Style Buttons */}
            <ul className="TextEditor-toolbar-menu-list">
                {inlineStyles.map((item, index) => {
                    return (
                        <li key={`${item.label}-${index}`} onMouseDown={(event) => { event.preventDefault(); }}>
                            <button className={"TextEditor-toolbar-item-button TextEditor-tooltip " + (isActive(item.style) ? "active" : "")}
                                onClick={e => applyStyle(e, item.style)}
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

export default RenderInlineStyles;