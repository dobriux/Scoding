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
                                <td>{{item.status}}</td>
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
        sortBy: function(sortKey) {
            this.$store.commit(USER_TASK_SORT_DATE, sortKey);
        }
    }
}
</script>
