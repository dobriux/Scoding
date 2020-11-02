<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/">
                   Scoding task
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Right Side Of Navbar -->
                    <ul v-if="!isAuthenticated" class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <li class="nav-item">
                            <router-link class="nav-link" to="/Login">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/Register">Register</router-link>
                        </li>
                    </ul>
                    <ul v-if="isAuthenticated" class="navbar-nav ml-auto">
                        <li class="nav-item">
                                <a @click="logout" href="#" class="nav-link">Logout</a>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
            <slot />
    </div>
</template>

<script>
import { AUTH_LOGOUT } from "../store/actions/auth";
import { mapGetters } from "vuex";
export default {
    name: "Layout",
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
