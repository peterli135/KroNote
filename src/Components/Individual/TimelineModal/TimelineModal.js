import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextEditorEdit from "../../TextEditorEdit";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { motion } from "framer-motion";
import "./TimelineModal.css";
import { firestoreDB, doc, setDoc } from "../../Firebase/config";

const TimelineModal = ({ timelineHeading, timelineDate, timelineInformation, closeTimelineModal, contentBlock, docId, deleteTimelineItem }) => {

    const [editIsActive, setEditIsActive] = useState(false);
    const [newContentBlock, setNewContentBlock] = useState();
    const [newTimelineInformation, setNewTimelineInformation] = useState();

    const { handleSubmit, control } = useForm({
        mode: "onChange"
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-CA');
    }

    const updateTimelineInfo = ({information_content}) => {
        setNewContentBlock(information_content);
        setDoc(doc(firestoreDB, "medical-timeline", docId), {
            heading: timelineHeading,
            date: formatDate(timelineDate),
            information: information_content,
            status: "view"
        });
        const informationContentState = convertFromRaw(information_content);
        const editorState = (EditorState.createWithContent(informationContentState));
        setNewTimelineInformation(editorState);
        setEditIsActive(false);
    }

    return(
        <>
            <div className="view__edit__container">
                <div className="view__mode__container">
                    <motion.button className="view__mode" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => setEditIsActive(false)}
                    >View</motion.button>
                </div>
                <div className="edit__mode__container">
                    <motion.button className="edit__mode" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => setEditIsActive(!editIsActive)}
                    >Edit</motion.button>
                    {/*<a className="edit__mode">Export</a>*/}
                </div>
            </div>

            <motion.div className="timeline__modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="timeline__modal__inner__theme" id="modal__container">
                    <div className="timeline__modal__top__theme">
                        <div className="timeline__modal__title">{timelineHeading}</div>
                        <p className="timeline__modal__date">{timelineDate}</p>
                        <button className="timeline__modal__edit__button">
                            <motion.span className="material-icons" onClick={() => setEditIsActive(!editIsActive)}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>edit</motion.span>
                        </button>
                        <button className="timeline__modal__delete__button">
                            <motion.span className="material-icons" onClick={(event) => {deleteTimelineItem(event, docId)}}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>delete</motion.span>
                        </button>
                        <button className="timeline__modal__close__button" type="button">
                            <span className="timeline__modal__close material-icons" onClick={closeTimelineModal}>close</span>
                        </button>
                    </div>
                    <div className="timeline__modal__content">
                        <div className="timeline__modal__paragraph">
                            { timelineInformation && !editIsActive && <Editor className="timeline__paragraph" readOnly={true} 
                                editorState={newTimelineInformation ? newTimelineInformation : timelineInformation} /> }
                            { timelineInformation && editIsActive && 
                                <form onSubmit={handleSubmit(updateTimelineInfo)}>
                                    <div className="modal__edit__top"></div>
                                    <Controller
                                        as={<TextEditorEdit />}
                                        name="information_content"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <TextEditorEdit contentBlock={newContentBlock ? newContentBlock : contentBlock} value={field.value} onChange={field.onChange} />
                                            );
                                        }}
                                    />
                                    <div className="form__item__bottom">
                                        <button className="form__button__cancel" type="button" onClick={() => setEditIsActive(false)}>Cancel</button>
                                        <button className="form__button" type="submit">Confirm</button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}

export default TimelineModal;