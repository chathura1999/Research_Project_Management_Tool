import axios from "axios";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../actions/studentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";
const StudentRegister = ({ history }) => {
    const dispatch = useDispatch();
    const [valid, setValid] = useState(false);
    const [time, setTime] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [classname, setClassname] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [age, setAge] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        setValid(true);
        console.log({ name: name.trim(), classname, address, phoneno, gender, age, email });
        dispatch(Register(name.trim(), classname, address, phoneno, gender, age, email));
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
    const studentRegister = useSelector((state) => state.studentRegister);

    const { loading, success, error } = studentRegister;
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
                    <h1>Register Student</h1>
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
                                <label htmlFor='name'>Age</label>
                                <input type='number' value={age} onChange={(e) => setAge(e.target.value)} required />
                            </div>
                        </div>

                        <button className='btn-register' type='submit'>
                            Register Student
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentRegister;
