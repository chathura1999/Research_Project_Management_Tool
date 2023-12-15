import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudents } from "../actions/studentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./admitcard.css";
import "./Student.css";
import { AdmitCard } from "../components/AdmitCard";
import { STUDENT_LIST_CLEAR } from "../constants/studentConstants";
import Base64Downloader from "react-base64-downloader";
const AllStudentsAdmitCard = (props) => {
    let student = props.location.state;
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState(student.email);
    const [topic, setTopic] = useState(student.topic);
    const [description, setDescription] = useState(student.description);
    const [message, setMessage] = useState(student.message);
    const [file, setFile] = useState(student.file);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        setEditMode(role === "STUDENT" && student);
    }, []);
    const userLogin = useSelector((state) => state.userLogin);
    // const userLogin = useSelector((state) => state.userLogin)

    const update = async (e) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log({ _id: student._id, email, topic, description, message });
        const { data } = await axios.put(
            "/api/proposal/update",
            { _id: student._id, email, topic, description, message },
            config
        );
    };
    const approve = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log({ _id: student._id, email, topic, description, message });
        const { data } = await axios.put(
            "/api/proposal/update",
            { _id: student._id, email, topic, description, message, status: "APPRVOED" },
            config
        );
    };

    const deny = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log({ _id: student._id, email, topic, description, message });
        const { data } = await axios.put(
            "/api/proposal/update",
            { _id: student._id, email, topic, description, message, status: "DENIED" },
            config
        );
    };

    const { userCred } = userLogin;
    const { role } = userCred;
    return (
        <div className='outer-layout'>
            <h1>Submit a Proposal</h1>
            <h2>{props.location.state.status}</h2>
            <form onSubmit={submitHandler}>
                <div className='form-inner'>
                    <div className='form-control'>
                        <label htmlFor='name'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!editMode}
                        />
                    </div>{" "}
                    <div className='form-control'>
                        <label htmlFor='name'>Proposal Topic</label>
                        <input
                            type='text'
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            disabled={!editMode}
                        />
                    </div>{" "}
                    <div className='form-control'>
                        <label htmlFor='name'>Proposal Description</label>
                        <textarea
                            rows='9'
                            cols='70'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            disabled={!editMode}
                        >
                            Enter the Proposal Description
                        </textarea>
                    </div>{" "}
                    <div className='form-control'>
                        <Base64Downloader base64={file} downloadName='proposal'>
                            Click to download
                        </Base64Downloader>
                    </div>{" "}
                    <div className='form-control'>
                        <label htmlFor='name'>Personal Message to the Supervisor</label>
                        <textarea
                            rows='9'
                            cols='70'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={!editMode}
                        >
                            Enter Message to the Relavant Supervisor
                        </textarea>
                    </div>{" "}
                </div>

                {role === "STUDENT" && student && (
                    <button onClick={update} className='btn-register' type='submit'>
                        Edit Proposal
                    </button>
                )}
                {role === "STUDENT" && !student && (
                    <button className='btn-register' type='submit'>
                        Submit Proposal
                    </button>
                )}
                {role === "TEACHER" && (
                    <button onClick={approve} className='btn-register' type='submit'>
                        Approve Proposal
                    </button>
                )}
                {role === "TEACHER" && (
                    <button onClick={deny} className='btn-register' type='submit'>
                        Deny Proposal
                    </button>
                )}
            </form>
        </div>
    );
};

export default AllStudentsAdmitCard;
