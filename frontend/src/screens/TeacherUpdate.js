import axios from "axios";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {teacherregister, teacherupdate} from "../actions/teacherActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";
const TeacherUpdate = (props) => {
    let teacher = props.location.state;
    const dispatch = useDispatch();
    const [name, setName] = useState(teacher.teacher_name);
    const [email, setEmail] = useState(teacher.email);
    const [address, setAddress] = useState(teacher.address);
    const [previous_school, setPrevious_school] = useState(teacher.previous_school);
    const [subjectToTeach, setSubjectToTeach] = useState(teacher.subjectToTeach);
    const [gender, setGender] = useState(teacher.gender);
    const [phoneno, setPhoneno] = useState(teacher.contact_no);
    const [qualification, setQualification] = useState(teacher.qualification);
    const [age, setAge] = useState(teacher.age);

    const [uploading, setUploading] = useState(false);

    const [valid, setValid] = useState(false);
    const [time, setTime] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setValid(true);
        dispatch(
            teacherupdate(
                teacher._id,
                name.trim(),
                qualification,
                address,
                phoneno,
                gender,
                previous_school,
                age,
                email,
                subjectToTeach
            )
        );
        setName("");
        setAddress("");
        // setImage('')
        setTimeout(() => {
            setValid(false);
        }, 10000);
    };
    const userLogin = useSelector((state) => state.userLogin);
    // const userLogin = useSelector((state) => state.userLogin)

    const { userCred } = userLogin;

    // const studentRegister = useSelector((state) => state.studentRegister)
    const teacherUpdate = useSelector((state) => state.teacherUpdate);

    const { loading, success, error } = teacherUpdate;
    useEffect(() => {
        if (!userCred) {
            props.history.push("/login");
        }
    }, [userCred, props.history]);
    return (
        <div className='container1' style={{ marginTop: "10px" }}>
            {loading ? (
                <Loader />
            ) : (
                <div className='outer-layout'>
                    <h1>Update Teacher</h1>
                    {success && valid && (
                        <Message style={{ marginBottom: "3px" }} variant='success' message={success.message} />
                    )}
                    {valid && error && <Message variant='danger' message={error} />}

                    <form onSubmit={submitHandler}>
                        <div className='form-inner'>
                            <div className='form-control'>
                                <label htmlFor='name'>Full Name</label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='name'>Email</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Address</label>
                                <input
                                    type='text'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Previous School</label>
                                <input
                                    type='text'
                                    value={previous_school}
                                    onChange={(e) => setPrevious_school(e.target.value)}
                                    required
                                />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Subject To Teach</label>
                                <input
                                    type='text'
                                    value={subjectToTeach}
                                    onChange={(e) => setSubjectToTeach(e.target.value)}
                                    required
                                />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Gender</label>
                                <select required value={gender} onChange={(e) => setGender(e.target.value)}>
                                    {console.log(gender)}
                                    <option value=''>Select Gender</option>
                                    <option value='Male'>Male</option>

                                    <option value='Female'>Female</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Phone Number</label>
                                <input
                                    type='text'
                                    value={phoneno}
                                    onChange={(e) => setPhoneno(e.target.value)}
                                    required
                                />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Qualification</label>
                                <input
                                    type='text'
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    required
                                />
                            </div>
                            {/* <div className='form-control'>
              <label htmlFor='name'>Joining Date</label>
              <input type='date' />
            </div>{' '} */}
                            <div className='form-control'>
                                <label htmlFor='name'>Age</label>
                                <input type='number' value={age} onChange={(e) => setAge(e.target.value)} required />
                            </div>
                            {/* <div className="register-btn"> */}
                            {/* </div> */}
                        </div>

                        <button className='btn-register' type='submit'>
                            Update Teacher
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TeacherUpdate;
