<template>
    <div class="menu">
        <el-menu theme="white" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect">
            <el-menu-item index="1" class="item_li"><a href="../module/index.html" target = "_blank">首页</a></el-menu-item>
            <!--<el-menu-item index="3" class="item_li"><a href="../module/enterpriseInspect.html" target="_blank">企业监测</a></el-menu-item>-->
            <el-menu-item index="4" class="item_li"><a href="../module/customize.html">定制化舆情监测</a></el-menu-item>
            <el-menu-item index="6" class="item_li"><a href="../module/presentationList.html">决策报告</a></el-menu-item>
            <el-menu-item index="7" class="item_li"><a href="../module/search.html">舆情搜索</a></el-menu-item>
            <!--<el-menu-item index="8" class="item_li"><a href="../module/specialReport.html" target = "_blank">专报</a></el-menu-item>-->
            <!--<el-menu-item index="9" class="item_li"><a href="../module/baseKeywords.html" target = "_blank">系统关键词</a></el-menu-item>-->
            <!--<el-menu-item index="9" class="item_li"><a href="../module/currentSpecialReport.html" target = "_blank">当前专报</a></el-menu-item>-->
            <el-dropdown class="management">
                <span class="el-dropdown-link">
                 <img :src="logoSrc" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item > <a href="../module/baseKeywords.html">关键词设置</a>
                    <el-dropdown-item class="m_f10"><a href="<%=path%>/admin/user/index.html">后台管理</a></el-dropdown-item>
                    <el-dropdown-item class="m_f10"><a href="<%=path%>/login/logout.do">退出</a></el-dropdown-item></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </el-menu>
    </div>
</template>


<script>
    export default {
        name: 'menu',
        data () {
            return {
                activeIndex: '1',
                logoSrc: '../../static/img/yhm.png',

            }
        },
        methods: {
            // TODO: 根据页面的url来确定所激活的菜单
            handleSelect (key, keyPath) {
                console.log(key, keyPath)
            },
//            establish: function (){
//                $('.model').show();
//            },
        }
    }
</script>
<style scoped>
    .item_li{
        font-size: 16px!important;
        margin-right: 10px!important;
        font-weight: 600;
    }
    a{
        text-decoration: none;
    }
    .el-menu {
        background-color: #ffffff;
    }
    .management {
        float: right;
        top: 9px;
        right: 30px;
    }
    .el-dropdown-menu__item{
        width: 90px;
        /*margin: 5px;*/
        height: 30px;
        border-bottom: 1px solid #ccc;
        list-style: none;
        line-height: 36px;
        padding: 0 10px;
        margin: 0;
        cursor: pointer;
    }
    .el-dropdown-menu__item:not(.is-disabled):hover{

    }
    .m_f10{
        margin-left: -10px;
    }
    .el-dropdown-menu{
        min-height:100px;
    }
</style>
