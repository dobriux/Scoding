import axios from 'axios';

let token = localStorage.getItem("user-token");
if (!token) {
    token = '';
}
axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default axios;
