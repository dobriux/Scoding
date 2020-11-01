<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header"><b>Logged in as:</b> {{getProfile.name}}</div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Task</th>
                                <th scope="col"><a href="#" @click="sortBy('status')">Status</a></th>
                                <th scope="col"><a href="#" @click="sortBy('created_at')">Date</a></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in getTasks" :key="item.created_at">
                                <td>{{item.task}}</td>
                                <td>
                                    <select class="form-control" @change="statusChange($event, item.id)" >
                                        <option value="1" :selected="item.status == 'in progress'">in progress</option>
                                        <option value="2"  :selected="item.status == 'to do'">to do</option>
                                        <option value="3"  :selected="item.status == 'done'">done</option>
                                </select>
                                </td>
                                <td>{{moment(item.created_at).format('YYYY-MM-DD')}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {USER_TASK_REQUEST, USER_TASK_SORT_DATE} from "../store/actions/userGetTasks";
import {ADMIN_ADD_TASK_REQUEST} from "../store/actions/adminAddTask";
import {ADMIN_TASK_REQUEST} from "../store/actions/adminUserTasks";
import {USER_CHANGE_STATUS_REQUEST} from "../store/actions/userChangeStatus";
export default {
    name: "Home",
    computed: {
        ...mapGetters([
            "getProfile",
            "getTasks"
        ]),
    },
    created() {
        this.$store.dispatch(USER_TASK_REQUEST);
    },
    methods: {
        statusChange(event, id){
            const status = event.target.value;
            this.$store.dispatch(USER_CHANGE_STATUS_REQUEST,{id, status});
        },
        sortBy: function(sortKey) {
            this.$store.commit(USER_TASK_SORT_DATE, sortKey);
        }
    }
}
</script>
