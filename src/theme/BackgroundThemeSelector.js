import React, { useState, useEffect } from "react";
import ProgressBar from "../Components/Home/ProgressBar";
import { motion } from "framer-motion";

function BackgroundThemeSelector() {
    const [ backgroundTheme, setBackgroundTheme ] = useState("theme-white");
    const backgroundOptions = ["theme-white", "theme-dark", "theme-lightblue", "theme-purple"];
    const [ file, setFile ] = useState(null);
    const [ error, setError ] = useState(null);
    const types = ["image/png", "image/jpeg"];

    useEffect(() => {
        const currentBackgroundTheme = localStorage.getItem("theme-background");
        if (currentBackgroundTheme) {
            setBackgroundTheme(currentBackgroundTheme);
        }
    }, []);

    useEffect(() => {
        if (file) {
            localStorage.getItem("customBackgroundFileName");
            const reader = new FileReader();
            reader.onloadend = () => {
                let uploadedImage = reader.result;
                document.querySelector(".navbar").style.backgroundImage = `url(${uploadedImage})`;
                localStorage.setItem("customBackgroundFileName", file.name);
            }
            reader.readAsDataURL(file);
        }
    })

    const changeHandler = (event) => {
        let selected = event.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError("");
        } else {
            setFile(null);
            setError("Please select an image file that is .png or .jpeg");
        }
    }

    const rootBackgroundChange = (theme) => {
        let root = document.querySelector(":root");
        const backgroundNavbar = document.querySelector(".navbar");
        if (theme === "theme-white" || theme === "theme-dark" || theme === "theme-particles") {
            root.style.setProperty("--position", "relative");
            backgroundNavbar.style.backgroundImage = `url(${""})`;
            if (theme === "theme-white") {
                root.style.setProperty("--color-background", "#fff");
            } else if (theme === "theme-dark") {
                root.style.setProperty("--color-background", "#333");
            } else if (theme === "theme-particles") {
                root.style.setProperty("--color-background", "#fff");
                root.style.setProperty("--position", "static");
            }
        } else if (theme === "theme-lightblue" || theme === "theme-purple" || theme === "theme-custom") {
            root.style.setProperty("--position", "relative");
            if (theme === "theme-lightblue") {
                backgroundNavbar.style.backgroundImage = "linear-gradient(to top right, #a1c4fd, #c2e9fb)";
            } else if (theme === "theme-purple") {
                backgroundNavbar.style.backgroundImage = "linear-gradient(45deg, rgb(76, 0, 255), transparent), repeating-linear-gradient(45deg, rgb(183, 0, 255) 0%, rgb(183, 0, 255) 5%)";
            }
        }
    }

    const handleClick = (theme) => {
        setBackgroundTheme(theme);
        localStorage.setItem("theme-background", theme);
        rootBackgroundChange(theme);
    }

    return (
        <div className="background__theme">
            <h4>Background</h4>
            <div className="choose__background">
                <motion.span id="background__1" onClick={() => handleClick("theme-custom")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className={`${backgroundTheme === "theme-custom" ? "material-icons image__upload active" : "image__upload material-icons"}`}
                >
                    <label htmlFor="file-input" id="background__upload">
                        add_photo_alternate
                    </label>
                    <input id="file-input" type="file" className="background__image" onChange={changeHandler}/>
                </motion.span>
                {backgroundOptions.map((backgroundOption, backgroundOptionIndex) => (
                    <motion.span onClick={() => {
                        handleClick(backgroundOption);
                    }}
                    className={`${backgroundTheme === backgroundOption ? "material-icons active" : "material-icons"}`}
                    key={"background__"+(backgroundOptionIndex+2)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    >
                    </motion.span>
                ))}
                <motion.span id="background__6" onClick={() => handleClick("theme-particles")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className={`${backgroundTheme === "theme-particles" ? "material-icons active" : "material-icons"}`}
                >blur_on</motion.span>
            </div>
            <div className="progress__bar">
                { error && <div className="error">{ error }</div>}
                { file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </div>
    )
}

export default BackgroundThemeSelector;