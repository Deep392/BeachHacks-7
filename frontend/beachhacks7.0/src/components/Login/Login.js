import React, { useState, useEffect } from "react";
import "./Login.css";
import ForgotPass from "../ForgotPass/ForgotPass";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import {auth, provider} from "../../firebase-config";
import AddPost from "../AddPost/Addpost";
import Messages from "../Messages/Messages";
import Advising from "../Advising/Advising";
import ContactUs from "../ContactUs/ContactUs";
import app from "../../firebase-config"


const Login = ({ setIsAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    const logIn = async (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
		console.log('Hi')
                const user = userCredential.user;
                console.log(user);
                document.getElementById("LoginModal").checked = false;
                setIsAuth(true);
                history.push("/");
                setIsLoggedIn(true);
            })
            .catch((e) => {
                console.log("Wrong UserID or Password.");
                setError(e.message);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/HomePage");
        }
    }, [isLoggedIn, history]);


    return (
         <div className="Login">
            <form onSubmit={logIn}>
                <label htmlFor="LoginModal" className="btn btn-outline btn-secondary">
                    Log In
                </label>
                <input type="checkbox" id="LoginModal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <h1 className="logo-text spare-header-text">stuXpert</h1>
                        <br />
                        <br />
                        <h1 className="heading text-left">Log In</h1>
                        {error && <p className="error">Wrong Email or Password</p>}
                        <p className="text text-left">
                            By continuing, you are setting up a Rooster account and agree to
                            our User Agreement and Privacy Policy.
                        </p>
                        <br />

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Registered Email.</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs"
                                placeholder="Email"
				value = {email}
				onChange = {(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password.</span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered w-full max-w-xs"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <ForgotPass />
                        <div className="modal-action form-control mt-6">
                            <button type="submit" className="btn btn-accent">Login</button>
                        </div>
                    </div>
                </div>
            </form>
         </div>
    );
};

export default Login;