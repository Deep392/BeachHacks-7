import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link, Switch} from "react-router-dom";
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

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    return (
        <Router>
            <nav className="nav ">
                {!isAuth ? (
                    <div className="grid grid-cols-1 gap-10  place-content-center justify-items-center main-content">
                        <h1 className="logo-text main-header-text">stuXpert</h1>

                        <div className="flex flex-col lg:flex-row">
                            <div className="grid flex-grow card place-items-center"><Signup/></div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className="grid flex-grow card place-items-center"><Login setIsAuth={setIsAuth}/></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-rows-12">
                            <Router>
                                <div className="row-start-1 row-end-2 sticky top-0">
                                    <Navbar/>
                                </div>

                                <div className="row-start-2 row-end-11">
                                    <div className="fixed">
                                        <Sidenav/>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Switch>
                                            <Route exact path="/HomePage" component={HomePage}/>
                                            <Route exact path="/AddPost" component={Addpost}/>
                                            <Route exact path="/Messages" component={Messages}/>
                                            <Route exact path="/Advising" component={Advising}/>
                                            <Route exact path="/ContactUs" component={ContactUs}/>
                                        </Switch>
                                    </div>
                                </div>

                                <div className='row-start-11 row-end-12 '>
                                    <Footer/>
                                </div>
                            </Router>
                        </div>
                    </>
                )}
            </nav>
        </Router>

    );
}

export default App;
