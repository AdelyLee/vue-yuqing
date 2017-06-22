<template>
    <div id="login">
        <!--<div class="header">-->
            <!--<span style="margin-top: 5%; font-family: 隶书; font-size: 35px;">大数据分析舆情系统</span>-->
        <!--</div>-->
        <div class="row cleaxfix">
            <div class="col-sm-7 column  col-sm-offset-1" style="margin-top: 5px;">
                <span class="tit_span" size="5">安徽煤监局舆情系统</span>
            </div>
            <div class="f_r" style="margin-top:9%">
                <div class="panel panel-primary" id="login-panel">
                    <div class="login_font">
                        登 录
                    </div>
                    <div class="panel-body">
                        <el-form  :model="loginForm" :rules="rules" ref="loginForm"
                                 class="demo-loginForm form_p">
                            <div class="login-message">{{loginMessage}}</div>
                            <el-form-item prop="username">
                                <span class="i_con"></span><span style="width:10%;">用户名:</span>
                                <el-input v-model="loginForm.username" style="width:61%;"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <span class="i_con2"></span><span style="width:10%;">密 码:</span>
                                <el-input type="password" v-model="loginForm.password" style="width:61%;margin-left: 3%;"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="验证码" class="wid" prop="captcha">-->
                                <!--<el-input v-model="loginForm.captcha"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<img alt="验证码" style="cursor: pointer;float: right; margin-top: -50px;"-->
                                 <!--:src="captchaImage" class="imgSrc" v-on:click="replaceImg">-->
                            <!--<el-form-item>-->
                                <el-button class="login_button"  @click="loginSubmit(loginForm)"
                                           @keyup.enter.native="keyUpLogin($event)" id="submit" style="width:98%;margin-left:-2%;background-color: #00A0EA;color:#ffffff">{{buttonText}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <h6 class="text-center">技术支持：北京卓越讯通科技有限公司</h6>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import service from '@/vuex/module/login.js'
    import utils from '@/vuex/utils.js'

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
            this.replaceImg();
        },
        methods: {
            checkBrowserSupport: function () {
                // Check browser support
                if (typeof(Storage) === "undefined") {
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
                            localStorage.setItem("user", data.user);
                            var config = utils.utils.getUserBaseKeyword();
                            localStorage.setItem("baseKeywords", config);

                            var basePath = utils.utils.getBasePath();
                            localStorage.setItem("basePath", basePath);

                            if (typeof(Storage) !== "undefined") {
                                window.location.href = basePath + "/module/index.html";
                            } else {
                                alert("抱歉！您的浏览器不支持当前系统，请更换浏览器．");
                            }
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
