<template>
    <div class="menu">
        <el-menu theme="white" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect">
            <!--<div class="header-logo">-->
            <!--</div>-->
            <!--<div class="header-text">-->
            <!--安全生产與请分析平台-->
            <!--</div>-->
            <el-menu-item index="1" class="item_li"><a href="../module/index.html">首页</a></el-menu-item>
            <el-submenu index="2" class="item_li">
                <template slot="title">重特大事故监测及分析</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" class="item_li"><a href="../module/enterpriseInspect.html" target="_blank">企业监测</a></el-menu-item>
            <el-menu-item index="4" class="item_li"><a href="../module/customize.html">定制化舆情监测</a></el-menu-item>
            <el-menu-item index="5" class="item_li"><a href="../module/decisionReport.html">决策报告</a></el-menu-item>
            <el-menu-item index="6" class="item_li"><a href="../module/sentimentSearch.html">舆情搜索</a></el-menu-item>
            <!--<el-menu-item index="3" class="item_li"><a href="../module/about.html" target="_blank">关于</a></el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'menu',
        data () {
            return {
                activeIndex: '1'
            }
        },
        methods: {
            handleSelect (key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>
<style scoped>
    .header-text {
        line-height: 60px;
        font-size: 30px;
        padding-left: 80px;
    }
    .item_li{
        font-size: 16px!important;
        margin-top: 5px!important;
        margin-bottom: 10px!important;
        margin-right: 20px!important;
        font-weight: 600;
    }
</style>
