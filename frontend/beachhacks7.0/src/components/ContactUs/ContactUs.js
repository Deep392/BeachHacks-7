import React, { useState } from 'react';
import "./ContactUs.css";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, getFirestore, getDocs, collection, query, where, addDoc} from 'firebase/firestore';


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
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          UserName:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label><br></br>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label><br></br>
        <label>
          Describe your issue:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label><br></br>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
