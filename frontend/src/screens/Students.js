import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllStudents } from "../actions/studentActions";
import Loader from "../components/Loader";
import { STUDENT_LIST_CLEAR } from "../constants/studentConstants";
const Students = () => {
    const dispatch = useDispatch();
    const [deleteUser, setDeleteUser] = useState(null);
    const studentsList = useSelector((state) => state.fetchStudentList);
    const { loading, studentList, error } = studentsList;
    useEffect(() => {
        dispatch({
            type: STUDENT_LIST_CLEAR,
        });
        dispatch(listAllStudents());
    }, [dispatch]);
    console.log(studentList);

    const deleteStudent = async (id) => {
        try {
            const { data } = await axios.delete(`/api/students/delete/${id}`);
            dispatch(listAllStudents());
        } catch (e) {
            console.log(error);
        }
    };
    return (
        <div className='container1'>
            <h1 style={{ marginLeft: "500px" }}>Students</h1>
            <div className='admitCard-outer'>
                {/* button is an inline element */}
                {loading ? (
                    <Loader />
                ) : (
                    studentList &&
                    studentList.map((student) => (
                        <div className='link' >
                            {/* to={{ pathname: "/admit_card/allstudents", state: student }} */}
                            <Link className='innerlink' to={{ pathname: "/student_update", state: student }}>{student.email}</Link>
                            <button
                                onClick={() => {
                                    deleteStudent(student._id);
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

export default Students;
