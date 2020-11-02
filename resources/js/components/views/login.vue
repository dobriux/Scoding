<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body" >
                        <div class="alert alert-danger" v-if="loginHasErrors" role="alert">
                            <ul>
                                <li v-for="item in loginErrorMessage" :key="item">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <form @submit.prevent="login">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" :class="{ 'is-invalid': $v.email.$error }" type="text" v-model.trim="$v.email.$model" class="form-control" autocomplete="email" autofocus>
                                    <span class="invalid-feedback"  v-if="!$v.email.required" role="alert"><strong>E-Mail Address must be filled</strong></span>
                                    <span class="invalid-feedback"  v-if="!$v.email.email" role="alert"><strong>Value must be type of Email</strong></span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" :class="{ 'is-invalid': $v.password.$error }" type="password" v-model.trim="$v.password.$model" class="form-control" autocomplete="current-password">
                                    <span class="invalid-feedback" v-if="!$v.password.required"><strong>Password must be filled</strong></span>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AUTH_REQUEST } from "../store/actions/auth";
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from "vuex";
export default {
    name:'login',

    data() {
        return {
            email: "",
            password: ""
        };
    },
    validations: {
            email: {
                required,
                email,
            },
            password: {
                required,
            }
    },
    methods: {
        login: function() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const { email, password } = this;
                this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                    if(this.$store.getters.isAdmin){
                        this.$router.push('/admin');
                    }else{
                        this.$router.push('/');
                    }

                });
            }
        }
    },
    computed: {
        ...mapGetters(["loginErrorMessage", "loginHasErrors"]),
    }
};
</script>
