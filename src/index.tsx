import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Header from './page/templates/Header'
import reportWebVitals from './reportWebVitals'
import firebase from "firebase/app"
import "firebase/analytics"
import '@fontsource/roboto'
import {ContextRoot} from "./context/ContextRoot"
import StickyFooter from "./page/templates/StickeyFooter"
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"
import {TopPage} from "./page/TopPage"
import {Container, CssBaseline} from '@material-ui/core'
import {cards} from "./const/Cards"

const start = () => {
    document.getElementById("loading")?.remove()
    const firebaseConfig = {
        apiKey: "AIzaSyALUjGi0XpbtZ0Rm4-n5VdzUc6p3tbSReM",
        authDomain: "webutil-b4b49.firebaseapp.com",
        projectId: "webutil-b4b49",
        // storageBucket: "webutil-b4b49.appspot.com",
        // messagingSenderId: "480231815675",
        appId: "1:480231815675:web:e66bfc91276e3eeb2d735e",
        measurementId: "G-55DN3ZP802"
    }
    // Initialize Firebase

    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

    console.log(`url  :${window.location.href}`)

    ReactDOM.render(
        <React.StrictMode>
            <ContextRoot>
                <CssBaseline/>
                <Router>
                    <Header/>
                    <div className={"content"}>
                        <Container component="main" maxWidth="lg">
                            <Route path={"/"} exact>
                                <TopPage cards={cards}/>
                            </Route>
                            {cards.map((e, i) =>
                                <Route path={e.link} key={`route_${i}`}>
                                    {e.pageComponent ? e.pageComponent : ""}
                                </Route>
                            )}
                        </Container>
                    </div>
                    <StickyFooter/>
                </Router>
            </ContextRoot>
        </React.StrictMode>,
        document.getElementById('root')
    )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    new Promise(()=>reportWebVitals())

}
start()