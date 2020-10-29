import {
    REGISTER_REQUEST,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
} from "../actions/register";
import axios from "axios";

const state = {
    registerResponseMessage:'',
    registerErrorResponseMessage:'',
    registerHasErrors:false,
};

const getters = {
    registerResponseMessage: state => state.registerResponseMessage,
    registerErrorResponseMessage: state => state.registerErrorResponseMessage,
    registerHasErrors: state => state.registerHasErrors
};

const actions = {
    [REGISTER_REQUEST]: ({ commit, dispatch }, user) => {
        console.log(user);
        return new Promise((resolve, reject) => {
            commit(REGISTER_REQUEST);
            axios({ url: "/api/register", data: user, method: "POST" })
                .then(resp => {
                    commit(REGISTER_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit(REGISTER_ERROR, err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    [REGISTER_REQUEST]: state => {
        state.registerHasErrors = false;
        state.ResponseMessage = '';
    },
    [REGISTER_SUCCESS]: (state, resp) => {
        state.registerHasErrors = false;
        state.registerResponseMessage = resp.data.message;
    },
    [REGISTER_ERROR]: (state, err) => {
        state.registerHasErrors = true;
        state.registerErrorResponseMessage = err.response.data.message;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
