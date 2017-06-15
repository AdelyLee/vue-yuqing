<template>
    <div id="login">
        <div class="header">
            <span style="margin-top: 5%; font-family: 隶书; font-size: 35px;">大数据分析舆情系统</span>
        </div>
        <div class="row cleaxfix">
            <div class="col-sm-7 column  col-sm-offset-1" style="margin-top: 5%;font-family: 隶书;">
                <span class="tit_span" size="5">欢迎登陆大数据分析舆情系统</span>
            </div>
            <div class="f_r">
                <div class="panel panel-primary" id="login-panel">
                    <div class="panel-heading">
                        <h4>用户登录</h4>
                    </div>
                    <div class="panel-body">
                        <el-form label-width="80px" :model="loginForm" :rules="rules" ref="loginForm"
                                 class="demo-loginForm">
                            <div class="login-message">{{loginMessage}}</div>
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" class="wid" prop="captcha">
                                <el-input v-model="loginForm.captcha"></el-input>
                            </el-form-item>
                            <img alt="验证码" style="cursor: pointer;float: right; margin-top: -50px;"
                                 :src="captchaImage" class="imgSrc" v-on:click="replaceImg">
                            <el-form-item>
                                <el-button class="login_button" type="primary" @click="loginSubmit(loginForm)"
                                           @keyup.enter.native="keyUpLogin($event)" id="submit">{{buttonText}}
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

<script type="text/ecmascript-6">
    import service from '../../vuex/module/login.js'

    import utils from '../../vuex/utils.js'

    export default {
        name: 'login',
        data () {
            return {
                buttonText: '登录',
                captchaImage: '',
                loginMessage: '',
                loginForm: {
                    username: '',
                    password: '',
                    captcha: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted () {
            this.checkBrowserSupport();
        },
        methods: {
            checkBrowserSupport: function () {
                // Check browser support
                if (typeof(Storage) !== "undefined") {
                    this.replaceImg();
                } else {
                    alert("抱歉！您的浏览器不支持当前系统，请更换浏览器．");
                }
            },
            replaceImg: function () {
                var self = this;
                service.action.getCaptcha().then(function (data) {
                    console.log(data);
                    self.captchaImage = data;
                });
            },
            loginSubmit(user) {
                // 如果验证成功调用
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        var self = this;
                        self.buttonText = '登录中...';
                        service.action.login(user.username, user.password, user.captcha).then(function (data) {
                            self.buttonText = '登录';
                            localStorage.setItem("token", data.token);
                            var config = utils.utils.getUserBaseKeyword();
                            localStorage.setItem("baseKeywords", config);
                            window.location.href = "../module/index.html";
                        }).catch(error => {
                            self.buttonText = '登录';
                            self.loginMessage = error.responseJSON.message;
                        });
                    }
                });
            },
            keyUpLogin(ev){
                if (ev.keyCode == 13) {
                    this.loginSubmit();
                }
            }

        }
    }
</script>
