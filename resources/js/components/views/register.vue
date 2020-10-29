<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <div class="alert alert-danger" v-if="registerHasErrors" role="alert">
                            <ul>
                                <li v-for="item in registerErrorResponseMessage" :key="item">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <form @submit.prevent="register">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" :class="{ 'is-invalid': $v.name.$error }" v-model.trim="$v.name.$model" autocomplete="name" autofocus>
                                    <span class="invalid-feedback"  v-if="!$v.name.required" role="alert"><strong>Name must be filled</strong></span>
                                    <span class="invalid-feedback"  v-if="!$v.name.minLength" role="alert"><strong>Name must have at least {{ $v.name.$params.minLength.min }} characters</strong></span>
                                    <span class="invalid-feedback"  v-if="!$v.name.maxLength" role="alert"><strong>Name must have less than {{ $v.name.$params.maxLength.max }} characters</strong></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="text" class="form-control" :class="{ 'is-invalid': $v.email.$error }" v-model.trim="$v.email.$model" autocomplete="email">
                                    <span class="invalid-feedback"  v-if="!$v.email.required" role="alert"><strong>E-Mail Address must be filled</strong></span>
                                    <span class="invalid-feedback"  v-if="!$v.email.email" role="alert"><strong>Value must be type of Email</strong></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" :class="{ 'is-invalid': $v.password.$error }" v-model.trim="$v.password.$model" autocomplete="new-password">
                                    <span class="invalid-feedback"  v-if="!$v.password.required" role="alert"><strong>Password must be filled</strong></span>
                                    <span class="invalid-feedback"  v-if="!$v.password.minLength" role="alert"><strong>Password must have at least {{ $v.password.$params.minLength.min }} characters</strong></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" :class="{ 'is-invalid': $v.password_confirmation.$error }" v-model.trim="$v.password_confirmation.$model" autocomplete="new-password">
                                    <span class="invalid-feedback"  v-if="!$v.password_confirmation.required" role="alert"><strong>Confirm Password must be filled</strong></span>
                                    <span class="invalid-feedback"  v-if="!$v.password_confirmation.sameAsPassword" role="alert"><strong>Passwords does not match</strong></span>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
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
import { REGISTER_REQUEST } from "../store/actions/register";
import { required, sameAs, minLength, email, maxLength } from 'vuelidate/lib/validators'
import {mapGetters} from "vuex";

export default {
    name: "Register",
    data() {
        return {
            name:"",
            email: "",
            password: "",
            password_confirmation: ""
        };
    },
    validations: {
        name: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(50)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        password_confirmation: {
            sameAsPassword: sameAs('password')
        }
    },
    methods: {
        register: function() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const { name, email, password, password_confirmation } = this;
                this.$store.dispatch(REGISTER_REQUEST, { name, email, password, password_confirmation }).then(() => {
                    this.$router.push("login");
                });
            }
        }
    },
    computed: {
        ...mapGetters(["registerErrorResponseMessage", "registerHasErrors"]),
    }
};
</script>
