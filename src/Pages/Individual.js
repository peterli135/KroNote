import React, { useEffect } from "react";
import "../Components/Individual/individual.css";
import { Link } from "react-router-dom";
import ParticlesBackground from "../theme/Particles";
import TimelineAdd from "../Components/Individual/TimelineAdd/TimelineAdd";
import Timeline from "../Components/Individual/Timeline/Timeline";
import { storage, ref, getDownloadURL } from "../Components/Firebase/config";

function Individual() {
  /* Changes Font to Last Selected Theme */
  useEffect(() => {
    const currentFontTheme = localStorage.getItem("theme-font");
    if (currentFontTheme) {
      rootFontChange(currentFontTheme);
    }
  }, []);
  const rootFontChange = (theme) => {
    let body = document.querySelector("body");
    if (theme === "theme-1") {
      body.style.setProperty("font-family", "'Lato', sans-serif");
    } else if (theme === "theme-2") {
      body.style.setProperty("font-family", "'Montserrat', sans-serif");
    } else if (theme === "theme-3") {
      body.style.setProperty("font-family", "'Playfair Display', sans-serif");
    } else if (theme === "theme-4") {
      body.style.setProperty("font-family", "'Open Sans', sans-serif");
    } else if (theme === "theme-5") {
      body.style.setProperty("font-family", "'Raleway', sans-serif");
    } else if (theme === "theme-6") {
      body.style.setProperty("font-family", "'Roboto', sans-serif");
    }
  };

  /* Changes Font Size to Last Selected Theme */
  useEffect(() => {
    const currentFontSizeTheme = localStorage.getItem("theme-fontsize");
    if (currentFontSizeTheme) {
      rootFontSizeChange(currentFontSizeTheme);
    }
  }, []);
  const rootFontSizeChange = (theme) => {
    let html = document.querySelector("html");
    if (theme === "theme-1") {
      html.style.fontSize = "14px";
    } else if (theme === "theme-2") {
      html.style.fontSize = "16px";
    } else if (theme === "theme-3") {
      html.style.fontSize = "17px";
    } else if (theme === "theme-4") {
      html.style.fontSize = "18px";
    } else if (theme === "theme-5") {
      html.style.fontSize = "19px";
    } else if (theme === "theme-6") {
      html.style.fontSize = "20px";
    }
  };

  /* Changes Color to Last Selected Theme */
  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      changeThemeColor(currentColorTheme);
    }
  }, []);
  const changeThemeColor = (theme) => {
    let root = document.querySelector(":root");
    const customColorTheme = localStorage.getItem("custom-color");
    if (theme === "theme-primary") {
      root.style.setProperty("--color-primary", "#35424a");
    } else if (theme === "theme-red") {
      root.style.setProperty("--color-primary", "#e64c4c");
    } else if (theme === "theme-orange") {
      root.style.setProperty("--color-primary", "#e6b34c");
    } else if (theme === "theme-green") {
      root.style.setProperty("--color-primary", "#4ce699");
    } else if (theme === "theme-lightblue") {
      root.style.setProperty("--color-primary", "#4cb3e6");
    } else if (theme === "theme-blue") {
      root.style.setProperty("--color-primary", "#4c4ce6");
    } else if (theme === "theme-purple") {
      root.style.setProperty("--color-primary", "#b34ce6");
    } else if (theme === "theme-custom") {
      root.style.setProperty("--color-primary", customColorTheme);
      root.style.setProperty("--color-background-picker", customColorTheme);
    }
  };

  /* Changes Background to Last Selected Theme */
  useEffect(() => {
    const currentBackgroundTheme = localStorage.getItem("theme-background");
    if (currentBackgroundTheme) {
      rootBackgroundChange(currentBackgroundTheme);
    }
  }, []);
  const rootBackgroundChange = (theme) => {
    let root = document.querySelector(":root");
    const backgroundNavbar = document.querySelector(".timeline__background");
    const customBackgroundFileName = localStorage.getItem(
      "customBackgroundFileName"
    );
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
        backgroundNavbar.style.backgroundImage =
          "linear-gradient(to top right, #a1c4fd, #c2e9fb)";
      } else if (theme === "theme-purple") {
        backgroundNavbar.style.backgroundImage =
          "linear-gradient(45deg, rgb(76, 0, 255), transparent), repeating-linear-gradient(45deg, rgb(183, 0, 255) 0%, rgb(183, 0, 255) 5%)";
      } else if (theme === "theme-custom") {
        var imageRef = ref(storage, "Images/" + customBackgroundFileName);
        getDownloadURL(imageRef).then((url) => {
          backgroundNavbar.style.backgroundImage = `url(${url})`;
        });
      }
    }
  };

  return (
    <>
      <header>
        <nav className="navbar__content">
          <Link to="/" className="navbar__content__home">
            Home
          </Link>
          <div className="navbar__content__container">
            <Link to="/individual" className="navbar__content__links active">
              Individual
            </Link>
            <Link to="/family" className="navbar__content__links">
              Family
            </Link>
            <Link to="/medical" className="navbar__content__links">
              Medical
            </Link>
            <Link to="/legal" className="navbar__content__links">
              Legal
            </Link>
            <Link to="/school" className="navbar__content__links">
              School
            </Link>
            <Link to="/treatment" className="navbar__content__links">
              Treatment
            </Link>
          </div>
        </nav>
      </header>

      <ParticlesBackground />
      <div className="timeline__background">
        <TimelineAdd />

        <Timeline />
      </div>
    </>
  );
}

export default Individual;