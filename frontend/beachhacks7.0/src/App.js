import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
// Importing Components
import Sidenav from "./components/Sidenav/Sidenav";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Addpost from "./components/AddPost/Addpost"
import Messages from "./components/Messages/Messages";
import Advising from "./components/Advising/Advising";
import ContactUs from "./components/ContactUs/ContactUs"
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import 'firebase/compat/firestore';
import { getDocs, collection, deleteDoc, doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import Calendar from './components/Calendar/Calendar';
import AddEvent from './components/Calendar/AddEvent';

function App() {
    console.log(auth.currentUser)
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState(auth.currentUser);
    const data = window.localStorage.getItem('MY_APP_STATE');
    const [showContent, setShowContent] = useState(JSON.parse(data));

    useEffect(() => {
        if (data !== null) setShowContent(JSON.parse(data));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('MY_APP_STATE', JSON.stringify(showContent));
    }, [showContent]);


    useEffect(() => {
    }, [user]);

    return (
        <Router>
            <nav className="nav ">
                {!showContent ? (
                    <div className="grid grid-cols-1 gap-10  place-content-center justify-items-center main-content">
                        <h1 className="logo-text main-header-text">stuXpert</h1>

                        <div className="flex flex-col lg:flex-row">
                            <div className="grid flex-grow card place-items-center"><Signup/></div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className="grid flex-grow card place-items-center"><Login setIsAuth={setShowContent}
                                                                                           setUser={setUser}/></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div style={{height:"100%"}}>
                            <Router>

                                <header className="sticky">
                                    <Navbar isLog={setShowContent}/>
                                </header>

                                <main >
                                    <Switch>
                                        <Route exact path="/HomePage" component={HomePage}/>
                                        <Route exact path="/AddPost" component={Addpost}/>
                                        <Route exact path="/Messages" component={Messages}/>
                                        <Route exact path="/Advising" component={Advising}/>
                                        <Route exact path="/Calendar" component={Calendar}/>
                                        <Route exact path="/AddEvent" component={AddEvent}/>
                                        <Route exact path="/ContactUs" component={ContactUs}/>
                                    </Switch>
                                </main>

                                <footer>
                                    <Footer/>
                                </footer>
                            </Router>
                        </div>
                    </>
                )}
            </nav>
        </Router>

    );
}

export default App;
