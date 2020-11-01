import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import adminAddUser from "./modules/adminAddUser";
import adminUsers from "./modules/adminUsers";
import adminDeleteUser from "./modules/adminDeleteUser";
import register from "./modules/register";
import adminEdit from "./modules/adminEdit";
import adminUserTasks from "./modules/adminUserTasks";
import adminAddTask from "./modules/adminAddTask";
import userGetTasks from "./modules/userGetTasks";
import * as Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';
import { Store } from 'vuex'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Store({
    modules: {
        user,
        auth,
        register,
        adminAddUser,
        adminUsers,
        adminEdit,
        adminDeleteUser,
        adminUserTasks,
        adminAddTask,
        userGetTasks
    },
    plugins: [createPersistedState(
        {
            paths:['auth.isAdmin','user.profile'],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 3,
                    secure: false }),
                removeItem: key => Cookies.remove(key)
            },

        }
    )],
    strict: debug
});
