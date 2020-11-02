import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";
import axios from "axios";

const state = {
    status: "",
    profile: {}
};

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name

};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST);
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("user-token");
        axios({ url: "api/getUser" })
            .then(resp => {
                commit(USER_SUCCESS, resp);
            })
            .catch(err => {
                if(err.response.status === 401){
                    dispatch(AUTH_LOGOUT);
                }
                commit(USER_ERROR);
                dispatch(AUTH_LOGOUT);
            });
    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp.data);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
