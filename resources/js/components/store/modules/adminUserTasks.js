import {
    ADMIN_TASK_REQUEST,
    ADMIN_TASK_ERROR,
    ADMIN_TASK_SUCCESS,
    ADMIN_TASK_SELECTED_USER
} from "../actions/adminUserTasks";
import axios from "axios";
import {AUTH_LOGOUT} from "../actions/auth";

const state = {
    tasks:'',
    selectedUser:'',
};

const getters = {
    getUserTasks: state => state.tasks,
    userTasksSelectedUser: state => state.selectedUser,
};

const actions = {
    [ADMIN_TASK_REQUEST]: ({ commit, dispatch },data) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_TASK_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/getUserTasks", data:data, method: "POST" })
                .then(resp => {
                    commit(ADMIN_TASK_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    if(err.response.status === 401){
                        dispatch(AUTH_LOGOUT);
                    }
                    commit(ADMIN_TASK_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_TASK_REQUEST]: state => {
        state.tasks = '';
    },
    [ADMIN_TASK_SUCCESS]: (state, resp) => {
        state.tasks = resp.data.message;
    },
    [ADMIN_TASK_ERROR]: (state) => {
        state.tasks = '';
    },
    [ADMIN_TASK_SELECTED_USER]: (state, user) => {
        state.selectedUser = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
