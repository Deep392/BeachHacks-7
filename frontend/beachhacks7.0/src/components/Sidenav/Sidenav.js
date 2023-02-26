import "./Sidenav.css"
import {Routes, Link} from "react-router-dom"
import Messages from "../Messages/Messages";
import ContactUs from "../ContactUs/ContactUs";
import Advising from "../Advising/Advising";
import HomePage from "../HomePage/HomePage";
import Addpost from "../AddPost/Addpost";

function Sidenav(){
    return (
        <div className="drawer bg-neutral">
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-40 text-base-content">
                    <li className="pb-3"><a><Link to="/HomePage">Home</Link></a></li>
                    <li className="pb-3"><a><Link to="/AddPost">Add a Post</Link></a></li>
                    <li className="pb-3"><a><Link to="/Messages">Messages</Link></a></li>
                    <li className="pb-3"><a><Link to="/Advising">Advising</Link></a></li>
                    <li className="pb-3"><a><Link to="/ContactUs">Contact Us</Link></a></li>
                </ul>

            </div>
        </div>
    )
}

export default Sidenav;