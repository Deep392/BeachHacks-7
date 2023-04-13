import React, { useEffect, useState } from "react";
// import "./App.css";
import { gapi } from "gapi-script";
// import Event from "./components/Event.js";
import {Link} from "react-router-dom";
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
 
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [postText, setPostText] = useState("");
 
  const responseGoogle = (response) => {
    console.log(response);
    const {code} = response;
    axios.post('/api/create-tokens', {code})
      .then(response=>{
        console.log(response.data)
      })
      .catch(error=> console.log("hiii"))
  }

  const responseError = (error) => {
    console.log(error);
  }

  
 
  return (
    <div className="App py-8 flex flex-col justify-center">
      <h1 className="heading text-center">Create an Event.</h1>
      <div className="form-control w-full max-w-xs mx-auto">
        <label className="label">
            <span className="label-text">Provide Event description.</span>
        </label>

        <textarea className="textarea textarea-bordered" placeholder="Hello there! I am confused between CECS 328 and CECS 343 classes. Please help me in choosing either of the class." value={postText}
                  onChange={(e) => setPostText(e.target.value)}></textarea>
      </div>
      {/* <button type="submit" className="add-event" onClick={handleClick}>
        Create
      </button> */}
      <GoogleLogin
        clientId='898771624531-un6g764dlv44v356l4fj0v8i4f0i4cnn.apps.googleusercontent.com'
        buttonText="Sign In and authorize Calendar"
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
        responseType='code'
        accessType="offline"
        scope='openid email profile https://www.googleapis.com/auth/calendar'
      ></GoogleLogin>
    </div>
  );
}
 
export default Calendar;