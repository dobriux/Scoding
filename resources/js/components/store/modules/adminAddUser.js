import {
    ADMIN_ADD_REQUEST,
    ADMIN_ADD_ERROR,
    ADMIN_ADD_SUCCESS,
} from "../actions/adminAddUser";
import axios from "axios";

const state = {
    adminAddResponseMessage:'',
    adminAddErrorResponseMessage:'',
    adminAddHasErrors:false,
};

const getters = {
    adminAddResponseMessage: state => state.adminAddResponseMessage,
    adminAddErrorResponseMessage: state => state.adminAddErrorResponseMessage,
    adminAddHasErrors: state => state.adminAddHasErrors
};

const actions = {
    [ADMIN_ADD_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(ADMIN_ADD_REQUEST);
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
            axios({ url: "/api/admin/addUser", data: user, method: "POST" })
                .then(resp => {
                    console.log(resp)
                    commit(ADMIN_ADD_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit(ADMIN_ADD_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [ADMIN_ADD_REQUEST]: state => {
        state.adminAddHasErrors = false;
        state.adminAddMessage = '';
        state.adminAddErrorResponseMessage = '';
        },
    [ADMIN_ADD_SUCCESS]: (state, resp) => {
        state.adminAddHasErrors = false;
        state.adminAddErrorResponseMessage = '';
        state.adminAddResponseMessage = resp.data.message;
    },
    [ADMIN_ADD_ERROR]: (state, err) => {
        state.adminAddHasErrors = true;
        state.adminAddErrorResponseMessage = err.response.data.message;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
