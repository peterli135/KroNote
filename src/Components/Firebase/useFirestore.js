import { useState, useEffect } from "react";
import { firestoreDB, collection, onSnapshot } from "./config";

const useFirestore = (collectionName) => {
    const [ docs, setDocs ] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(firestoreDB, collectionName), (snapshot) => {
            let documents = [];
            snapshot.forEach(doc => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        });

        return () => unsub();

    }, [collectionName]);

    return { docs };
}

export default useFirestore;