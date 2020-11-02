import {
    ADMIN_ADD_REQUEST,
    ADMIN_ADD_ERROR,
    ADMIN_ADD_SUCCESS,
} from "../actions/adminAddUser";
import axios from "axios";
import {AUTH_LOGOUT} from "../actions/auth";

const state = {
    adminAddResponseMessage:'',
    adminAddErrorResponseMessage:'',
};

const getters = {
    adminAddResponseMessage: state => state.adminAddResponseMessage,
    adminAddErrorResponseMessage: state => state.adminAddErrorResponseMessage,
};

const actions = {
    [ADMIN_ADD_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_ADD_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/addUser", data: user, method: "POST" })
                .then(resp => {
                    commit(ADMIN_ADD_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    if(err.response.status === 401){
                        dispatch(AUTH_LOGOUT);
                    }
                    commit(ADMIN_ADD_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_ADD_REQUEST]: state => {
        state.adminAddResponseMessage = '';
        state.adminAddErrorResponseMessage = '';
        },
    [ADMIN_ADD_SUCCESS]: (state, resp) => {
        state.adminAddErrorResponseMessage = '';
        state.adminAddResponseMessage = resp.data.message;
    },
    [ADMIN_ADD_ERROR]: (state, err) => {
        state.adminAddErrorResponseMessage = err.response.data.message;
        state.adminAddResponseMessage = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
