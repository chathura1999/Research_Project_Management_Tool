import axios from "axios";
import FileBase from "react-file-base64";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffregister, submitProposal } from "../actions/staffActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";
const StaffRegister = ({ history }) => {
    const dispatch = useDispatch();
    const [valid, setValid] = useState(false);
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        setValid(true);
        console.log(email, topic, description, message);
        dispatch(submitProposal(email, topic, description, message, file));
        setTimeout(() => {
            setValid(false);
        }, 10000);
    };
    const userLogin = useSelector((state) => state.userLogin);
    // const userLogin = useSelector((state) => state.userLogin)

    const { userCred } = userLogin;

    // const studentRegister = useSelector((state) => state.studentRegister)
    const staffRegister = useSelector((state) => state.staffRegister);

    const { loading, success, error } = staffRegister;
    useEffect(() => {
        if (!userCred) {
            history.push("/login");
        }
    }, [userCred, history]);
    return (
        <div className='container1' style={{ marginTop: "10px" }}>
            {loading ? (
                <Loader />
            ) : (
                <div className='outer-layout'>
                    <h1>Submit a Proposal</h1>
                    {success && valid && (
                        <Message style={{ marginBottom: "3px" }} variant='success' message={success.message} />
                    )}
                    {valid && error && <Message variant='danger' message={error} />}

                    <form onSubmit={submitHandler}>
                        <div className='form-inner'>
                            <div className='form-control'>
                                <label htmlFor='name'>Email</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Proposal Topic</label>
                                <input type='text' value={topic} onChange={(e) => setTopic(e.target.value)} required />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Proposal Description</label>
                                <textarea
                                    rows='9'
                                    cols='70'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                >
                                    Enter the Proposal Description
                                </textarea>
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Personal Message to the Supervisor</label>
                                <textarea
                                    rows='9'
                                    cols='70'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                >
                                    Enter Message to the Relavant Supervisor
                                </textarea>
                            </div>{" "}
                            <div className='form-control'>
                                <FileBase type='file' multiple={false} onDone={({ base64 }) => setFile(base64)} />
                            </div>{" "}
                        </div>

                        <button className='btn-register' type='submit'>
                            Submit Proposal
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StaffRegister;
