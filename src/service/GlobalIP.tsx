import firebase from "firebase";
import "firebase/functions";
import {useEffect, useState} from "react";

function getGlobalIP() {
    // return fetch('https://us-central1-webutil-b4b49.cloudfunctions.net/yourIP').then(r=>r.json())
    return firebase.functions().httpsCallable("yourIP")()
}

export const GlobalIP = () => {
    const [globalIP, setGlobalIP] = useState("0.0.0.0")

    useEffect(() => {
        getGlobalIP().then(r => {
            setGlobalIP(r.data.data.ip)
        }).catch(e => {
            console.error(e)
        })
    })

    return <>
        {globalIP}
    </>
}