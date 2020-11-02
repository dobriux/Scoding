import {
    ADMIN_EDIT_REQUEST,
    ADMIN_EDIT_ERROR,
    ADMIN_EDIT_SUCCESS,
    ADMIN_EDIT_SELECT_USER
} from "../actions/adminEdit";
import axios from "axios";
import {AUTH_LOGOUT} from "../actions/auth";

const state = {
    adminEditResponseMessage:'',
    adminEditErrorResponseMessage:'',
    selectedUser:'',
};

const getters = {
    adminEditResponseMessage: state => state.adminEditResponseMessage,
    adminEditErrorResponseMessage: state => state.adminEditErrorResponseMessage,
    adminEditSelectedUser: state => state.selectedUser,
};

const actions = {
    [ADMIN_EDIT_REQUEST]: ({ commit, dispatch }, edit) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_EDIT_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/editUser", data: edit, method: "PUT" })
                .then(resp => {
                    commit(ADMIN_EDIT_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    if(err.response.status === 401){
                        dispatch(AUTH_LOGOUT);
                    }
                    commit(ADMIN_EDIT_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_EDIT_REQUEST]: state => {
        state.adminEditResponseMessage = '';
        state.adminEditErrorResponseMessage = '';
    },
    [ADMIN_EDIT_SUCCESS]: (state, resp) => {
        state.adminEditErrorResponseMessage = '';
        state.adminEditResponseMessage = resp.data.message;
    },
    [ADMIN_EDIT_ERROR]: (state, err) => {
        state.adminEditErrorResponseMessage = err.response.data.message;
        state.adminEditResponseMessage = '';
    },
    [ADMIN_EDIT_SELECT_USER]: (state, user) => {
        state.selectedUser = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
