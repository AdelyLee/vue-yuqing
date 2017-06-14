<template>
    <div id="menu" class="menu">
        <ul>
            <li><i class="fa fa-home fa-lg"></i> <i class="el-icon-menu"></i> <a href="../module/index.html">全景舆情</a>
            </li>
            <li><i class="fa fa-envelope fa-lg"></i> <i class="el-icon-edit"></i> <a href="../module/customize.html">定制化舆情监测</a>
            </li>
            <li><i class="fa fa-envelope fa-lg"></i> <i class="el-icon-warning"></i> <a
                href="../module/publicSentimentWarning.html">舆情预警</a></li>
            <li><i class="fa fa-user fa-lg"></i> <i class="el-icon-document"></i> <a
                href="../module/presentationList.html">决策报告</a></li>
            <li><i class="fa fa-cogs fa-lg"></i> <i class="el-icon-search"></i> <a href="../module/search.html">舆情搜索</a>
            </li>
            <li><i class="fa fa-power-off fa-lg"></i> <i class="el-icon-setting"></i> <a
                href="../module/baseKeywords.html">关键词设置</a></li>
            <li><i class="fa fa-power-off fa-lg"></i> <i class="el-icon-star-on"></i><a href="../module/contacts.html">联系人设置</a>
            </li>
            <li><i class="fa fa-power-off fa-lg"></i> <i class="el-icon-document"></i><a
                href="../module/setReport.html"> 报告设置</a></li>
        </ul>
    </div>
</template>


<script>
    import $ from 'jquery'

    export default {
        name: 'menu',
        data () {
            return {
                activeIndex: '1',
                logoSrc: '../../static/img/yhm.png',

            }
        },
        mounted () {
            this.selectMenu();
        },
        methods: {
            selectMenu: function () {
                var menu = $("#menu");
                $(menu).find("li").removeClass("active");
                var path = window.location.pathname;
                var linkItems = $(menu).find("li").find("a");
                $.each(linkItems, function (i, item) {
                    var href = $(item).attr("href");
                    if (href.indexOf(path) > -1) {
                        $(this).parent("li").addClass("active");
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .item_li {
        font-size: 16px !important;
        margin-right: 10px !important;
        font-weight: 600;
    }

    a {
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

    .el-dropdown-menu__item {
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

    .el-dropdown-menu__item:not(.is-disabled):hover {

    }

    .m_f10 {
        margin-left: -10px;
    }

    .el-dropdown-menu {
        min-height: 100px;
    }

    .menu {
        position: fixed;
        width: 12.5%;
        left: 0px;
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
        color: #fff;
        /*background: #3893fe;*/
        padding: 1em;
        border-bottom: 0.1em solid #6c7481;
        margin-top: 0.25em;
        /*border-left: 0.5em groove #9bca62;*/
        cursor: pointer;
        transition: 0.4s all;
    }

    ul > li > a {
        color: #fff;
    }

    i {
        padding-right: 0.5em;
    }

    .active {
        background: #14529d;
        /*border-left: 0.5em groove #fdce0f;*/
    }

    li:hover {
        background: #14529d;
        /*border-left: 0.5em groove #fdce0f;*/
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
