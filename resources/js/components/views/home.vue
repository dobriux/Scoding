<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Home</div>

                    <div class="card-body">
                        <a v-if="isAuthenticated" @click="logout">
                            <span class="logout">Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AUTH_LOGOUT } from "../store/actions/auth";
import { mapGetters } from "vuex";
export default {
    name: "Home",
    methods: {
        logout: function() {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated"]),
    }
};
</script>
