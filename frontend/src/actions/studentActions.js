import axios from "axios";
import {
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    STUDENT_CLASS_LIST_REQUEST,
    STUDENT_CLASS_LIST_SUCCESS,
    STUDENT_CLASS_LIST_FAIL,
    STUDENT_SEARCH_REQUEST,
    STUDENT_SEARCH_SUCCESS,
    STUDENT_SEARCH_FAIL,
    STUDENT_REGISTER_REQUEST,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_DELETE_FAIL,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_REQUEST,
    STUDENT_ATTENDANCE_FAIL,
    STUDENT_ATTENDANCE_SUCCESS,
    STUDENT_ATTENDANCE_REQUEST,
    STUDENT_FEES_REQUEST,
    STUDENT_FEES_SUCCESS,
    STUDENT_FEES_FAIL,
    FETCH_STUDENT_LIST_CLEAR,
    FETCH_STUDENT_LIST_REQUEST,
    FETCH_STUDENT_LIST_SUCCESS,
    FETCH_STUDENT_LIST_FAIL, STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_SUCCESS,
} from "../constants/studentConstants";
import {TEACHER_UPDATE_FAIL, TEACHER_UPDATE_REQUEST, TEACHER_UPDATE_SUCCESS} from "../constants/teacherConstants";

//the below uses function within a function which is privileged by redux-thunk

export const listStudents = () => async (dispatch) => {
    try {
        dispatch({
            type: STUDENT_LIST_REQUEST,
        });
        const { data } = await axios.get("/api/proposal");
        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data,
        });
        console.log(data);
    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
//following displays list of all students belonging to the particular class
export const listAllStudents = () => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_STUDENT_LIST_REQUEST,
        });
        const { data } = await axios.get("/api/students");
        dispatch({
            type: FETCH_STUDENT_LIST_SUCCESS,
            payload: data,
        });
        console.log(data);
    } catch (error) {
        dispatch({
            type: FETCH_STUDENT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const classlistStudent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: STUDENT_CLASS_LIST_REQUEST,
        });
        const { data } = await axios.get(`/api/students/class/${id}`);
        dispatch({
            type: STUDENT_CLASS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_CLASS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
//following is for searching the student for paying the fees

export const studentSearch = (name, classname, rollno) => async (dispatch) => {
    try {
        dispatch({
            type: STUDENT_SEARCH_REQUEST,
        });
        console.log(name, classname, rollno);
        const { data } = await axios.get(`/api/students/search/${name}/${classname}/${rollno}`);
        console.log("Data is ", data);
        dispatch({
            type: STUDENT_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

//student register

export const Register =
    (
        student_name,
        classname,

        address,

        contact_no,
        gender,
        age,
        email
    ) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: STUDENT_REGISTER_REQUEST,
            });
            //we need to send headers information so we declaring it inside the config
            const {
                userLogin: { userCred },
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userCred.token}`,
                },
            };
            const { data } = await axios.post(
                "/api/students/register",
                {
                    student_name,
                    classname,

                    address,

                    contact_no,
                    gender,
                    age,
                    email,
                },
                config
            );
            console.log(data);
            dispatch({
                type: STUDENT_REGISTER_SUCCESS,
                payload: data,
            });
            //we are getting  the json data from our backend request so we need to convert it into the
            //string before we save them in our local storage of our  browser
        } catch (error) {
            dispatch({
                type: STUDENT_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

//STUDENT Update

export const studentupdate =
    (
        id,
        //TODO: Change to student fields start
        student_name,
        email,
        address,
        gender,
        contact_no,
        age
        //TODO: Change to student fields end
    ) =>
        //TODO: Change teacher to student start
        async (dispatch, getState) => {
            try {
                dispatch({
                    type: STUDENT_UPDATE_REQUEST,
                });
                //we need to send headers information so we declaring it inside the config
                const {
                    userLogin: { userCred },
                } = getState();
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userCred.token}`,
                    },
                };
                const { data } = await axios.put(
                    "/api/students/update",
                    {
                        _id: id,
                        //TODO: Change to student fields start
                        student_name,

                        email,
                        address,
                        gender,
                        contact_no,
                        age
                        //TODO: Change to student fields end
                    },
                    config
                );
                dispatch({
                    type: STUDENT_UPDATE_SUCCESS,
                    payload: data,
                });
                //we are getting  the json data from our backend request so we need to convert it into the
                //string before we save them in our local storage of our  browser
            } catch (error) {
                dispatch({
                    type: STUDENT_UPDATE_FAIL,
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message,
                });
            }
            //TODO: Change teacher to student end
        };


//FOLLOWING IS FOR DELETING THE STUDENT

export const deleteStudent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: STUDENT_DELETE_REQUEST,
        });
        const { data } = await axios.delete(`/api/students/delete/${id}`);
        dispatch({
            type: STUDENT_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

//student attendacnce

export const studentAttendances = (classname, students) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STUDENT_ATTENDANCE_REQUEST,
        });
        //we need to send headers information so we declaring it inside the config
        const {
            userLogin: { userCred },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userCred.token}`,
            },
        };
        const { data } = await axios.post(
            `/api/students/attendance/${classname}`,
            {
                students,
            },
            config
        );
        dispatch({
            type: STUDENT_ATTENDANCE_SUCCESS,
            payload: data,
        });
        //we are getting  the json data from our backend request so we need to convert it into the
        //string before we save them in our local storage of our  browser
    } catch (error) {
        dispatch({
            type: STUDENT_ATTENDANCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

//fees

export const PayFees =
    (
        studentId,
        student_name,

        classname,
        roll_no,
        month_name,
        year,
        monthly_fees,
        hostel_fees,
        laboratory_fees,
        computer_fees,
        exam_fees,
        miscellaneous
    ) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: STUDENT_FEES_REQUEST,
            });
            //we need to send headers information so we declaring it inside the config
            const {
                userLogin: { userCred },
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userCred.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/students/fees/${studentId}`,
                {
                    student_name,
                    classname,
                    roll_no,
                    month_name,
                    year,
                    monthly_fees,
                    hostel_fees,
                    laboratory_fees,
                    computer_fees,
                    exam_fees,
                    miscellaneous,
                },
                config
            );
            dispatch({
                type: STUDENT_FEES_SUCCESS,
                payload: data,
            });
            //we are getting  the json data from our backend request so we need to convert it into the
            //string before we save them in our local storage of our  browser
        } catch (error) {
            dispatch({
                type: STUDENT_FEES_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
