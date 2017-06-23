<template>
    <div class="search-list">
        <div class="article" v-for="item in searchList" @click="showDetail(item)">
            <el-row :gutter="15">
                <el-col :span="2">
                    <div v-if="item.type=='news'" class="big-article-image newslogoSrc"></div>
                    <div v-if="item.type=='weibo'" class="big-article-image weibologoSrc"></div>
                    <div v-if="item.type=='bbs'" class="big-article-image bbslogoSrc"></div>
                    <div v-if="item.type=='bar'" class="big-article-image barlogoSrc"></div>
                    <div v-if="item.type=='comments'" class="big-article-image pllogoSrc"></div>
                </el-col>
                <el-col :span="20" class="res">
                    <li class="title" v-html="item.title">{{item.title}}</li>
                    <li v-html="item.content">{{item.content}}</li>
                </el-col>
                <el-col :span="2" style="margin-top: 10px;">
                    <span v-if="item.nlp.sentiment.label=='正面'" class="positive">{{item.nlp.sentiment.label}}</span>
                    <span v-if="item.nlp.sentiment.label=='负面'" class="negative">{{item.nlp.sentiment.label}}</span>
                    <span v-if="item.nlp.sentiment.label=='中性'" class="neutral">{{item.nlp.sentiment.label}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="l_bottom">
                <el-col :span="8">
                        <span v-if="item.type=='weibo' || item.type=='bbs' || item.type=='bar'|| item.type == 'comments'">
                            <span class="sours">作者</span>：{{item.author}}
                         </span>
                    <span v-else-if="item.type=='news'">
                         <span class="sours">来源</span>：{{item.site}}
                         </span>
                </el-col>
                <el-col :span="8">
                    <span><span class="time">发布时间</span>：{{item.pubTime}}</span>
                </el-col>
                <!--<el-col :span="8">-->
                    <!--<span v-if = "item.type!='comments'"><span class="number">评论数</span>：{{item.commentNum}}</span>-->
                    <!--<span v-if = "item.type=='comments'"><span class="number">地区</span>：{{item.area}}</span>-->
                <!--</el-col>-->
            </el-row>
        </div>
    </div>
</template>
<script>

    export default {
        props: ['searchList'],
        data () {
            return {}
        },
        methods: {
            showDetail: function (article) {
                var data = {};
                data.action = "showArticleDetail";
                data.article = article;

                this.$emit("data", data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../index/scss/articleList.scss";
</style>
