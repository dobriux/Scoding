import {
    ADMIN_DELETE_REQUEST,
    ADMIN_DELETE_ERROR,
    ADMIN_DELETE_SUCCESS,
} from "../actions/adminDeleteUser";
import axios from "axios";

const state = {
    admindDeleteResponseMessage:'',
    adminDeleteErrorResponseMessage:'',
};

const getters = {
    admindDeleteResponseMessage: state => state.admindDeleteResponseMessage,
    adminDeleteErrorResponseMessage: state => state.adminDeleteErrorResponseMessage,
};

const actions = {
    [ADMIN_DELETE_REQUEST]: ({ commit, dispatch }, data) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_DELETE_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/deleteUser", data: data, method: "DELETE" })
                .then(resp => {
                    console.log(resp)
                    commit(ADMIN_DELETE_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err.response)
                    commit(ADMIN_DELETE_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_DELETE_REQUEST]: state => {
        state.admindDeleteResponseMessage = '';
        state.adminDeleteErrorResponseMessage = '';
    },
    [ADMIN_DELETE_SUCCESS]: (state, resp) => {
        state.admindDeleteResponseMessage = '';
        state.adminDeleteErrorResponseMessage = resp.data.message;
    },
    [ADMIN_DELETE_ERROR]: (state, err) => {
        state.adminDeleteErrorResponseMessage = err.response.data.message;
        state.admindDeleteResponseMessage = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
