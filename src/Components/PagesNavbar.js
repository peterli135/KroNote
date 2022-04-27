import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";


const pages = [
    { label: "Individual", link: "/individual" },
    { label: "Family", link: "/family" },
    { label: "Medical", link: "/medical" },
    { label: "Legal", link: "/legal" },
    { label: "School", link: "/school" },
    { label: "Treatment", link: "/treatment" },
];

const variants = {
    open: { 
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 30,
            restDelta: 5,
        }
    },
    closed: {
        opacity: 0,
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 40,
        }
    }
}

const PagesNavbar = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    // finds file location so can conditionally set link to active or unactive
    const location = useLocation();
    const { pathname } = location;

    // finds the width of screen when resizing it
    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", changeWidth);

        return () => { window.removeEventListener("resize", changeWidth); }
    }, [])

    if (screenWidth >= 800) {
        return (
            <nav className="navbar__content">
                <Link to="/" className="navbar__content__home">Home</Link>
                <div className="navbar__content__container">
                    {pages.map((item, index) => {
                        return (
                            <Link className={pathname === item.link ? "active" : ""} to={item.link} key={index}>{item.label}</Link>
                        )
                    })}
                </div>
            </nav>
        )
    }
    return (
            <nav className="navbar__content__items">
                <Link to="/" className="navbar__content__home">Home</Link>
                <motion.div className="menu__icon" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                    {sidebarIsOpen ? <FontAwesomeIcon icon={faClose}/> : <FontAwesomeIcon icon={faBars}/>}
                </motion.div>
                <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                    <motion.ul key="sidebar" className={"navbar__content__menu " + (sidebarIsOpen ? "active" : "")}
                        animate={sidebarIsOpen ? "open" : "closed"}
                        variants={variants}
                    >
                        {pages.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link className={"navbar__content__links " + (pathname === item.link ? "active" : "")} to={item.link}>{item.label}</Link>
                                </li>
                            )
                        })}
                    </motion.ul>
                </AnimatePresence>
            </nav>
    )
}

export default PagesNavbar;