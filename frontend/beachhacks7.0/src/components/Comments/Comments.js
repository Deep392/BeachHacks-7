import React, {useState, useEffect} from "react";
import {Box, Button, Collapsible} from 'grommet';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { Add } from "grommet-icons";
import "./Comments.css";

// interface SandD {
//     subject: string;
//     description: string;

// }



const Comments = ({postId}) => {
    console.log("inside comments: ", postId);
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const postsCollectionRef = collection(db, "posts");
    let currPost = [];

    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(postsCollectionRef);
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getPosts();
        console.log(posts);

        for (let i = 0; i < posts.length; i++){
            if (posts[i].id === postId){
                currPost = posts[i];
            }
        }
        console.log("curr post: ", currPost);
        
      }, []);

    return(
        <div className="container">
			<Box
				background="#E5E4E2"
				round="medium"
				width="100%"
				pad="small"
				margin={{ bottom: "small" }}
				className="faq-container"
			>
				<Box direction="row" justify="between" align="center">
					<Box margin={{ left: "small" }}>
						<div className="qn">Comments</div>
					</Box>
					<Button onClick={() => setOpen(!open)} icon={<Add />} />
				</Box>

				<Collapsible className="acad-collapsible" open={open}>
					<Box
						margin={{ top: "small" }}
						align="start"
						justify="center"
                       
					>
						<Box margin={{ left: "small" }}>
							<div className="ans">in progress</div>
						</Box>
					</Box>
				</Collapsible>
			</Box>
		</div>
    )
}

export default Comments;