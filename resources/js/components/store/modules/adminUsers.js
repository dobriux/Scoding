import {
    ADMIN_USERS_REQUEST,
    ADMIN_USERS_ERROR,
    ADMIN_USERS_SUCCESS,
} from "../actions/adminUsers";
import axios from "axios";
import {AUTH_LOGOUT} from "../actions/auth";

const state = {
    adminUsersResponseMessage:'',
};

const getters = {
    adminUsersResponseMessage: state => state.adminUsersResponseMessage,
};

const actions = {
    [ADMIN_USERS_REQUEST]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_USERS_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/getOwnedUsers"})
                .then(resp => {
                    commit(ADMIN_USERS_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err.response)
                    commit(ADMIN_USERS_ERROR, err);
                    dispatch(AUTH_LOGOUT);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_USERS_REQUEST]: state => {
        state.adminUsersResponseMessage = '';
    },
    [ADMIN_USERS_SUCCESS]: (state, resp) => {
        state.adminUsersResponseMessage = resp.data.message;
    },
    [ADMIN_USERS_ERROR]: (state) => {
        state.adminUsersResponseMessage = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
