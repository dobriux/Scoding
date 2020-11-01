import {
    ADMIN_TASK_REQUEST,
    ADMIN_TASK_ERROR,
    ADMIN_TASK_SUCCESS,
} from "../actions/adminUserTasks";
import axios from "axios";

const state = {
    tasks:'',
};

const getters = {
    getUserTasks: state => state.tasks,
};

const actions = {
    [ADMIN_TASK_REQUEST]: ({ commit, dispatch },data) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_TASK_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/getUserTasks", data:data, method: "POST" })
                .then(resp => {
                    console.log(resp);
                    commit(ADMIN_TASK_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err.response)
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
