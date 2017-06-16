<template>
    <div class="search-list">
        <div class="article" v-for="item in searchList" @click="showDetail(item)">
            <el-row :gutter="15">
                <el-col :span="3">
                    <img v-if="item.type=='News'" :src="newslogoSrc" width="80" height="67" style="margin-left: 23%;margin-top: 35%;">
                    <img v-if="item.type=='Weibo'" :src="weibologoSrc" width="80" height="67" style="margin-left: 23%;margin-top: 35%;">
                    <img v-if="item.type=='Bbs'" :src="bbslogoSrc" width="80" height="67" style="margin-left: 23%;margin-top: 35%;">
                    <img v-if="item.type=='Bar'" :src="barlogoSrc" width="80" height="67" style="margin-left: 23%;margin-top: 35%;">
                    <!--<div class="img"><img :src="logoSrc"></div>-->
                </el-col>
                <el-col :span="21">
                    <li class="title" v-html="item.title">{{item.title}}</li>
                    <li v-html="item.content">{{item.content}}</li>
                </el-col>
                <!--<el-col :span="3">-->
                    <!--<span class="cont">73.1</span>-->
                    <!--<span>影响力指数</span>-->
                <!--</el-col>-->
            </el-row>
        </div>
    </div>
</template>
<script>

    export default {
        props: ['searchList'],
        data () {
            return {
                weibologoSrc: '../../static/img/wb_new.svg',
                newslogoSrc: '../../static/img/news_new.svg',
                bbslogoSrc: '../../static/img/bbs_new.svg',
                barlogoSrc: '../../static/img/bar_new.svg',
//                logoSrc: '../../../static/img/an_newlogo.png'
            }
        },
        methods: {
            showDetail: function(article) {
                var data = {};
                data.action = "showArticleDetail";
                data.article = article;

                this.$emit("data", data);
            }
        }
    }
</script>
