/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import router from './router';
import App from './components/App.vue'
import store from "./components/store";
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import moment from 'moment';

Vue.prototype.moment = moment;

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
