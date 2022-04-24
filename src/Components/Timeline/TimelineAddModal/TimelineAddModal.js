import React from "react";
import "./TimelineAddModal.css";
import { useForm, Controller } from "react-hook-form";
import TextEditor from "../../TextEditor/TextEditor";
import { motion } from "framer-motion";

const TimelineAddModal = ({closeTimelineAddModal, submitTimelineAdd}) => {

    const { handleSubmit, control } = useForm({
        mode: "onChange"
    });

    return(
        <>
            <motion.div className="modal__theme"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="modal__inner__theme" id="modal__container">
                    <div className="modal__top__theme">
                        <div className="modal__title">Add Information to Timeline</div>
                        <button className="modal__close" type="button">
                            <span className="material-icons" onClick={closeTimelineAddModal}>close</span>
                        </button>
                    </div>
                    <div className="modal__content">
                        <form onSubmit={handleSubmit(submitTimelineAdd)}>
                            <div className="form__item">
                                <label htmlFor="heading" className="form__label">Heading:</label>
                                <input type="text" className="form__input" id="form__heading" name="heading" placeholder="Enter a headline..." required></input>
                            </div>
                            <div className="form__item">
                                <label htmlFor="date" className="form__label">Date:</label>
                                <input type="date" className="form__input" id="form__date" name="date" placeholder="Enter a date..." required></input>
                            </div>
                            <div className="form__item">
                                <label htmlFor="information" className="form__label">Information:</label>
                                {/*<textarea className="form__input" id="form__information" name="information" placeholder="Enter any information relevant to your headline..."></textarea>
                                <TextEditor className="form__input" id="form__information" name="information" />*/}
                                <Controller
                                    as={<TextEditor />}
                                    name="information_content"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <TextEditor value={field.value} onChange={field.onChange} />
                                        );
                                    }}
                                />
                            </div>
                            <div className="form__item__bottom">
                                <button className="form__button__cancel" type="button" onClick={closeTimelineAddModal}>Cancel</button>
                                <button className="form__button" type="submit">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default TimelineAddModal;