import React, { useEffect } from "react";
import useStorage from "../Firebase/useStorage";

const ProgressBar = ({ file, setFile }) => {
    const { progress, url } = useStorage(file);
    const [ style, setStyle ] = React.useState({});

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);
    
    useEffect(() => {
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${Math.round(progress)}%`
            }
            
            setStyle(newStyle);
        }, 200);
    })

    return (
        <div className="progress">
            <div className="progress-done" style={style}>
                {Math.round(progress)}%
            </div>
        </div>
    )
}

export default ProgressBar;