/*
    This is the bottom of the site, generally links for FAQ, TOS and more can be found here.
 */
import React, {useState} from "react";
import '../../index.css'

const ForgotPass = () => {

    const [isVerificationCodeRequested, setIsVerificationCodeRequested] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationCodeConfirmed, setIsVerificationCodeConfirmed] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const [isNewPasswordValid, setNewPasswordValid] = useState(false);
    const [] = useState('');

    const handleEmailSubmit = (event) => {

    };
    const handleVerificationCodeSubmit = (event) => {

    };
    const handleChangePasswordSubmit = (event) => {

    };

    return (
        <div>
            <label htmlFor="ForgotPass" className="label">
                <a className="label-text-alt link link-hover">Forgot password?</a>
            </label>

            <input type="checkbox" id="ForgotPass" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <div>
                        {isNewPasswordValid ? (
                                <form onSubmit={handleChangePasswordSubmit}>
                                    <div className="form-control">
                                        <div>
                                            <h1 className="text-2xl font-bold mt-3">Password Changed!</h1>
                                            <p className="mt-3 text-justified">Please return to the homepage and
                                                login!</p>
                                        </div>
                                    </div>
                                    <div className="form-control mt-3">
                                        <button type="submit" className="btn btn-primary">Return Home!</button>
                                    </div>
                                </form>
                            ) :

                            isVerificationCodeConfirmed ? (
                                    <form onSubmit={handleChangePasswordSubmit}>
                                        <div className="form-control">
                                            <div>
                                                <h1 className="text-2xl font-bold mt-3">Enter a new Password</h1>
                                                <p className="mt-3 text-justified">The code you enter is valid! Please
                                                    change your
                                                    password.</p>
                                            </div>

                                            <input type="password" placeholder="Enter new password"
                                                   className="input input-bordered mt-3"/>
                                        </div>
                                        <div className="form-control mt-3">
                                            <button type="submit" className="btn btn-primary">Change Password</button>
                                        </div>
                                    </form>
                                ) :
                                isVerificationCodeRequested ? (
                                    <form onSubmit={handleVerificationCodeSubmit}>
                                        <div className="form-control">
                                            <div>
                                                <h1 className="text-2xl font-bold mt-3">Enter Verification Code</h1>
                                                <p className="mt-3 text-justified">Type the code that was sent to
                                                    your email for your
                                                    account. If your email has been registered it show up. Remember
                                                    to
                                                    check the spam folder.</p>
                                            </div>
                                            <input type="text" placeholder="Enter code"
                                                   className="input input-bordered mt-3"/>
                                            <div className="form-control mt-3">
                                                <button type="submit" className="btn btn-primary">Confirm</button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (


                                    <form onSubmit={handleEmailSubmit}>
                                        <div className="form-control">
                                            <div>
                                                <h1 className="text-2xl font-bold mt-3">Forgot Password?</h1>
                                                <p className="mt-3 text-justified">Type your Email below and click
                                                    the 'send verification
                                                    code' button. You will get a confirmation number in your email
                                                    if it's
                                                    in the system. You will need to place this code in the next
                                                    section. </p>
                                            </div>
                                            <input type="text" placeholder="email"
                                                   className="input input-bordered mt-3"/>
                                            <div className="form-control mt-3">
                                                <button className="btn btn-primary">Send Verification Code</button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                    </div>
                    <div className="modal-action form-control mt-3">
                        <label htmlFor="ForgotPass" className="btn btn-base-100">Never mind! I just remembered <br/> my
                            Rooster Account password</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPass;