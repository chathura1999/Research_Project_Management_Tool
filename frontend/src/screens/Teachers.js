import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTeachers, deleteTeacher } from "../actions/teacherActions";
import Loader from "../components/Loader";
import { STUDENT_LIST_CLEAR } from "../constants/studentConstants";
const Teachers = () => {
    const dispatch = useDispatch();
    const teacherList = useSelector((state) => state.teacherList);
    const { loading, teachers, error } = teacherList;
    useEffect(() => {
        dispatch(listTeachers());
    }, []);

    const deleteTeachers = async (id) => {
        const { data } = await axios.delete(`/api/teachers/delete/${id}`);
        dispatch(listTeachers());
    };
    return (
        <div className='container1'>
            <h1 style={{ marginLeft: "500px" }}>Teachers</h1>
            <div className='admitCard-outer'>
                {/* button is an inline element */}
                {loading ? (
                    <Loader />
                ) : (
                    teachers &&
                    teachers.map((teacher) => (
                        <div className='link'>
                            {/* to={{ pathname: "/admit_card/allstudents", state: student }} */}
                            <Link className='innerlink'  to={{ pathname: "/teacher_update", state: teacher }}>{teacher.email}</Link>
                            <button
                                onClick={() => {
                                    deleteTeachers(teacher._id);
                                }}
                                className='linkbutton'
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Teachers;
