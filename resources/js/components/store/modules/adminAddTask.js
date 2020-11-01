import {
    ADMIN_ADD_TASK_REQUEST,
    ADMIN_ADD_TASK_ERROR,
    ADMIN_ADD_TASK_SUCCESS,
} from "../actions/adminAddTask";
import axios from "axios";

const state = {
    response:'',
    errorResponse:'',
};

const getters = {
    adminAddTaskResponse: state => state.response,
    adminAddTaskErrorResponse: state => state.errorResponse,
};

const actions = {
    [ADMIN_ADD_TASK_REQUEST]: ({ commit, dispatch },data) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_ADD_TASK_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/addTask", data:data, method: "POST" })
                .then(resp => {
                    console.log(resp);
                    commit(ADMIN_ADD_TASK_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err.response)
                    commit(ADMIN_ADD_TASK_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_ADD_TASK_REQUEST]: state => {
        state.response = '';
        state.errorResponse = '';
    },
    [ADMIN_ADD_TASK_SUCCESS]: (state, resp) => {
        state.response = resp.data.message;
        state.errorResponse = '';
    },
    [ADMIN_ADD_TASK_ERROR]: (state, err) => {
        state.response = '';
        state.errorResponse = err.response.data.message;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
