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
                        <!--<li class="keywordSetting"><i class="el-icon-setting"></i> 关键词设置</li>-->
                        <!--<li class="contactSettings"><i class="el-icon-star-on"></i> 联系人设置</li>-->
                        <!--<li class="reportSettings"><i class="el-icon-document"></i> 报告设置</li>-->
                        <el-col :span="12" class="signOut">
                            <!--<span class="demonstration">click 激活</span>-->
                            <img :src="userImg" class="userImg" alt="">
                            <el-dropdown trigger="click" class="drop">
                            <span class="el-dropdown-link">
                              <span v-if="username" class="userName">{{username}}</span>
                                <i class="el-icon-caret-bottom el-icon--right dropMenu"></i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item ><span @click="dialogFormVisible = true">更改密码</span>
                                    </el-dropdown-item>
                                    <el-dropdown-item><a href="../module/login.html" class="exit_a">退出</a></el-dropdown-item>
                                </el-dropdown-menu>
                                <!--更改密码-->
                                <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                                    <el-form :model="form" class="dialog_form">
                                        <el-form-item label="用户名" :label-width="formLabelWidth">
                                            <el-input v-model="username" auto-complete="off" class="dialog_input"></el-input>
                                        </el-form-item>
                                        <el-form-item label="原密码" :label-width="formLabelWidth">
                                            <el-input type="password" v-model="form.oldpassword" auto-complete="off" class="dialog_input"></el-input>
                                        </el-form-item>
                                        <el-form-item label="密码" :label-width="formLabelWidth">
                                            <el-input type="password" v-model="form.password" auto-complete="off" class="dialog_input"></el-input>
                                        </el-form-item>
                                        <el-form-item label="确认密码" :label-width="formLabelWidth">
                                            <el-input type="password" v-model="form.repassword" auto-complete="off" class="dialog_input"></el-input>

                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="turnPassword()">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </el-dropdown>
                        </el-col>
                        <!--<li class="signOut"><i class="el-icon-upload2"></i> <a href="../module/login.html">退出</a></li>-->
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import queryParam from '../../vuex/utils.js'
    import $  from 'jquery';
    import common from '../../vuex/common.js';
    export default {
        name: 'header',
        data () {
            return {
                headerText: '安徽煤监局與情系统',
                username:queryParam.utils.getQueryVariable('user'),
                userImg:"../../../static/img/user.png",
                dialogFormVisible: false,
                form: {
                    oldpassword:queryParam.utils.getQueryVariable('password'),
                    password:'',
                    repassword:"",
                },
                formLabelWidth: '80px',
            }
        },
        mounted () {
        },
        methods:{
            turnPassword:function(){
                debugger;
                var self = this;
                if(self.form.password==self.form.repassword){
                    var param={
                        oldPwd:self.form.oldpassword,
                        newPwd:self.form.password
                    }
                    $.ajax({
                        url: common.url.webserviceUrl + '/admin/user/modifyPassword',
                        type: 'post',
                        data: param,
                        success: function (data) {
                            console.log(data);
                            self.dialogFormVisible=false;
                        },
                        error: function (error) {
                            reject(error);
                        }
                    });

                }else{
                    alert("输入密码不正确")
                }


            }
        }
    }
</script>
<style>
    .header {
        width:100%;
        height: 55px;
        background-color: #4d637b;
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
    }
    .userImg{
        position: absolute;
        right: 40px;
        top: 0;
        display: inline-block;
        width: 30px;
    }
    .drop{
        /* margin-left: -10px; */
        position: absolute;
        right: 11px;
        width: 60px;
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
