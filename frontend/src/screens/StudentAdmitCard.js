import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudents } from "../actions/studentActions";
import Loader from "../components/Loader";
import { STUDENT_LIST_CLEAR } from "../constants/studentConstants";
const StudentAdmitCard = () => {
    const dispatch = useDispatch();
    const studentList = useSelector((state) => state.studentList);
    const { loading, students, error } = studentList;
    useEffect(() => {
        dispatch({
            type: STUDENT_LIST_CLEAR,
        });
        dispatch(listStudents());
        console.log(students);
    }, [dispatch]);
    return (
        <div className='container1'>
            <h1 style={{ marginLeft: "500px" }}>Submitted Proposals</h1>
            <div className='admitCard-outer'>
                {/* button is an inline element */}
                {loading ? (
                    <Loader />
                ) : (
                    students &&
                    students.map((student) => (
                        <Link className='link' to={{ pathname: "/admit_card/allstudents", state: student }}>
                            {student.topic}
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentAdmitCard;
