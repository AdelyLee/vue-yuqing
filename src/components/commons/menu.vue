<template>
    <div class="menu">
        <el-menu theme="white" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect">
            <el-menu-item index="1" class="item_li"><a href="../module/index.html" target = "_blank">首页</a></el-menu-item>
            <el-submenu index="2" class="item_li">
                <template slot="title">重特大事故监测及分析</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" class="item_li"><a href="../module/enterpriseInspect.html" target="_blank">企业监测</a></el-menu-item>
            <el-menu-item index="4" class="item_li"><a href="../module/customize.html">定制化舆情监测</a></el-menu-item>
            <el-menu-item index="5" class="item_li"><a href="../module/decisionReport.html">决策报告</a></el-menu-item>
            <el-menu-item index="6" class="item_li"><a href="../module/presentationList.html">决策报告列表</a></el-menu-item>
            <el-menu-item index="7" class="item_li"><a href="../module/sentimentSearch.html">舆情搜索</a></el-menu-item>
            <el-menu-item index="8" class="item_li"><a href="../module/specialReport.html" target = "_blank">专报</a></el-menu-item>
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
            // TODO: 根据页面的url来确定所激活的菜单
            handleSelect (key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>
<style scoped>
    .item_li{
        font-size: 16px!important;
        margin-right: 20px!important;
        font-weight: 600;
    }
    a{
        text-decoration: none;
    }
    .el-menu {
        background-color: #ffffff;
    }
</style>
