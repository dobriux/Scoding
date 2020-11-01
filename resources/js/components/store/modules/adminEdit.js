import {
    ADMIN_EDIT_REQUEST,
    ADMIN_EDIT_ERROR,
    ADMIN_EDIT_SUCCESS,
} from "../actions/adminEdit";
import axios from "axios";

const state = {
    adminEditResponseMessage:'',
    adminEditErrorResponseMessage:'',
};

const getters = {
    adminEditResponseMessage: state => state.adminEditResponseMessage,
    adminEditErrorResponseMessage: state => state.adminEditErrorResponseMessage,
};

const actions = {
    [ADMIN_EDIT_REQUEST]: ({ commit, dispatch }, edit) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_EDIT_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/editUser", data: edit, method: "PUT" })
                .then(resp => {
                    console.log(resp)
                    commit(ADMIN_EDIT_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err.response)
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
