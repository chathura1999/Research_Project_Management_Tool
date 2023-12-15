import {
    STAFF_DELETE_FAIL,
    STAFF_DELETE_REQUEST,
    STAFF_DELETE_SUCCESS,
    STAFF_LIST_FAIL,
    STAFF_LIST_REQUEST,
    STAFF_LIST_RESET,
    STAFF_LIST_SUCCESS,
    STAFF_SALARY_FAIL,
    STAFF_SALARY_REQUEST,
    STAFF_SALARY_RESET,
    STAFF_SALARY_SUCCESS,
    SUBMIT_PROPOSAL_FAIL,
    SUBMIT_PROPOSAL_REQUEST,
    SUBMIT_PROPOSAL_RESET,
    SUBMIT_PROPOSAL_SUCCESS,
} from "../constants/staffConstants";

export const staffSalaryReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_SALARY_REQUEST:
            return { loading: true };
        case STAFF_SALARY_SUCCESS:
            return { loading: false, success: action.payload };
        case STAFF_SALARY_FAIL:
            return { loading: false, error: action.payload };
        case STAFF_SALARY_RESET:
            return {};
        default:
            return state;
    }
};

//STAFF REGISTER REDUCER
export const staffRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_PROPOSAL_REQUEST:
            return { loading: true };
        case SUBMIT_PROPOSAL_SUCCESS:
            return { loading: false, success: action.payload };
        case SUBMIT_PROPOSAL_FAIL:
            return { loading: false, error: action.payload };
        case SUBMIT_PROPOSAL_RESET:
            return {};
        default:
            return state;
    }
};

export const staffDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_DELETE_REQUEST:
            return { loading: true };
        case STAFF_DELETE_SUCCESS:
            return { loading: false, success: action.payload };
        case STAFF_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const staffListReducer = (state = { staffs: [] }, action) => {
    switch (action.type) {
        case STAFF_LIST_REQUEST:
            return { loading: true, staffs: [] };
        case STAFF_LIST_SUCCESS:
            return { loading: false, staffs: action.payload };
        case STAFF_LIST_FAIL:
            return { loading: false, error: action.payload };
        case STAFF_LIST_RESET:
            return {};
        default:
            return state;
    }
};
