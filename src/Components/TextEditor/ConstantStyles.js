import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faUnderline, faItalic, faStrikethrough, faHighlighter, faUndo, faRedo, faListUl, faListOl } from "@fortawesome/free-solid-svg-icons";

// creates custom styles
const styleMap = {
    "HIGHLIGHT": {
        backgroundColor: "#faed27",
    },
    // font sizes to change font size
    "FONT_SIZE_8": { fontSize: "8px", },
    "FONT_SIZE_9": { fontSize: "9px", },
    "FONT_SIZE_10": { fontSize: "10px", },
    "FONT_SIZE_11": { fontSize: "11px", },
    "FONT_SIZE_12": { fontSize: "12px", },
    "FONT_SIZE_14": { fontSize: "14px", },
    "FONT_SIZE_18": { fontSize: "18px", },
    "FONT_SIZE_24": { fontSize: "24px", },
    "FONT_SIZE_30": { fontSize: "30px", },
    "FONT_SIZE_36": { fontSize: "36px", },
    "FONT_SIZE_48": { fontSize: "48px", },
    "FONT_SIZE_60": { fontSize: "60px", },
    "FONT_SIZE_72": { fontSize: "72px", },
    // fonts to change font
    "FONT-LATO": { fontFamily: "'Lato', sans-serif"},
    "FONT-MONTSERRAT": { fontFamily: "'Montserrat', sans-serif"},
    "FONT-PLAYFAIR_DISPLAY": { fontFamily: "'Playfair Display', sans-serif"},
    "FONT-OPEN_SANS": { fontFamily: "'Open Sans', sans-serif"},
    "FONT-RALEWAY": { fontFamily: "'Raleway', sans-serif"},
    "FONT-Roboto": { fontFamily: "'Roboto', sans-serif"},
};

// constants for undo/redo styles & inline styles
const undoredoStyles = [
    {
        label: "Undo",
        style: "UNDO",
        shortcut: "CTRL+",
        shortcutKey: "Z",
        icon: <FontAwesomeIcon icon={faUndo} />
    },
    {
        label: "Redo",
        style: "REDO",
        shortcut: "CTRL+",
        shortcutKey: "Y",
        icon: <FontAwesomeIcon icon={faRedo} />
    }
];
const fontSizes = [
    { label: "8", style: "FONT_SIZE_8" },
    { label: "9", style: "FONT_SIZE_9" },
    { label: "10", style: "FONT_SIZE_10" },
    { label: "11", style: "FONT_SIZE_11" },
    { label: "12", style: "FONT_SIZE_12" },
    { label: "14", style: "FONT_SIZE_14" },
    //{ label: "16", style: "FONT_SIZE_16" },
    { label: "18", style: "FONT_SIZE_18" },
    { label: "24", style: "FONT_SIZE_24" },
    { label: "30", style: "FONT_SIZE_30" },
    { label: "36", style: "FONT_SIZE_36" },
    { label: "48", style: "FONT_SIZE_48" },
    { label: "60", style: "FONT_SIZE_60" },
    { label: "72", style: "FONT_SIZE_72" },
];
const fontStyles = [
    { label: "Lato", style: "FONT-LATO" },
    { label: "Montserrat", style: "FONT-MONTSERRAT" },
    { label: "Playfair Display", style: "FONT-PLAYFAIR_DISPLAY" },
    { label: "Open Sans", style: "FONT-OPEN_SANS" },
    { label: "Raleway", style: "FONT-RALEWAY" },
    { label: "Roboto", style: "FONT-ROBOTO" },
]
const inlineStyles = [
    {
        label: "Bold",
        style: "BOLD",
        shortcut: "CTRL+",
        shortcutKey: "B",
        icon: <FontAwesomeIcon icon={faBold} />
    },
    {
        label: "Italic",
        style: "ITALIC",
        shortcut: "CTRL+",
        shortcutKey: "I",
        icon: <FontAwesomeIcon icon={faItalic} />
    },
    {
        label: "Underline",
        style: "UNDERLINE",
        shortcut: "CTRL+",
        shortcutKey: "U",
        icon: <FontAwesomeIcon icon={faUnderline} />
    },
    {
        label: "Strikethrough",
        style: "STRIKETHROUGH",
        shortcut: "CTRL+",
        shortcutKey: "D",
        icon: <FontAwesomeIcon icon={faStrikethrough} />
    },
    {
        label: "Highlight",
        style: "HIGHLIGHT",
        shortcut: "CTRL+",
        shortcutKey: "H",
        icon: <FontAwesomeIcon icon={faHighlighter} />
    }
];
const BlockStyles = [
    {
        label: "Bulleted",
        block: "unordered-list-item",
        shortcut: "CTRL+SHIFT+",
        shortcutKey: "8",
        icon: <FontAwesomeIcon icon={faListUl} />
    },
    {
        label: "Numbered",
        block: "ordered-list-item",
        shortcut: "CTRL+SHIFT+",
        shortcutKey: "7",
        icon: <FontAwesomeIcon icon={faListOl} />
    }
];

export { styleMap, undoredoStyles, fontSizes, fontStyles, inlineStyles, BlockStyles };