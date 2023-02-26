import "./Navbar.css"
import {useState} from "react";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase-config";
import {Link} from "react-router-dom";

const Navbar = ({isLog}) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState(null);
    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            isLog(false)
            setUser(null)
            window.location.pathname = "/Login";
        });
    };

    return (

        <div className="navbar bg-neutral sticky ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52 box-bod">
                        <li><a><Link to="/HomePage">Home</Link></a></li>
                        <li><a><Link to="/AddPost">Add a Post</Link></a></li>
                        {/*<li><a><Link to="/Messages">Messages</Link></a></li>*/}
                        {/*<li><a><Link to="/Advising">Advising</Link></a></li>*/}
                        <li><a><Link to="/ContactUs">Contact Us</Link></a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <h1 className="logo-text spare-header-text">stuXpert</h1>
            </div>
            <div className="navbar-end">
                <label className="btn btn-primary btn-outline mr-4" onClick={signUserOut}>
                    Log Out
                </label>
            </div>

        </div>
    )
}

export default Navbar;