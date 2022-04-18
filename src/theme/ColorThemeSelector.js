import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ColorThemeSelector() {
    const [ colorTheme, setColorTheme ] = useState("theme-primary");
    const colorOptions = ["theme-primary", "theme-red", "theme-orange", "theme-green", "theme-lightblue", "theme-blue", "theme-purple"]
    
    useEffect(() => {
        const currentColorTheme = localStorage.getItem("theme-color");
        if (currentColorTheme) {
            setColorTheme(currentColorTheme);
        }
    }, []);

    const rootColorChange = (theme) => {
        let root = document.querySelector(":root");
        const customColorTheme = localStorage.getItem("custom-color");
        if (theme === "theme-primary") {
            root.style.setProperty("--color-primary", "#35424a");
        } else if (theme === "theme-red") {
            root.style.setProperty("--color-primary", "#e64c4c");
        } else if (theme === "theme-orange") {
            root.style.setProperty("--color-primary", "#e6b34c");
        } else if (theme === "theme-green") {
            root.style.setProperty("--color-primary", "#4ce699");
        } else if (theme === "theme-lightblue") {
            root.style.setProperty("--color-primary", "#4cb3e6");
        } else if (theme === "theme-blue") {
            root.style.setProperty("--color-primary", "#4c4ce6");
        } else if (theme === "theme-purple") {
            root.style.setProperty("--color-primary", "#b34ce6");
        } else if (theme === "theme-custom") {
            root.style.setProperty("--color-primary", customColorTheme);
            root.style.setProperty("--color-background-picker", customColorTheme);
        }
    }

    const handleClick = (theme) => {
        setColorTheme(theme);
        localStorage.setItem("theme-color", theme);
        rootColorChange(theme);
    }

    return (
        <div className="color">
        <h3>Color</h3>
        <div className="choose__color">
            <motion.span id="color__1"
                onClick={() => handleClick("theme-custom")}
                className={`${colorTheme === "theme-custom" ? "material-icons-outlined color__picker active" : "material-icons-outlined color__picker"}`}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
                <label htmlFor="color-picker">
                    brush
                </label>
                <input id="color-picker" type="color" value="#ffffff"
                    onChange={event => {
                        localStorage.setItem("custom-color", event.target.value);
                        rootColorChange("theme-custom");
                    }}
                />
            </motion.span>
            {colorOptions.map((colorOption, colorOptionIndex) => (
                <motion.span onClick={() => {
                    handleClick(colorOption);
                }}
                className={`${colorTheme === colorOption ? "active" : ""}`}
                key={"color__"+(colorOptionIndex+2)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                >
                </motion.span>
            ))}
        </div>
    </div>
    )
}

export default ColorThemeSelector;