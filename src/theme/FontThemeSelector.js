import React, { useState, useEffect, useRef } from "react";

function FontThemeSelector() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selected, setSelected ] = useState("");
    const [ fontTheme, setFontTheme ] = useState("theme-lato");
    const fontOptions = ["Lato", "Montserrat", "Playfair Display", "Open Sans", "Raleway", "Roboto"];
    const ref = useRef();

    // hooks to open/close the font dropdown menu
    useEffect(() => {
        if (isOpen) {
            document.querySelector(".font__dropdown__list").classList.add("show");
            document.querySelector(".expand__icon").classList.add("rotate");
        } else if (!isOpen) {
            document.querySelector(".font__dropdown__list").classList.remove("show");
            document.querySelector(".expand__icon").classList.remove("rotate");
        }

        const checkIfClickedOutside = event => {
            // If the menu is open and the clicked target is not within the menu, then close the menu
            if (isOpen && ref.current && !ref.current.contains(event.target)) {
              setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
        }

    })

    // Change the select font text field
    useEffect(() => {
        if (!selected) {
            setSelected("Select Font");
        }
    }, [selected]);

    // Change local storage theme-font based
    useEffect(() => {
        const currentFontTheme = localStorage.getItem("theme-font");
        if (currentFontTheme) {
            setFontTheme(currentFontTheme);
        }
    }, []);

    // Change font
    const rootFontChange = (theme) => {
        let body = document.querySelector("body");
        if (theme === "theme-1") {
            body.style.setProperty("font-family", "'Lato', sans-serif");
        } else if (theme === "theme-2") {
            body.style.setProperty("font-family", "'Montserrat', sans-serif");
        } else if (theme === "theme-3") {
            body.style.setProperty("font-family", "'Playfair Display', sans-serif");
        } else if (theme === "theme-4") {
            body.style.setProperty("font-family", "'Open Sans', sans-serif");
        } else if (theme === "theme-5") {
            body.style.setProperty("font-family", "'Raleway', sans-serif");
        } else if (theme === "theme-6") {
            body.style.setProperty("font-family", "'Roboto', sans-serif");
        }
    }

    // Handles click events based on which font was clicked
    const handleClick = (theme) => {
        setFontTheme(theme);
        localStorage.setItem("theme-font", theme);
        rootFontChange(theme);
    }

    return (
        <div className="font">
            <h1>Font</h1>
            <div className="choose__font">
                <div className="font__dropdown" ref={ref}>
                    <div className="font__dropdown__menu" onClick={() => setIsOpen(!isOpen)}>
                        <p className="select__font">{selected}</p>
                        <img src="/expand_more.png" alt="" className="expand__icon"></img>
                    </div>
                    <ul className="font__dropdown__list">
                        {fontOptions.map((fontOption, fontOptionIndex) => (
                            <li onClick = {() => {
                                    handleClick("theme-" + (fontOptionIndex + 1));
                                    setSelected(fontOption);
                                    setIsOpen(false);
                                }}
                                className="font__dropdown__options"
                                key={"font-option" + (fontOptionIndex + 1)}
                            >
                                {fontOption}
                            </li>
                        ))}
                    </ul>
                </div>
                <a className="font__text__demo">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </a>
            </div>
        </div>
    )
}

export default FontThemeSelector;