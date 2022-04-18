import React from "react";
import { motion } from "framer-motion";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const DeleteConfirmation = ({ deleteTimelineItemTrue, deleteTimelineItemFalse, message}) => {
    return (
        <motion.div className="delete__modal" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className="delete__modal__container"
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="delete__modal__header">
                    <div className="delete__modal__title">Delete Confirmation</div>
                    <button className="delete__modal__close__button" type="button">
                        <span className="delete__modal__close material-icons" onClick={deleteTimelineItemFalse}>close</span>
                    </button>
                </div>
                <div className="delete__modal__body">
                    <div className="delete__modal__text">{message}</div>
                </div>
                <div className="delete__modal__footer">
                    <button onClick={deleteTimelineItemFalse} className="delete__modal__cancel__button" type="button">
                        Cancel
                    </button>
                    <button onClick={deleteTimelineItemTrue} className="delete__modal__confirm__button" type="button">
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
 
export default DeleteConfirmation;