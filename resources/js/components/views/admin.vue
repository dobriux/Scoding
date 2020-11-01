<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header"><b>Logged in as:</b> {{getProfile.name}}</div>
                    <div class="card-body">
                        <h3>Your Users</h3>
                        <button type="button" class="btn btn-primary m-3"  data-toggle="modal"  data-target="#addModal">Add User</button>
                        <table class="table">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in adminUsersResponseMessage" :key="item.email">
                                    <td>{{item.name}}</td>
                                    <td>{{ item.email }}</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm" data-toggle="modal" @click="tasksModal(item)" data-target="#tasksModal">Tasks</button>
                                        <button type="button" class="btn btn-primary ml-1 btn-sm" data-toggle="modal" @click="infoEditModal(item)" data-target="#editModal">Edit</button>
                                        <button type="button" class="btn btn-danger ml-1 btn-sm" data-toggle="modal" @click="adminDelete(item.id)" data-target="#deleteModalAlert">Delete</button></td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="modal fade" id="deleteModalAlert" tabindex="-1" role="dialog" aria-labelledby="ModalCenterAlertDelete" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Are you sure?</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Once deleted, account will be lost permanently. Are you sure you want to procced?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="adminDeleteSubmit">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" tabindex="-1" id="addModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Add User</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form @submit.prevent="adminAdd">
                                    <div class="modal-body">
                                        <div class="alert alert-danger" v-if="adminAddHasErrors" role="alert">
                                            <ul>
                                                <li v-for="item in adminAddErrorResponseMessage" :key="item">
                                                    {{ item }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="alert alert-success" v-if="adminAddResponseMessage!==''" role="alert">
                                                {{adminAddResponseMessage}}
                                        </div>
                                            <div class="form-group row">
                                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                                                <div class="col-md-6">
                                                    <input id="name" type="text" class="form-control" :class="{ 'is-invalid': $v.register.name.$error }" v-model.trim="$v.register.name.$model" autocomplete="name">
                                                    <span class="invalid-feedback"  v-if="!$v.register.name.required" role="alert"><strong>Name must be filled</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.register.name.minLength" role="alert"><strong>Name must have at least {{ $v.register.name.$params.minLength.min }} characters</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.register.name.maxLength" role="alert"><strong>Name must have less than {{ $v.register.name.$params.maxLength.max }} characters</strong></span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                                <div class="col-md-6">
                                                    <input id="email" type="text" class="form-control" :class="{ 'is-invalid': $v.register.email.$error }" v-model.trim="$v.register.email.$model" autocomplete="email">
                                                    <span class="invalid-feedback"  v-if="!$v.register.email.required" role="alert"><strong>E-Mail Address must be filled</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.register.email.email" role="alert"><strong>Value must be type of Email</strong></span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                                <div class="col-md-6">
                                                    <input id="password" type="password" class="form-control" :class="{ 'is-invalid': $v.register.password.$error }" v-model.trim="$v.register.password.$model" autocomplete="new-password">
                                                    <span class="invalid-feedback"  v-if="!$v.register.password.required" role="alert"><strong>Password must be filled</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.register.password.minLength" role="alert"><strong>Password must have at least {{ $v.register.password.$params.minLength.min }} characters</strong></span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                                <div class="col-md-6">
                                                    <input id="password-confirm" type="password" class="form-control" :class="{ 'is-invalid': $v.register.password_confirmation.$error }" v-model.trim="$v.register.password_confirmation.$model" autocomplete="new-password">
                                                    <span class="invalid-feedback"  v-if="!$v.register.password_confirmation.required" role="alert"><strong>Confirm Password must be filled</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.register.password_confirmation.sameAsPassword" role="alert"><strong>Passwords does not match</strong></span>
                                                </div>
                                            </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-success">Register</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" tabindex="-1" id="editModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Edit User</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form @submit.prevent="adminEdit">
                                        <div class="modal-body">
                                            <div class="alert alert-danger" v-if="adminEditErrorResponseMessage!==''" role="alert">
                                                <ul>
                                                    <li v-for="item in adminEditErrorResponseMessage" :key="item">
                                                        {{ item }}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="alert alert-success" v-if="adminEditResponseMessage!==''" role="alert">
                                                {{adminEditResponseMessage}}
                                            </div>
                                            <div class="form-group row">
                                                <label for="nameEdit" class="col-md-4 col-form-label text-md-right">Name</label>
                                                <div class="col-md-6">
                                                    <input id="nameEdit" type="text" class="form-control" :class="{ 'is-invalid': $v.edit.name.$error }" v-model.trim="$v.edit.name.$model" autocomplete="name">
                                                    <span class="invalid-feedback"  v-if="!$v.edit.name.required" role="alert"><strong>Name must be filled</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.edit.name.minLength" role="alert"><strong>Name must have at least {{ $v.edit.name.$params.minLength.min }} characters</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.edit.name.maxLength" role="alert"><strong>Name must have less than {{ $v.edit.name.$params.maxLength.max }} characters</strong></span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="emailEdit" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                                <div class="col-md-6">
                                                    <input id="emailEdit" type="text" class="form-control" :class="{ 'is-invalid': $v.edit.email.$error }" v-model.trim="$v.edit.email.$model" autocomplete="email">
                                                    <span class="invalid-feedback"  v-if="!$v.edit.email.required" role="alert"><strong>E-Mail Address must be filled</strong></span>
                                                    <span class="invalid-feedback"  v-if="!$v.edit.email.email" role="alert"><strong>Value must be type of Email</strong></span>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="password" class="col-md-4 col-form-label text-md-right">New Password(Optional)</label>
                                                <div class="col-md-6">
                                                    <input id="passwordEdit" type="password" class="form-control" :class="{ 'is-invalid': $v.edit.password.$error }" v-model.trim="$v.edit.password.$model" autocomplete="new-password">
                                                    <span class="invalid-feedback"  v-if="!$v.edit.password.minLength" role="alert"><strong>Password must have at least {{ $v.edit.password.$params.minLength.min }} characters</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-success">Edit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" tabindex="-1" id="tasksModal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">{{ this.tasks.selectedUser.name }} tasks</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="alert alert-danger" v-if="adminEditErrorResponseMessage !==''" role="alert">
                                            <ul>
                                                <li v-for="item in adminAddTaskErrorResponse" :key="item">
                                                    {{ item }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="alert alert-success" v-if="adminAddTaskResponse!==''" role="alert">
                                            {{adminAddTaskResponse}}
                                        </div>
                                        <form @submit.prevent="adminEdit">
                                            <div class="form-group row">
                                                <label for="task" class="col-md-4 col-form-label text-md-right">Task</label>
                                                <div class="col-md-6">
                                                    <input id="task" type="text" class="form-control" :class="{ 'is-invalid': $v.tasks.task.$error }" v-model.trim="$v.tasks.task.$model">
                                                    <span class="invalid-feedback"  v-if="!$v.tasks.task.required" role="alert"><strong>Task must be filled</strong></span>
                                                </div>
                                            </div>
                                            <div class="form-group row mb-0">
                                                <div class="col-md-6 offset-md-4">
                                                    <button type="submit" @click="addTask" class="btn btn-primary">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <table class="table mt-3">
                                            <thead>
                                            <tr>
                                                <th scope="col">Task</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in getUserTasks" :key="item.created_at">
                                                <td scope="col">{{item.task}}</td>
                                                <td scope="col">{{item.status}}</td>
                                                <td scope="col">{{moment(item.created_at).format('YYYY-MM-DD')}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, sameAs, minLength, email, maxLength } from 'vuelidate/lib/validators'
import {mapGetters} from "vuex";
import {ADMIN_ADD_REQUEST} from "../store/actions/adminAddUser";
import {ADMIN_USERS_REQUEST} from "../store/actions/adminUsers";
import {ADMIN_EDIT_REQUEST} from "../store/actions/adminEdit";
import {ADMIN_DELETE_REQUEST} from "../store/actions/adminDeleteUser";
import {ADMIN_TASK_REQUEST} from "../store/actions/adminUserTasks";
import {ADMIN_ADD_TASK_REQUEST} from "../store/actions/adminAddTask";
export default {
    name: "admin",
    data() {
        return {
            register: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            edit:{
                name: "",
                email: "",
                password: "",
                selectedUser:"",
                id:"",
            },
            delete:{
                id:"",
            },
            tasks:{
                selectedUser:"",
                task:"",
            }
        };
    },
    validations: {
        register:{
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
        edit:{
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
                minLength: minLength(6)
            },
        },
        tasks:{
            task:{
                required,
            }
        }
    },
    methods: {
        adminAdd: function() {
            this.$v.$touch()
            if (!this.$v.register.$invalid) {
                const { name, email, password, password_confirmation } = this.register;
                this.$store.dispatch(ADMIN_ADD_REQUEST, { name, email, password, password_confirmation }).then(() => {
                    this.$store.dispatch(ADMIN_USERS_REQUEST);
                    this.$v.register.name.$model = '';
                    this.$v.register.email.$model = '';
                    this.$v.register.password.$model = '';
                    this.$v.register.password_confirmation.$model = '';
                    this.$v.register.$reset();
                });
            }
        },
        adminEdit: function() {
            this.$v.$touch()
            if (!this.$v.edit.$invalid) {
                const {id, name, email, password } = this.edit;
                this.$store.dispatch(ADMIN_EDIT_REQUEST, {id ,name, email, password }).then(() => {
                    this.$v.edit.password.$model = '';
                    this.$v.edit.$reset();
                    this.$store.dispatch(ADMIN_USERS_REQUEST);
                });
            }
        },
        adminDelete: function(id) {
                this.delete.id = id;
        },
        adminDeleteSubmit: function (){
            const id = this.delete.id;
            this.$store.dispatch(ADMIN_DELETE_REQUEST,{id}).then(() =>{
                this.$store.dispatch(ADMIN_USERS_REQUEST);
            });
        },
        infoEditModal(item) {
            this.edit.selectedUser = item;
            this.edit.id = this.edit.selectedUser.id;
            this.$v.edit.name.$model = this.edit.selectedUser.name;
            this.$v.edit.email.$model = this.edit.selectedUser.email;
        },
        tasksModal(item) {
            this.tasks.selectedUser = item;
            const id = this.tasks.selectedUser.id;
            this.$store.dispatch(ADMIN_TASK_REQUEST, {id});
        },
        addTask(){
            this.$v.$touch()
            if (!this.$v.tasks.$invalid) {
                const id  = this.tasks.selectedUser.id;
                const {task} = this.tasks;
                this.$store.dispatch(ADMIN_ADD_TASK_REQUEST,{id, task}).then(() =>{
                    this.$store.dispatch(ADMIN_TASK_REQUEST, {id});
                });

            }
        },
    },

    created() {
        this.$store.dispatch(ADMIN_USERS_REQUEST);
    },
    computed: {
        ...mapGetters([
            "adminAddResponseMessage",
            "adminAddHasErrors",
            "adminAddErrorResponseMessage",
            "getProfile",
            "adminUsersResponseMessage",
            "adminEditResponseMessage",
            "adminEditErrorResponseMessage",
            "getUserTasks",
            "adminAddTaskResponse",
            "adminAddTaskErrorResponse"
        ]),
    }
}
</script>
