import React, { useEffect, useState } from "react";
// import "./App.css";
import { gapi } from "gapi-script";
// import Event from "./components/Event.js";
import {Link} from "react-router-dom";
import {GoogleLogin} from 'react-google-login'
 
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [postText, setPostText] = useState("");
 
  const apiKey = process.env.GOOGLE_API_KEY;
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
  
  //var gapi = window.gapi;

  const responseGoogle = (response) => {
    console.log(response);
  }

  const responseError = (error) => {
    console.log(error);
  }

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: process.env.GOOGLE_API_KEY,
        clientId: process.env.GOOGLE_CLIENT_ID,
        discoveryDocs: process.env.GOOGLE_DISCOVERY_DOCS,
        scope: process.env.SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      window.gapi.auth2.getAuthInstance().signIn()
      // .then(() => {
        
      //   var event = {
      //     'summary': 'Awesome Event!',
      //     'location': '800 Howard St., San Francisco, CA 94103',
      //     'description': 'Really great refreshments',
      //     'start': {
      //       'dateTime': '2020-06-28T09:00:00-07:00',
      //       'timeZone': 'America/Los_Angeles'
      //     },
      //     'end': {
      //       'dateTime': '2020-06-28T17:00:00-07:00',
      //       'timeZone': 'America/Los_Angeles'
      //     },
      //     'recurrence': [
      //       'RRULE:FREQ=DAILY;COUNT=2'
      //     ],
      //     'attendees': [
      //       {'email': 'lpage@example.com'},
      //       {'email': 'sbrin@example.com'}
      //     ],
      //     'reminders': {
      //       'useDefault': false,
      //       'overrides': [
      //         {'method': 'email', 'minutes': 24 * 60},
      //         {'method': 'popup', 'minutes': 10}
      //       ]
      //     }
      //   }

      //   var request = gapi.client.calendar.events.insert({
      //     'calendarId': 'primary',
      //     'resource': event,
      //   })

      //   request.execute(event => {
      //     console.log(event)
      //     window.open(event.htmlLink)
      //   })
        

      //   /*
      //       Uncomment the following block to get events
      //   */
      //   /*
      //   // get events
      //   gapi.client.calendar.events.list({
      //     'calendarId': 'primary',
      //     'timeMin': (new Date()).toISOString(),
      //     'showDeleted': false,
      //     'singleEvents': true,
      //     'maxResults': 10,
      //     'orderBy': 'startTime'
      //   }).then(response => {
      //     const events = response.result.items
      //     console.log('EVENTS: ', events)
      //   })
      //   */
    

      // })
    })
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