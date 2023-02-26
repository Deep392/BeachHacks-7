import React, { useState } from 'react';
import "./ContactUs.css";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, getFirestore, getDocs, collection, query, where, addDoc} from 'firebase/firestore';
import ForgotPass from "../ForgotPass/ForgotPass";



function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    const db = getFirestore();
    const usernameRef = collection(db, "contactus");

    const newUsernameRef = doc(usernameRef);
    await setDoc(newUsernameRef, {
	username: name,
	email: email,
	message: message
    })
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="ContactUs  place-items-center ">

      <br/>
      <br/>
      <h1 className="heading">Submit a Request or Feedback.</h1>
      <br/>


      <form onSubmit={handleSubmit}>

        <label htmlFor="RequestModal" className="btn btn-outline btn-secondary">
          Submit a Request/Feedback.
        </label>
        <input type="checkbox" id="RequestModal" className="modal-toggle"/>

        <div className="modal">
          <div className="modal-box relative">
            <h1 className="logo-text spare-header-text">stuXpert</h1>
            <br/>
            <br/>
            <h1 className="heading text-left">Contact Us</h1>
            <p className="text text-left">
              By continuing, you are setting up a stuXpert account and agree to
              our User Agreement and Privacy Policy.
            </p>
            <br/>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Please enter your stuXpert Username.</span>
              </label>
              <input
                  className="input input-bordered w-full max-w-xs"
                  placeholder="stuXpert Username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Please enter your e-mail.</span>
              </label>
              <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Please describe your issue.</span>
              </label>

              <textarea className="textarea textarea-bordered" placeholder="Write Feedback" value={message}
                        onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>

            <div className="modal-action form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline">Submit Request</button>
            </div>

            <div className="modal-action form-control mt-3">
              <label htmlFor="RequestModal" className="btn btn-base-100">Never mind! I am good. </label>
            </div>

          </div>
        </div>
      </form>
      </div>
  )
};

export default ContactUs;
