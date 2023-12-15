//this is the most important file for using the redux as state management tool
//this file should be created directly in the frontend folder
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {studentListReducer, studentUpdateReducer} from "./reducers/studentReducers";
import { userLoginReducer } from "./reducers/userReducers";
import {
    studentClassListReducer,
    studentSearchReducer,
    studentRegisterReducer,
    studentDeleteReducer,
    studentAttendanceReducer,
    studentFeesReducer,
    fetchStudentListReducer,
} from "./reducers/studentReducers";
import { allIncomeReducer, allSalaryReducer } from "./reducers/miscellaneousReducers";
import {
    teacherSalaryReducer,
    teacherRegisterReducer,
    teacherDeleteReducer,
    teacherListReducer, teacherUpdateReducer,
} from "./reducers/teacherReducers";
import {
    staffSalaryReducer,
    staffRegisterReducer,
    staffDeleteReducer,
    staffListReducer,
} from "./reducers/staffReducers";
const reducer = combineReducers({
    studentList: studentListReducer,
    fetchStudentList: fetchStudentListReducer,
    studentClassList: studentClassListReducer,
    studentSearch: studentSearchReducer,
    userLogin: userLoginReducer,
    studentRegister: studentRegisterReducer,
    studentUpdate: studentUpdateReducer,
    studentDelete: studentDeleteReducer,
    studentAttendance: studentAttendanceReducer,
    studentFees: studentFeesReducer,
    teacherSalary: teacherSalaryReducer,
    teacherRegister: teacherRegisterReducer,
    teacherUpdate: teacherUpdateReducer,
    teacherDelete: teacherDeleteReducer,
    teacherList: teacherListReducer,
    staffSalary: staffSalaryReducer,
    staffRegister: staffRegisterReducer,
    staffDelete: staffDeleteReducer,
    staffList: staffListReducer,
    allIncome: allIncomeReducer,
    allSalary: allSalaryReducer,
});
const userInfoFromStorage = localStorage.getItem("userCred") ? JSON.parse(localStorage.getItem("userCred")) : null;

//remember the above should be null
const initialState = {
    userLogin: { userCred: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
