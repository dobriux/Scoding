import {
    USER_CHANGE_STATUS_REQUEST,
    USER_CHANGE_STATUS_ERROR,
    USER_CHANGE_STATUS_SUCCESS,
} from "../actions/userChangeStatus";
import axios from "axios";
import {AUTH_LOGOUT} from "../actions/auth";

const state = {
    response:'',
};

const getters = {
    statusChangeResponse: state => state.response,
};

const actions = {
    [USER_CHANGE_STATUS_REQUEST]: ({ commit, dispatch }, data) => {
        return new Promise((resolve, reject) => {
            commit(USER_CHANGE_STATUS_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/changeStatus", data: data, method: "POST" })
                .then(resp => {
                    commit(USER_CHANGE_STATUS_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    if(err.response.status === 401){
                        dispatch(AUTH_LOGOUT);
                    }
                    commit(USER_CHANGE_STATUS_ERROR);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [USER_CHANGE_STATUS_REQUEST]: state => {
        state.response = '';
    },
    [USER_CHANGE_STATUS_SUCCESS]: (state, resp) => {
        state.response = resp.data.message;
    },
    [USER_CHANGE_STATUS_ERROR]: (state) => {
        state.response = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
