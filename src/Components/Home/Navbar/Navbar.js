import React, { useEffect }  from "react";
import { Link } from "react-router-dom";

function Navbar() { 

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return() => {
          document.body.classList.remove("overflow-hidden");
        }
    })

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__toggle" id="mobile-menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="/individual" className="navbar__links">Individual</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/family" className="navbar__links">Family</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/medical" className="navbar__links">Medical</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/legal" className="navbar__links">Legal</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/school" className="navbar__links">School</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/treatment" className="navbar__links">Treatment</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;