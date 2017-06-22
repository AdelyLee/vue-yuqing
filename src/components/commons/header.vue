<template>
    <div class="header">
        <el-row>
            <el-col :span="24">
                <el-col :span="7">
                    <div class="logo">
                    <div class="header-logo">
                    </div>
                    <div class="header-text">
                        {{headerText}}
                    </div>
                    </div>
                </el-col>
                <el-col :span="17">
                    <div class="icon">
                        <el-col :span="24" class="signOut">
                            <div class="userImg"></div>
                            <el-dropdown trigger="click" class="drop">
                            <span class="el-dropdown-link">
                              <span v-if="username" class="userName">{{username}}</span>
                                <i class="el-icon-caret-bottom el-icon--right dropMenu"></i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item ><span @click="dialogFormVisible = true">更改密码</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item><span @click="logout" class="exit_a">退出</span></el-dropdown-item>
                                </el-dropdown-menu>
                                <!--更改密码-->
                                <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                                    <el-form :model="form" :rules="rules" ref="form"class="dialog_form">
                                        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldpassword">
                                            <el-input type="password" v-model="form.oldpassword" auto-complete="off" class="dialog_input"></el-input>
                                        </el-form-item>
                                        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                                            <el-input type="password" v-model="form.password" auto-complete="off" class="dialog_input"></el-input>
                                        </el-form-item>
                                        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="repassword">
                                            <el-input type="password" v-model="form.repassword" auto-complete="off" class="dialog_input"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="confirm(form)">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </el-dropdown>
                        </el-col>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import common from '../../vuex/common.js';
    import service from '../../vuex/module/login.js'
    export default {
        name: 'header',
        data () {
            return {
                headerText: '安徽煤监局與情系统',
                username:localStorage.getItem("user"),
                dialogFormVisible: false,
                form: {
                    oldpassword:'',
                    password:'',
                    repassword:"",
                },
                formLabelWidth: '80px',
                rules: {
                    oldpassword: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ],
                    repassword: [
                        {required: true, message: '请确认密码', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted () {
        },
        methods:{
         confirm(form){
             this.$refs.form.validate((valid) => {
                 if (valid && form.password === form.repassword) {
                     var self = this;
                     service.action.confirm(form).then(function (data) {
                         self.dialogFormVisible = false;
                         window.open("../../module/login.html");
                         self.oldpassword="";
                         self.password="";
                         self.repassword="";
                     }).catch(error => {
                         alert(error.responseJSON.message);
                     });
                 }
             });

         },
            logout(){
                service.action.logout().then(function () {
                    window.open("../../yuqing/module/login.html");
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>
<style>
    .header {
        width:100%;
        height: 55px;
        background-color: #4d637b;
        border-bottom: 0.15em solid #6c7481;
        position: fixed;
        z-index: 99999;
    }
    .logo{
        margin-right: 0;
        /*background-color: #2e455f;*/
        /*border-bottom: 2px solid #ccc;*/
    }
    .header-logo {
        width: 51px;
        height: 49px;
        float: left;
        margin-top: 3px;
        margin-left: 3px;
        background: url('../../../static/img/an_logo.png');
    }

    .header-text {
        line-height: 60px;
        font-size: 26px;
        font-weight: 600;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        padding-left: 18px;
        color: #ffffff;
    }
    .icon{
        float: right;
        margin-right: 10px;
        min-width: 11%!important;
    }
    .icon li{
        float: left;
        margin-left: 5px;
        margin-top: 15px;
        font-size: 14px;
        list-style: none;
        color: #fff;
    }
    .icon li a{
        color: #fff;
        text-decoration: none;
    }
    .signOut{
        position: relative;
        vertical-align: middle;
        margin-top: 10px;
        min-width: 90%!important;
    }
    .userImg{
        background: url('../../../static/img/user.png') center no-repeat;
        width: 30px;
        height: 30px;
        float: left;
    }
    .drop{
        /* margin-left: -10px; */
        position: absolute;
        /*right: 11px;*/
        min-width: 10%;
        margin-top: 6px;
    }
    .userName{
        font-size: 16px;
        margin-right: -5px;
        color:#fff!important;
    }
    .dropMenu{
        font-size: 1px;
        margin-right: -5px;
        color:#fff!important;
    }
    .el-dropdown-menu{
        z-index: 99999!important;
        top:35px!important;
    }
    p{
        text-align: center;
    }
    .el-dialog--small{
        width: 40%!important;
    }
    .dialog_form{
        padding-left:70px;
    }
    .dialog_input{
        width: 55% !important;
    }
    .exit_a{
        color: #000;
        text-decoration: none;
    }
    /*.dialog_form:first-child .dialog_input .el-input__inner{*/
        /*border:0*/
    /*}*/
</style>
