<template>
    <div v-loading="yujingDetailsList.loading2"
         element-loading-text="拼命加载中">
        <table align="center" border="0" cellspacing="0" cellpadding="0" class="warnTable">
            <tbody>
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0px;">
                        <tbody>
                        <tr>
                            <td class="list-header">
                                {{yujingDetailsList.timeChange}},您的预警方案<span
                                style="color:#20A0FF">[{{yujingDetailsList.subjectName}}]</span>,关键字:{{yujingDetailsList.keyWord}},新增数据<span
                                style="color:#FF4949">{{yujingDetailsList.totalCount}}</span>条
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a target="_blank" v-for="item in yujingDetailsList.items" @click="getNewPage(item.id)">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                           class="line warn-details"
                                           title="点击查看详情">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <img src="../../../static/img/wb_new.svg" alt="暂无图片" class="img"
                                                     v-if="item.type=='微博'">
                                                <img src="../../../static/img/bbs_new.svg" alt="暂无图片" class="img"
                                                     v-if="item.type=='论坛'">
                                                <img src="../../../static/img/news_new.svg" alt="暂无图片" class="img"
                                                     v-if="item.type=='新闻'">
                                                <img src="../../../static/img/bar_new.svg" alt="暂无图片" class="img"
                                                     v-if="item.type=='贴吧'">
                                            </td>
                                            <td style="text-align:left;">
                                                <h3 class="newsName"
                                                    v-if="item.type=='微博'">{{item.author}}</h3>
                                                <p class="newsDate">
                                                    <span class="ml-10">{{item.pubTime}}</span>
                                                    <span class="ml-30">来自：{{item.source}}</span>
                                                    <span class="ml-30">载体：{{item.type}}</span>
                                                </p>
                                            </td>
                                            <td class="emotion-box">
                                                <span v-if="item.emotion=='正面'" class="positive">{{item.emotion}}</span>
                                                <span v-if="item.emotion=='负面'" class="negative">{{item.emotion}}</span>
                                                <span v-if="item.emotion=='中性'" class="neutral">{{item.emotion}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" class="title" v-html="item.title"
                                                v-if="item.type!='微博'"></td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" class="content" v-html="item.content">
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    var basePath = localStorage.getItem('basePath');
    export default {
        props: ['yujingDetailsList'],
        data () {
            return {}
        },
        methods: {
            getNewPage: function (id) {
                window.open(basePath + '/module/detail.html?id=' + id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ml-10 {
        margin-left: 10px;
    }

    .ml-30 {
        margin-left: 30px;
    }

    .newsName {
        display: inline-block;
        color: #1F2D3D;
        margin-left: 10px;
    }

    .newsDate {
        font-size: 14px;
        color: #475669;
        display: inline-block;
    }

    .emotion-box {
        width: 60px;
        height: 30px;
    }

    .warn-details {
        padding-bottom: 10px;
        margin-top: 10px;
        text-decoration: none;
        border-bottom: 1px solid #324057;
        cursor: pointer;
    }

    .list-header {
        font-size: 18px;
        font-weight: 600;
        border-bottom: 2px dashed #475669;
        padding: 10px;
    }

    .warnTable {
        padding: 20px;
        width: 800px;
        border: solid 1px #ccc;
        background-color: #fff;
        color: #444;
    }

    .img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }

    .negative {
        color: #d74e67;
        font-weight: 600;
        border-radius: 10px;
        border: 1px solid #d74e67;
        padding: 3px;
    }

    .positive {
        color: #0092ff;
        font-weight: 600;
        border: 1px solid #0092ff;
        border-radius: 10px;
        padding: 3px;
    }

    .neutral {
        color: #eba954;
        font-weight: 600;
        border-radius: 10px;
        border: 1px solid #eba954;
        padding: 3px;
    }

    .title {
        color: #475669;
        font-weight: 600;
    }

    .content {
        color: #475669;
        background: #F9FAFC;
        padding: 5px;
    }
</style>
