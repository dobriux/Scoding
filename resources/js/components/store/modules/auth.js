/* eslint-disable promise/param-names */
import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import axios from "../../helpers/axios";

const state = {
    token: localStorage.getItem("user-token") || "",
    hasLoadedOnce: false,
    error: '',
    loginHasErrors: false,
    isAdmin:false,


};

const getters = {
    isAuthenticated: state => !!state.token,
    loginErrorMessage: state => state.error,
    loginHasErrors: state => state.loginHasErrors,
    isAdmin: state => state.isAdmin,
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new  Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            axios({ url: "/api/login", data: user, method: "POST" })
                .then(resp => {
                    console.log(resp.data.access_token);
                    localStorage.setItem("user-token", resp.data.access_token);
                    commit(AUTH_SUCCESS, resp);
                    dispatch(USER_REQUEST);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err.response);
                    localStorage.removeItem("user-token");
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("user-token");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.loginHasErrors = false;
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.token = resp.data.access_token;
        state.hasLoadedOnce = true;
        state.loginHasErrors = false;
        state.isAdmin = resp.data.isAdmin;
    },
    [AUTH_ERROR]: (state, resp) => {
        state.hasLoadedOnce = true;
        state.error = resp.data.message;
        state.loginHasErrors = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
