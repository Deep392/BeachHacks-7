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

//   const getUserName =  () => {
//     const currUser = auth.currentUser;
//     const postDoc = doc(db, "usernames", currUser.id);
//     setUserName(postDoc.username);
//     return(userName)
//   };
    useEffect(() => {
    const getPosts = async () => {
        const data = await getDocs(userNamesCollectionRef);
        setUserNameList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        //   console.log(comments);
    };

    getPosts();
    console.log("userlist: ", userNameList);
    }, []);

    const createPost = async () => {
    // const currUser = auth.currentUser;
    // userNameList.map((username) => {
    //     console.log("matched username details: ", username.userId);
    //     console.log("actual user id: ", currUser.uid);
    //     if (username.userId === currUser.uid){
    //         console.log("inside");
    //         console.log(username.username);
    //         setUserName(username.username);
    //     }
    // })
    await addDoc(postsCollectionRef, {
      title,
      postText,
      userN,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate.push("/Homepage");
  };

//   useEffect(() => {
//     const donePost = () => {
//         const currUser = auth.currentUser;
//         userNameList.map((username) => {
//             console.log("matched username details: ", username.userId);
//             console.log("actual user id: ", currUser.uid);
//             if (username.userId === currUser.uid){
//                 console.log("inside");
//                 console.log(username.username);
//                 setUserName(username.username);
//             }
//         })
        
//       }
//       donePost();
//   },[])
const donePost = () => {
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
        })
        
        }

  // useEffect(() => {
  //   navigate.push("/HomePage");
  // }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={donePost}> Submit Post</button>
        <button onClick={createPost}>Done</button>
      </div>
    </div>
  );
}

export default AddPost;