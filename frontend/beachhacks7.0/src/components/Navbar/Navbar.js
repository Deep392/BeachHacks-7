import "./Navbar.css"
import {useState} from "react";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase-config";

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
        <div className="navbar bg-neutral navbar-basic">
            <div className="navbar-start ">
                <h1 className="logo-text spare-header-text">stuXpert</h1>
            </div>
            <div className="navbar-end gap-4">
                <label className="btn btn-primary btn-outline" onClick={signUserOut}>
                    Log Out
                </label>
            </div>
        </div>
    )
}

export default Navbar;