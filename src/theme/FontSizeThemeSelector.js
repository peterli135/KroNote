import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FontSizeThemeSelector() {
    const [ fontSizeTheme, setFontSizeTheme ] = useState("theme-2");
    const fontSizeOptions = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5", "theme-6"];

    useEffect(() => {
        const currentFontSizeTheme = localStorage.getItem("theme-fontsize");
        if (currentFontSizeTheme) {
            setFontSizeTheme(currentFontSizeTheme);
        }
    }, []);

    const rootFontSizeChange = (theme) => {
        let html = document.querySelector("html");
        if (theme === "theme-1") {
            html.style.fontSize = "14px";
        } else if (theme === "theme-2") {
            html.style.fontSize = "16px";
        } else if (theme === "theme-3") {
            html.style.fontSize = "17px";
        } else if (theme === "theme-4") {
            html.style.fontSize = "18px";
        } else if (theme === "theme-5") {
            html.style.fontSize = "19px";
        } else if (theme === "theme-6") {
            html.style.fontSize = "20px";
        }
    }

    const handleClick = (theme) => {
        setFontSizeTheme(theme);
        localStorage.setItem("theme-fontsize", theme);
        rootFontSizeChange(theme);
    }

    return (
        <div className="font__size">
            <h2>Font Size</h2>
            <div>
                <h6>Aa</h6>
            <div className="choose__font__size">
                {fontSizeOptions.map((fontSizeOption, fontSizeOptionIndex) => (
                    <motion.span onClick = {() => {
                            handleClick(fontSizeOption);
                        }}
                        className={`${fontSizeTheme === fontSizeOption ? "font-size "+(fontSizeOptionIndex + 1)+" active" : "font-size"+(fontSizeOptionIndex + 1)}`}
                        key={"font-option" + (fontSizeOptionIndex + 1)}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    >
                    </motion.span>
                ))}
            </div>
            <h5>Aa</h5>
            </div>
        </div>
    )
}

export default FontSizeThemeSelector;