<template>
    <div id="login">
        <div class="header">
            <span style="margin-top: 5%; font-family: 隶书; font-size: 35px;">大数据分析舆情系统</span>
        </div>
        <div class="row cleaxfix">
            <div class="col-sm-7 column  col-sm-offset-1" style="margin-top: 5%;font-family: 隶书;">
                <span class="tit_span" size=5>欢迎登陆大数据分析舆情系统</span>
            </div>
            <div class="f_r">
                <div class="panel panel-primary" id="login-panel">
                    <div class="panel-heading">
                        <h4>用户登录</h4>
                    </div>
                    <div class="panel-body">
                        <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm"
                                 class="demo-ruleForm">
                            <el-form-item label="用户名">
                                <el-input v-model="ruleForm.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input type="password" v-model="ruleForm.passWord"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" class="wid">
                                <el-input v-model="ruleForm.captcha"></el-input>
                            </el-form-item>
                            <img alt="验证码" style="cursor: pointer;float: right; margin-top: -50px;"
                                 src="http://192.168.0.29:8888/yuqing/service/verifyCode" class="imgSrc"
                                 v-on:click="replaceImg();">
                            <el-form-item>
                                <el-button class="login_button" type="primary" @click="onSubmit"
                                           @keyup.enter.native="keyUpLogin($event)" id="submit">登&nbsp;&nbsp;&nbsp;&nbsp;录
                                </el-button>
                            </el-form-item>

                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <h4 class="text-center">主办单位：北京卓越讯通科技有限公司</h4>

        </div>
    </div>
</template>

<script type="text/javascript">
    import $ from 'jquery';
    //import service from '../../vuex/module/login.js'
    export default {
        name: 'login',
        data () {
            return {
                ruleForm: {
                    userName: '',
                    passWord: '',
                    captcha: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            trimStr: function (str) {
                return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            },
            replaceImg: function () {
                $(".imgSrc").attr('src', 'http://192.168.0.29:8888/yuqing/service/verifyCode?'
                    + Math.random());
            },
            onSubmit() {
                var self = this;
                if (this.trimStr(self.ruleForm.userName) == '') {
                    alert('请输入用户名');
                    return;
                } else if (self.trimStr(self.ruleForm.passWord) == '') {
                    alert('请输入密码');
                    return;
                } else if (self.trimStr(self.ruleForm.captcha) == '') {
                    alert('请输入验证码');
                    return;
                } else {
                    $('#submit').html('登录中...');
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.0.29:8888/yuqing/login/login',
                        data: {
                            username: self.ruleForm.userName,
                            password: self.ruleForm.passWord,
                            captcha: self.ruleForm.captcha
                        },
                        success: function (data) {
                            window.location.href = "../module/index.html";
                        },
                        error: function (data) {
                            debugger;
                            $(".imgSrc").attr(
                                'src',
                                'http://192.168.0.29:8888/yuqing/service/verifyCode?'
                                + Math.random()
                            );
                            alert(data.responseJSON.message);
                            $('#submit').html('登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录');
                        }
                    });
                }
            },
            keyUpLogin(ev){
                if (ev.keyCode == 13) {
                    this.onSubmit();
                }
            }

        }
    }
</script>
