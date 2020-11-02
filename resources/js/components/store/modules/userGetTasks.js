import {
    USER_TASK_REQUEST,
    USER_TASK_ERROR,
    USER_TASK_SUCCESS,
    USER_TASK_SORT_DATE
} from "../actions/userGetTasks";
import axios from "axios";
import {AUTH_LOGOUT} from "../actions/auth";

const state = {
    tasks:'',
    lastOrder:'asc',
};

const getters = {
    getTasks: state => state.tasks,
};

const actions = {
    [USER_TASK_REQUEST]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(USER_TASK_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/getTasks", method: "GET" })
                .then(resp => {
                    commit(USER_TASK_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    if(err.response.status === 401){
                        dispatch(AUTH_LOGOUT);
                    }
                    commit(USER_TASK_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [USER_TASK_REQUEST]: state => {
        state.tasks = '';
    },
    [USER_TASK_SUCCESS]: (state, resp) => {
        state.tasks = resp.data.message;
    },
    [USER_TASK_ERROR]: (state) => {
        state.tasks = '';
    },
    [USER_TASK_SORT_DATE]: (state, sortKey) => {
        let sort = state.tasks;
        sort = _.orderBy(sort, sortKey, state.lastOrder);
        state.tasks = sort;
        if(state.lastOrder === 'asc'){
            state.lastOrder = 'desc';
        }else{
            state.lastOrder = 'asc';
        }
    }

};

export default {
    state,
    getters,
    actions,
    mutations
};
