import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Login.css";
const Login = ({ history, location }) => {
    console.log("value of history", history);
    console.log("value of location", location);
    const [wantToLog, setWantToLog] = useState(true);
    const [email, setEmail] = useState("");
    const [fName, setFname] = useState("");
    const [password, setPassword] = useState("");
    const [toggle, setToggle] = useState(false);
    const redirect = location.search ? location.search.split("=")[1] : "/";
    console.log("value of redirect is", redirect);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userCred } = userLogin;
    const toggleVisibility = () => {
        // console.log('clicked')
        setToggle(!toggle);
        // if (password.type === 'password') {
        //   password.type = 'text'
        // } else {
        //   password.type = 'password'
        // }
    };
    const hideShow = () => {};

    useEffect(() => {
        if (userCred) {
            console.log(userCred);
            // console.log('there is userCred')
            // console.log(userCred)
            history.push(redirect);
        }
    }, [history, userCred, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (wantToLog) {
            console.log("Triggered!");
            console.log(email, password);
            dispatch(login(email, password));
        } else {
            dispatch(signup(fName, email, password));
        }

        // console.log('form submitted')
    };

    const handleSign = (e) => {
        setWantToLog(!wantToLog);
        console.log(wantToLog);
    };
    return (
        <div className='container'>
            <div className='layout'>
                <h1>Sign In</h1>
                {error && <Message variant='danger ' message={error} />}
                {loading ? (
                    <Loader />
                ) : (
                    <form onSubmit={submitHandler}>
                        <input
                            className='form-field'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />

                        {!wantToLog && (
                            <input
                                className='form-field'
                                type='fName'
                                value={fName}
                                onChange={(e) => setFname(e.target.value)}
                                placeholder='Full Name'
                                required
                            />
                        )}

                        <div className='password-eye'>
                            <input
                                className='form-field '
                                type={toggle ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                required
                            />
                            {toggle ? (
                                <i id='eye' className='fas fa-eye' onClick={toggleVisibility}></i>
                            ) : (
                                <i className='fas fa-eye-slash' id='eye' onClick={toggleVisibility}></i>
                            )}
                        </div>
                        <div className='remember-me' onClick={handleSign}>
                            <p>Want to Sign Up?</p>
                        </div>
                        <button className='btn' type='submit'>
                            {wantToLog ? <p>Log In</p> : <p>Sign Up</p>}
                        </button>
                    </form>
                )}
                {/* {} */}
            </div>
        </div>
    );
};

export default Login;
