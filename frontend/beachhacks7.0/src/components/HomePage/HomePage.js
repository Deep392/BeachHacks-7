import {useEffect, useState} from 'react';
import './HomePage.css'
import Sidenav from "../Sidenav/Sidenav"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
// import {Button} from 'grommet'
import Comments from '../Comments/Comments';
import app from '../../firebase-config';
import "./HomePage.css";
/*
    Here we have the main Login, if the User is not Logged in, they will see this Header
 */
const HomePage = () => {
  const [postLists, setPostList] = useState([]);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = (postId) => {
    //setOpen(!open);
    <Comments
        postId={postId}
    ></Comments>
  };
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   console.log(postLists);
    //   console.log(comments);
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const showComments = (postId) => {
    <Comments postId={postId}/>
  }
  return (
    <div className="homePage">
      {postLists.map((post) => {
        console.log("post: ", post.id)
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {(
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <div className='buttons'>
              <button className='button'>Like</button>

              <button className='btn' onClick={showComments(post.id)}>Comments</button>
            </div>
            {/* <h3>@{post.author.name}</h3> */}
          </div>
        );
      })}
    </div>
  );

};

export default HomePage;