import { useState, useEffect } from "react";
import { storage, ref, uploadBytesResumable, getDownloadURL } from "./config";

const useStorage = (file) => {
    const [ progress, setProgress ] = useState(0);
    const [ error, setError ] = useState(null);
    const [ url, setUrl ] = useState(null);

    useEffect(() => {
        // references
        const storageRef = ref(storage, "Images/" + file.name);

        // Create file metadata including the content type
        const metadata = {
            contentType: file.type,
        };

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
        }, (err) => {
            setError(err);
        }, async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File is available at ", downloadURL);
                setUrl(downloadURL);
                //document.querySelector(".navbar").style.backgroundImage = `url(${downloadURL})`;
            })
        })
    }, [file]);

    return { progress, url, error };

}

export default useStorage;