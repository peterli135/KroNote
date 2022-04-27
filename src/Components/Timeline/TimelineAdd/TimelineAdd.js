import React, { useState, useEffect } from "react";
import "./TimelineAdd.css";
import { firestoreDB, collection, addDoc } from "../../Firebase/config";
import TimelineAddModal from "../TimelineAddModal/TimelineAddModal";
import { AnimatePresence } from "framer-motion";

const TimelineAdd = ({docCollectionName}) => {
    
    const [addIsOpen, setAddIsOpen] = useState(null);

    // Disable Scroll when Modal is Showing
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = addIsOpen ? 'hidden' : 'auto';
    }, [addIsOpen])

    // Function to Close the Timeline Add Modal
    const closeTimelineAddModal = () => {
        setAddIsOpen(false);
    }
    // Handles Adding Information to Firestore Database
    const handleSubmitOnClick = ({information_content}) => {
        let formHeading = document.getElementById("form__heading");
        let formDate = document.getElementById("form__date");
        let formDescription = document.getElementById("form__short__desc");
        addDoc(collection(firestoreDB, docCollectionName), {
            heading: formHeading.value,
            date: formDate.value,
            description: formDescription.value,
            information: information_content,
            status: "view"
        });
        formHeading.value = "";
        formDate.value = "";
        formDescription.value = "";
    }

    return(
        <>
            <div className="button__container__add">
                <button onClick={() => setAddIsOpen(!addIsOpen)} className={addIsOpen ? "button__image__container__add is-active" : "button__image__container__add"}>
                    <a href="#!"><i className="material-icons-outlined">edit_note</i></a>
                    <div className="button__text__container__add">
                        <a href="#!">Add Item</a>
                    </div>
                </button>
            </div>

            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {addIsOpen && (
                    <TimelineAddModal closeTimelineAddModal={closeTimelineAddModal} submitTimelineAdd={handleSubmitOnClick} />
                )}
            </AnimatePresence>
        </>
    )
}

export default TimelineAdd;