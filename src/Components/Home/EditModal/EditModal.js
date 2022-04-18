import React from "react";
import "./EditModal.css";
import { motion } from "framer-motion";
import ColorThemeSelector from "../../../theme/ColorThemeSelector";
import BackgroundThemeSelector from "../../../theme/BackgroundThemeSelector";
import FontThemeSelector from "../../../theme/FontThemeSelector";
import FontSizeThemeSelector from "../../../theme/FontSizeThemeSelector";

const EditModal = ({closeThemeModal}) => {

    return(
        <>
            <motion.div className="edit__modal__theme"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeThemeModal}
            >
                <div className="edit__modal__inner__theme" id="modal__container" onClick={(e) => e.stopPropagation()}>

                    <div className="edit__modal__top__theme">
                        <div className="edit__modal__title">Customize your page</div>
                        <button onClick={closeThemeModal} className="edit__modal__close" type="button">
                            <span className="material-icons">close</span>
                        </button>
                    </div>

                    <div className="edit__modal__content">
                        <FontThemeSelector />

                        <FontSizeThemeSelector />

                        <ColorThemeSelector />

                        <BackgroundThemeSelector />
                    </div>

                    <div className="edit__modal__bottom">
                        {/*<button onClick={closeThemeModal} className="modal__button__cancel" type="button">
                            Cancel
                        </button>*/}
                        <button onClick={closeThemeModal} className="modal__button" type="button">
                            Done
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default EditModal;