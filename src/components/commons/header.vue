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
                        <li class="signOut"><i class="el-icon-upload2"></i> <a href="../module/login.html">退出</a></li>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'header',
        data () {
            return {
                headerText: '安全生产與情分析平台'
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
        padding: 5px;
    }
    p{
        text-align: center;
    }
</style>
