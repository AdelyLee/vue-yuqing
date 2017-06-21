<template>
    <div class="list-box">
        <div class="title-bj">最新报道</div>
        <ul class="article-list" v-for="item in articleData.articles">
            <li :id="item.id" @click="changes(item.id)">
                <el-row :gutter="15">
                    <el-col :span="14">
                        <el-col :span="2">
                            <div v-if="item.type=='news'" class="small-article-image newslogoSrc"></div>
                            <div v-if="item.type=='weibo'" class="small-article-image weibologoSrc"></div>
                            <div v-if="item.type=='bbs'" class="small-article-image bbslogoSrc"></div>
                            <div v-if="item.type=='bar'" class="small-article-image barlogoSrc"></div>
                            <div v-if="item.type=='comments'" class="small-article-image pllogoSrc"></div>
                        </el-col>
                        <span v-html="item.title">{{item.title}}</span>
                    </el-col>
                    <el-col :span="6">{{item.source}}</el-col>
                    <el-col :span="4">{{item.pubTime}}</el-col>
                </el-row>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="moreList()">更多</span>
        </div>
    </div>
</template>

<script>
    import typeUtil from '../../vuex/typeUtil'
    export default {
        props: ['articleData'],
        data () {
            return {}
        },
        computed: {},
        methods: {
            changes: function (id) {
                window.open('../module/detail.html?id=' + id);
            },
            moreList: function () {
                var data = {};
                data.action = "showMoreArticle";
                data.data = "article";
                this.$emit('data', data);
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../index/scss/articleList.scss";
</style>
