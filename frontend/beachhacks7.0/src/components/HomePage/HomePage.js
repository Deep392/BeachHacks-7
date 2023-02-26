import { useEffect, useState } from "react";
import "./HomePage.css";
import Sidenav from "../Sidenav/Sidenav";
import { getDocs, collection, deleteDoc, doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
// import {Button} from 'grommet'
import Comments from "../Comments/Comments";
import app from "../../firebase-config";
import "./HomePage.css";
import { async } from "@firebase/util";
/*
    Here we have the main Login, if the User is not Logged in, they will see this Header
 */
const HomePage = () => {
  const [postLists, setPostList] = useState([]);
  const [open, setOpen] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showBox, setShowBox] = useState(false);
  const onClick = () => setShowComments(!showComments);
  const onClickshowBox = () => setShowBox(!showBox)

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

  const likes = async (id) => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, {
        likes: increment(1)
    });
  };

  const dislikes = async (id) => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, {
        dislikes: increment(1)
    });
  };

  const addComment = async (id) => {
    const postDoc = doc(db, "posts", id);
    await updateDoc(postDoc, {
        comments: arrayUnion(commentText)
    });
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        console.log("post: ", post);
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
                <p>{post.likes} stuXperts like this</p>
                <p>{post.dislikes} stuXperts dislike this</p>
              </div>
              <div>
              <label
                  className="btn btn-outline btn-secondary"
                  onClick={() => {
                    likes(post.id);
                  }}
                >
                  Like
                </label>

                <label
                  className="btn btn-outline btn-secondary"
                  onClick={() => {
                    dislikes(post.id);
                  }}
                >
                  Disike
                </label>

                {showLikes
                  ? post.comments.map((content) => {
                      console.log(content);
                      return <p>{content}</p>;
                    }) 
                  : null}
                <label
                  className="btn btn-outline btn-secondary"
                  onClick={onClick}
                >
                  Comments
                </label>

                {showComments
                  ? post.comments.map((content) => {
                      console.log(content);
                      return <p>{content}</p>;
                    }) 
                  : null}

                <label
                  className="btn btn-outline btn-secondary"
                  onClick={onClickshowBox}
                >
                  Add a Comment
                </label>
                {showBox?
                    <textarea
                    placeholder="Post..."
                    onChange={(event) => {
                    setCommentText(event.target.value);
                    }}
                />: null}
                <button onClick={() => {
                    addComment(post.id);
                  }}> 
                  Submit Comment
                </button>

              </div>
              {/* <div className="deletePost">
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
              </div> */}
            </div>
            {/* <div className="postTextContainer"> {post.postText} </div>
            <div className='buttons'>
              <button className='button'>Like</button>

              <button className='btn' onClick={handleOpen}>Comments</button>
            </div> */}
            {/* <h3>@{post.author.name}</h3> */}
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
