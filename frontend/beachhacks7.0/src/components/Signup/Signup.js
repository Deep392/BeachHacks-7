import React, {useContext, useState} from "react";
import "./Signup.css"
import {useHistory} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import app from "../../firebase-config";
import HomePage from "../HomePage/HomePage";
import AddPost from "../AddPost/Addpost";
import Messages from "../Messages/Messages";
import Advising from "../Advising/Advising";
import ContactUs from "../ContactUs/ContactUs";
import Login from "../Login/Login";

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();
    const createAccount = async() => {
        try{
            if (password !== confirmpassword){
                setError("Password and Confirm Password do not match");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
	    document.getElementById("LoginModal").checked = true;

            
        } catch (e) {
            console.log("hello you are here");
            setError(e.message);
        }
    }


    return (
        <div className="Signup">
            <label htmlFor="SignInModal" className="btn btn-outline btn-primary ">Sign Up</label>
            <input type="checkbox" id="SignInModal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative border-solids">
                    <h1 className="logo-text spare-header-text">stuXpert</h1>
                    <br/>
                    <br/>
                    <h1 className="heading text-left">Sign Up</h1>
                    {error && <p className="error">{error}</p> }
                    <p className="text text-left">By continuing, you are setting up a Rooster account and agree to our User Agreement and Privacy Policy.</p>                    <br/>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">What is your Email?</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Create a new password.</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="New Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Confirm your new password.</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <br/>
                    <label className="text-right">
                        <p className="label-text-alt">Already have an account? <a href="rooster/src#" className=" label-text-alt link link-hover">Click Here.</a> </p>
                    </label>

                    <div className="modal-action form-control mt-6">
                        <label htmlFor="SignInModal" className="btn btn-outline btn-primary" onClick={createAccount}>Sign Up</label>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Signin;