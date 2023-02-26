import React, {useEffect, useState} from "react";
import "./HomePage.css";
import Sidenav from "../Sidenav/Sidenav";
import {getDocs, collection, deleteDoc, doc, updateDoc, increment, arrayUnion} from "firebase/firestore";
import {auth, db} from "../../firebase-config";
// import {Button} from 'grommet'
import Comments from "../Comments/Comments";
import app from "../../firebase-config";
import {async} from "@firebase/util";
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
    const showCmnts = () => setShowComments(!showComments);
    const onClickshowBox = () => setShowBox(!showBox)
    const currUser = auth.currentUser;
    console.log("curr User: ", currUser.email);

    const postsCollectionRef = collection(db, "posts");


    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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
        <div className="HomePage mx-auto sm:w-1/2 justify-items-center ">
            {postLists.map((post) => {
                console.log("post: ", post);
                return (
                    <div className="card bg-neutral text-neutral-content w-full  mx-auto but-bod m-4">
                        <div className="card-body items-center text-center">
                            <p>{post.userN}</p>
                            <h2 className="card-title">{post.title}</h2>
                            <p>{post.postText}</p>


                            <div className="btn-group">
                                <button className="btn" onClick={() => {likes(post.id)}}>Like ({post.likes})</button>
                                <button className="btn" onClick={() => {dislikes(post.id);}}>Unlike ({post.dislikes})</button>
                                <button className="btn" onClick={showCmnts}>View Comments</button>
                                <label className="btn" htmlFor="addComment">Add Comments</label>
                            </div>
                            <p>Comments: </p>
                            <p>{showComments
                                ? post.comments.map((content) => {
                                    if (content === ""){
                                        return <p>Empty</p>;
                                    }else {
                                        return <p>{content}</p>;
                                    }

                                })
                                : null}</p>
                        </div>


                        <form onSubmit={addComment}>
                            <input type="checkbox" id="addComment" className="modal-toggle"/>

                            <div className="modal">
                                <div className="modal-box relative">
                                    <h1 className="logo-text spare-header-text">stuXpert</h1>
                                    <br/>
                                    <br/>
                                    <h1 className="heading text-left">Add a Comment</h1>
                                    <p className="text text-left">
                                        Please don't post inappropriate comments.
                                    </p>
                                    <br/>



                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Please write your comment.</span>
                                        </label>

                                        <textarea className="textarea textarea-bordered" placeholder="Write Feedback"
                                                  onChange={(e) => setCommentText(e.target.value)}></textarea>
                                    </div>


                                    <div className={"flex flex-col gap-3 sm:w-1/2 mx-auto mt-6"}>
                                        <button type="submit" className="btn btn-accent btn-outline">Comment</button>
                                        <label htmlFor="addComment" className="btn btn-base-100">Go Back </label>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>




                    // <div className="post">
                    //     <div className="postHeader">
                    //         <div className="title">
                    //             <h2>{post.userN}</h2>
                    //             <h1> {post.title}</h1>
                    //             <p>{post.likes} stuXperts like this</p>
                    //             <p>{post.dislikes} stuXperts dislike this</p>
                    //         </div>
                    //         <div>
                    //             <label
                    //                 className="btn btn-outline btn-secondary"
                    //                 onClick={() => {
                    //                     likes(post.id);
                    //                 }}
                    //             >
                    //                 Like
                    //             </label>
                    //
                    //             <label
                    //                 className="btn btn-outline btn-secondary"
                    //                 onClick={() => {
                    //                     dislikes(post.id);
                    //                 }}
                    //             >
                    //                 Disike
                    //             </label>
                    //
                    //             {showLikes
                    //                 ? post.comments.map((content) => {
                    //                     console.log(content);
                    //                     return <p>{content}</p>;
                    //                 })
                    //                 : null}
                    //             <label
                    //                 className="btn btn-outline btn-secondary"
                    //                 onClick={onClick}
                    //             >
                    //                 Comments
                    //             </label>
                    //
                    //             {showComments
                    //                 ? post.comments.map((content) => {
                    //                     console.log(content);
                    //                     return <p>{content}</p>;
                    //                 })
                    //                 : null}
                    //
                    //
                    //             <label
                    //                 className="btn btn-outline btn-secondary"
                    //                 onClick={onClickshowBox}
                    //             >
                    //                 Add a Comment
                    //             </label>
                    //             {showBox ?
                    //                 <div>
                    // <textarea
                    //     placeholder="Post..."
                    //     onChange={(event) => {
                    //         setCommentText(event.target.value);
                    //     }}
                    // />
                    //                     <button onClick={() => {
                    //                         addComment(post.id);
                    //                     }}>
                    //                         Submit Comment
                    //                     </button>
                    //                 </div>
                    //                 : null}
                    //
                    //         </div>
                    //     </div>
                    // </div>
                );
            })}
        </div>
    );
};

export default HomePage;