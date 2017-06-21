<template>
    <div id="menu" class="menu">
        <!--左侧导航-->
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
            <!--展开折叠开关-->
            <div class="menu-toggle" @click.prevent="collapse">
                <i class="iconfont icon-menufold" v-show="!collapsed"></i>
                <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
            </div>

            <!--菜单展开时的显示情况-->
            <el-menu v-show="!collapsed" default-active="0" @open="handleOpen" @close="handleClose">
                <template v-for="(item,index) in routes" v-if="item.menuShow">
                    <el-submenu v-if="!item.leaf" :index="index+''">
                        <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                        <el-menu-item v-for="term in item.children" :class="{active: term.isActive}" :key="term.path" :index="term.path"
                                      v-if="term.menuShow" @click="clickMenuItem(term)">
                            {{term.name}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length"
                                  :index="item.children[0].path" :class="{active: item.isActive}"
                                  class="el-submenu__title" @click="clickMenuItem(item)">
                        <i :class="item.iconCls"></i>{{item.children[0].name}}
                    </el-menu-item>
                </template>
            </el-menu>

            <!--菜单折叠后的显示情况-->
            <!--<ul v-show="collapsed" class="el-menu collapsed" ref="menuCollapsed">-->
                <!--<template v-for="(item,index) in routes" v-if="item.menuShow">-->
                    <!--<li v-if="!item.leaf" :index="index+''" style="position: relative;">-->
                        <!--<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)"-->
                             <!--@mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>-->
                        <!--<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"-->
                            <!--@mouseout="showMenu(index,false)">-->
                            <!--<li v-for="term in item.children" :key="term.path" v-if="term.menuShow" class="el-menu-item"-->
                                <!--style="padding-left: 40px;" :class="$route.path==term.path?'is-active':''"-->
                                <!--@click="$router.push(term.path)">{{term.name}}-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</li>-->
                    <!--<li v-else-if="item.leaf&&item.children&&item.children.length"-->
                        <!--class="el-menu-item el-submenu__title"-->
                        <!--:class="$route.path==item.children[0].path?'is-active':''"-->
                        <!--@click="$router.push(item.children[0].path)">-->
                        <!--<i :class="item.iconCls"></i>-->
                    <!--</li>-->
                <!--</template>-->
            <!--</ul>-->

        </aside>
    </div>
</template>

<script>
    var basePath = localStorage.getItem("basePath");
    export default {
        name: 'menu',
        data () {
            return {
                activeIndex: '1',
                collapsed: false,
                routes: [
                    {
                        path: basePath + '/module/index.html',
                        name: '全景舆情',
                        redirect:  basePath + '/module/index.html',
//                        leaf: true, // 只有一个节点
                        menuShow: true,
                        isActive: false,
                        iconCls: 'el-icon-menu', // 图标样式class
                        children: [
                            {path:  basePath + '/module/index.html', name: '舆情分析', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/focusNews.html', name: '焦点报道', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/latestNews.html', name: '最新新闻', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/latestBbs.html', name: '最新论坛', leaf:true, isActive: false,　menuShow: true},
//                            {path: '/module/latestWeibo.html', name: '最新微博', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/posNews.html', name: '正面新闻', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/negNews.html', name: '负面新闻', leaf:true, isActive: false,　menuShow: true}
                        ]
                    },
                    {
                        path:  basePath + '/module/customize.html',
                        name: '专题分析',
                        menuShow: true,
                        leaf: true, // 只有一个节点
                        isActive: false,
                        iconCls: 'el-icon-share', // 图标样式class
                        children: [
                            {path:  basePath + '/module/customize.html', name: '专题分析', menuShow: true}
                        ]
                    },
                    {
                        path: basePath + '/module/accident.html',
                        name: '事故分析',
                        menuShow: true,
                        leaf: true, // 只有一个节点
                        isActive: false,
                        iconCls: 'el-icon-star-on', // 图标样式class
                        children: [
                            {path: basePath + '/module/accident.html', name: '事故分析', menuShow: true}
                        ]
                    },
                    {
                        path:  basePath + '/module/publicSentimentWarning.html',
                        name: '舆情预警',
                        menuShow: true,
                        leaf: true, // 只有一个节点
                        isActive: false,
                        iconCls: 'el-icon-edit', // 图标样式class
                        children: [
                            {path:  basePath + '/module/publicSentimentWarning.html', name: '舆情预警', menuShow: true}
                        ]
                    },
                    {
                        path:  basePath + '/module/presentationList.html',
                        name: '舆情报告',
                        menuShow: true,
                        leaf: true, // 只有一个节点
                        isActive: false,
                        iconCls: 'el-icon-document',
                        children: [
                            {path:  basePath + '/module/presentationList.html', name: '舆情报告', menuShow: true}
                        ]
                    },
                    {
                        path:  basePath + '/module/search.html',
                        name: '舆情搜索',
                        menuShow: true,
                        leaf: true, // 只有一个节点
                        isActive: false,
                        iconCls: 'el-icon-search',
                        children: [
                            {path:  basePath + '/module/search.html', name: '舆情搜索', menuShow: true},
                        ]
                    },
                    {
                        path: '/',
                        name: '后台管理',
                        menuShow: true,
                        isActive: false,
                        iconCls: 'el-icon-setting',
                        children: [
                            {path:  basePath + '/module/baseKeywords.html', name: '关键词设置', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/focusKeywords.html', name: '焦点关键词设置', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/contacts.html', name: '联系人设置', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/monthlyReportConfig.html', name: '月报设置', leaf:true, isActive: false,　menuShow: true},
                            {path:  basePath + '/module/weeklyReportConfig.html', name: '周报设置', leaf:true, isActive: false,　menuShow: true},
                        ]
                    }
                ]
            }
        },
        mounted () {
            this.selectMenu();
        },
        methods: {
            selectMenu: function () {
                var path = window.location.pathname;
                this.routes.forEach(function (item) {
                    if (item.leaf && item.path.indexOf(path) > -1) {
                        item.isActive = true;
                    } else if (!item.leaf && item.children.length > 0){
                        item.children.forEach(function(obj){
                            if (obj.leaf && obj.path.indexOf(path) > -1) {
                                obj.isActive = true;
                                item.isActive = true;
                            }
                        });
                    }
                });
            },
            handleOpen() {
                //console.log('handleopen');
            },
            handleClose() {
                //console.log('handleclose');
            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            clickMenuItem: function (item) {
                if (item.leaf) {
                    window.location.href = item.path;
                }
            }
        }
    }
</script>
<style>
    .el-menu-item:hover{
        background-color: #6eb4fc;
    }
    .el-submenu .el-submenu__title {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
    }
    .el-submenu .el-submenu__title:hover {
        background-color: #6eb4fc;
    }

    #menu aside .active {
        background-color: #6eb4fc;
    }
</style>
<style scoped>
    .icon-setting1{
        font-size: 16px !important;
        color: #ffffff !important;
    }
    .icon-books{
        width:10%;
        height: 10%;
    }
    .item_li {
        font-size: 16px !important;
        margin-right: 10px !important;
        font-weight: 600;
    }

    .el-menu {
        background-color: #4d637b;
    }
    .el-submenu__title {
        color: #fff !important;
        font-size: 16px;
        font-weight: 600;
    }
    .el-submenu__title:hover {
        background-color: #6eb4fc;
    }
    .el-submenu .el-menu-item {
        background-color: #4d637b
    }
    .el-submenu .el-menu-item:hover {
        background-color: #6eb4fc
    }
    .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,
    .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
        background-color: #6eb4fc;
        color: #fff;
    }

    .el-menu .iconfont{
        vertical-align: baseline;
        margin-right: 6px;
    }

    .menu {
        position: fixed;
        width: 12.5%;
        left: 0;
        height: 100%;
        background-color: #4d637b;
        top: 55px;
    }

    ul {
        margin: -0.2em auto;
        list-style: none;
        padding: 0;
    }

    ul > li {
        color: #fff !important;
        border-bottom: 0.15em solid #6c7481;
        cursor: pointer;
        transition: 0.4s all;
    }

    li:hover {
        background: #6eb4fc;
    }

    @media screen and (min-width: 1360px) and (max-width: 1366px) {
        ul > li > a {
            font-size: 12px;
        }
    }

    @media screen and (min-width: 1280px) and (max-width: 1281px) {
        ul > li > a {
            font-size: 12px;
        }
    }
</style>
