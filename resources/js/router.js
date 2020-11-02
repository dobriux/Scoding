import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "./components/store"
import layout from './components/layouts/layout.vue';
import Login from './components/views/login.vue';
import Register from './components/views/register.vue';
import Admin from './components/views/admin.vue';
import Home from './components/views/home.vue';

Vue.use(VueRouter)


const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if(store.getters.isAuthenticated && store.getters.isAdmin){
        next("/admin");
        return;
    }

    if (store.getters.isAuthenticated) {
        next();
        return;
    }

    next("/login");
};

const ifAdmin = (to, from, next) => {

    if (store.getters.isAuthenticated && store.getters.isAdmin) {
        next();
        return;
    }
    next("/login");
};

const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { layout: layout },
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { layout: layout },
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: { layout: layout },
        beforeEnter: ifAuthenticated,
    },
    {
        name: 'admin',
        path: '/admin',
        component: Admin,
        meta: { layout: layout },
        beforeEnter: ifAdmin,
    },
]

export default new VueRouter({ mode: 'history', routes: routes })
