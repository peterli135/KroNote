import React, { useState, useEffect } from "react";
import useFirestore from "../../Firebase/useFirestore";
import { getDoc, doc, firestoreDB, deleteDoc } from "../../Firebase/config";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmation from "../../DeleteConfirmation";
import "./Timeline.css";
import TimelineModal from "../TimelineModal/TimelineModal";

/*function Timeline() {
    return (
        <div className="timeline">
            <div className="timeline__container">
                <ul className="timeline__items">
                    { docs && docs.map((doc, docIndex) => (
                        <li className="trigger__modal" data-id={doc.id} key={doc.id}>
                            <div className={"timeline__content " + (((docIndex+1) % 2 === 0) ? "row-right" : "row-left")}>
                                <h3 className="timeline__date">{formatCourseDate(doc.date)}</h3>
                                <h1 className="timeline__content__title">{doc.heading}</h1>
                                <p className="timeline__paragraph">{((doc.information).length > 300) ? ((doc.information).substring(0, 300)+" ( . . . )") : doc.information}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Timeline;*/

const Timeline = () => {
    // local state for timeline
    const [timelineModalIsOpen, setTimelineModalIsOpen] = useState(null);
    const [timelineHeading, setTimelineHeading] = useState("");
    const [timelineDate, setTimelineDate] = useState("");
    const [timelineInformation, setTimelineInformation] = useState();
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [contentBlock, setContentBlock] = useState();
    const [docId, setDocId] = useState("");

    // local state for timeline delete confirmation modal
    const [deleteModal, setDeleteModal] = useState({
        show: false,
        id: null,
    });

    // Disable Scroll when Modal is Showing
    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = timelineModalIsOpen ? "hidden" : "auto";
    }, [timelineModalIsOpen])
    
    // gets docs from firestore based on what timeline it is in
    const { docs } = useFirestore("medical-timeline");
    docs.sort((a, b) => (new Date(b.date).getTime() || -Infinity) - (new Date(a.date).getTime() || -Infinity));

    // Formats Date to MM/DD/YYYY
    const formatCourseDate = (date) => {
        const dateObj = new Date(date + "T00:00:00");
        return new Intl.DateTimeFormat("en-US").format(dateObj);
    }

    // opens/closes the timeline modal
    const triggerTimelineModal = async (event, id) => {
        if (event) {
            event.preventDefault();
            setTimelineModalIsOpen(!timelineModalIsOpen);
            setDocId(id);
            let medicalItemRef = doc(firestoreDB, "medical-timeline", id);
            let medicalItem = await getDoc(medicalItemRef);
    
            // Sets states so the respective information can be displayed on the modal
            if (medicalItem.exists()) {
                setTimelineHeading(medicalItem.data().heading);
                setTimelineDate(formatCourseDate(medicalItem.data().date));
                setContentBlock(medicalItem.data().information);
                const informationContentState = convertFromRaw(medicalItem.data().information);
                const editorState = (EditorState.createWithContent(informationContentState));
                setTimelineInformation(editorState);
            } else {
                console.log("No such document!");
            }
        }
    }
    const closeTimelineModal = () => {
        setTimelineModalIsOpen(false);
    }

    // Deleting Timeline Item Functions
    const deleteTimelineItem = async (event, id) => {
        event.stopPropagation();
        setDeleteModal({
            show: true,
            id,
        });
        setDeleteMessage("Are you sure you want to delete this item in the medical timeline?");
    }
    const deleteTimelineItemTrue = async () => {
        if (deleteModal.show && deleteModal.id) {
            await deleteDoc(doc(firestoreDB, "medical-timeline", deleteModal.id));
            setDeleteModal({
                show: false,
                id: null,
            });
        }
        if (timelineModalIsOpen) {
            setTimelineModalIsOpen(false);
        }
    }
    const deleteTimelineItemFalse = () => {
        setDeleteModal({
            show: false,
            id: null,
        });
    }

    return (
        <>
            <div className="timeline">
                <div className="timeline__container">
                    <ul className="timeline__items">
                        { docs && docs.map((doc, docIndex) => {
                            const informationContentState = convertFromRaw(doc.information);
                            const editorState = EditorState.createWithContent(informationContentState);
                            return (
                                <motion.li data-id={doc.id} key={doc.id} onClick={(event) => {triggerTimelineModal(event, doc.id)}}
                                    className={timelineModalIsOpen && (docId === doc.id) ? "trigger__modal timeline__point active " : "trigger__modal timeline__point"}
                                >
                                    <motion.div className={"timeline__content " + (((docIndex+1) % 2 === 0) ? "row-right" : "row-left")}
                                        layout
                                    >
                                        <h3 className="timeline__date">{formatCourseDate(doc.date)}</h3>
                                        <div className="timeline__content__title__container">
                                            <h1 className="timeline__content__title">{doc.heading}</h1>
                                            <motion.button className="timeline__delete" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                <span className="material-icons" onClick={(event) => {deleteTimelineItem(event, doc.id)}}>delete</span>
                                            </motion.button>
                                        </div>
                                        <div className="timeline__paragraph">
                                            <Editor className="timeline__paragraph" editorState={editorState} readOnly={true} />
                                        </div>
                                    </motion.div>
                                </motion.li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <AnimatePresence intial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {timelineModalIsOpen && (
                    <TimelineModal 
                        timelineHeading={timelineHeading}
                        timelineDate={timelineDate}
                        timelineInformation={timelineInformation}
                        closeTimelineModal={closeTimelineModal} 
                        contentBlock={contentBlock}
                        docId={docId}
                        deleteTimelineItem={deleteTimelineItem}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence intial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {deleteModal.show && (
                    <DeleteConfirmation
                        deleteTimelineItemTrue={deleteTimelineItemTrue}
                        deleteTimelineItemFalse={deleteTimelineItemFalse}
                        message={deleteMessage}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Timeline;