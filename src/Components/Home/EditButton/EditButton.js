import React, { useState } from "react";
import "./EditButton.css";
import EditModal from "../EditModal/EditModal";
import { AnimatePresence } from "framer-motion";

const EditButton = () => {

    const [themeModalIsOpen, setThemeModalIsOpen] = useState(null);

    const closeThemeModal = () => {
        setThemeModalIsOpen(false);
    }

    return(
        <>
            <button onClick={() => setThemeModalIsOpen(!themeModalIsOpen)} className={themeModalIsOpen ? "button__image__container is-active" : "button__image__container"} id="open__modal">
                <a href="#!"><i>✎</i></a>
                <div className="button__text__container">
                    <a href="#!">Edit</a>
                </div>
            </button>

            <AnimatePresence intial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {themeModalIsOpen && (
                    <EditModal closeThemeModal={closeThemeModal}/>
                )}
            </AnimatePresence>
        </>
    )
}

export default EditButton;