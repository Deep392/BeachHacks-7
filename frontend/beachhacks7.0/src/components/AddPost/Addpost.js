import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useHistory} from "react-router-dom";
import app from "../../firebase-config";
import "./Addpost.css"

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [userNameList, setUserNameList] = useState([]);
  const [userName, setUserName] = useState("");
  const currUser = auth.currentUser;
  const postsCollectionRef = collection(db, "posts");
  const userNamesCollectionRef = collection(db, "usernames");
  let navigate = useHistory();
  let userN;
  const comments = [];

  useEffect(() => {
    const getPosts = async () => {
        const data = await getDocs(userNamesCollectionRef);
        setUserNameList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        //   console.log(comments);
    };
    getPosts();
    console.log("userlist: ", userNameList);
    }, []);

  const createPost =  async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      userN,
        comments,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate.push("/Homepage");
  };
    const donePost =  () => {
            const currUser = auth.currentUser;
            userNameList.map((username) => {
                console.log("matched username details: ", username.userId);
                console.log("actual user id: ", currUser.uid);
                if (username.userId === currUser.uid){
                    console.log("inside");
                    console.log(username.username);
                    userN = username.username;
                    console.log("Final: ", userN);
                    setUserName(username.username);
                }
            }
        )
    }





  return (

      <div className="Addpost mx-auto sm:w-1/2 justify-items-center ">
          <h1 className="heading text-center">Create A Post.</h1>
          <p className="text text-center">
              By continuing, you are agreeing that you are solely responsible for the post you create.
          </p>
          <br/>

          <div className="form-control w-full max-w-xs mx-auto ">
              <label className="label">
                  <span className="label-text">Title</span>
              </label>
              <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Which class is harder?"
                  onChange={(e) => setTitle(e.target.value)}
              />
          </div>

          <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                  <span className="label-text">Please describe your issue.</span>
              </label>

              <textarea className="textarea textarea-bordered" placeholder="Hello there! I am confused between CECS 328 and CECS 343 classes. Please help me in choosing either of the class." value={postText}
                        onChange={(e) => setPostText(e.target.value)}></textarea>

          </div>
          <br/>
          <br/>


          <div className={"flex flex-col gap-3 sm:w-1/2 mx-auto"}>
          {/*<button className="btn btn-accent btn-outline" onClick={donePost}> Submit Post</button>*/}
          {/*<button  className="btn btn-accent btn-outline" onClick={createPost}>Done</button>*/}
              <button type="submit" className="btn btn-accent btn-outline" onClick={()=> {donePost(); createPost();}}>Submit Post</button>
          </div>
      </div>








    // <div className="createPostPage">
    //   <div className="cpContainer">
    //     <h1>Create A Post</h1>
    //     <div className="inputGp">
    //       <label> Title:</label>
    //       <input
    //         placeholder="Title..."
    //         onChange={(event) => {
    //           setTitle(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="inputGp">
    //       <label> Post:</label>
    //       <textarea
    //         placeholder="Post..."
    //         onChange={(event) => {
    //           setPostText(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <button onClick={donePost}> Submit Post</button>
    //     <button onClick={createPost}>Done</button>
    //   </div>
    // </div>
  );
}

export default AddPost;