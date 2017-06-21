<template>
    <div class="list-box">
        <div class="title-bj">最新{{type}}</div>
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
                        <!--<i class="el-icon-d-arrow-right"></i>  -->
                        <span v-html="item.title">{{item.title}}</span>
                    </el-col>
                    <el-col :span="6">{{item.source}}</el-col>
                    <el-col :span="4">{{item.pubTime}}</el-col>
                </el-row>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="moreList(articleData.type)">更多{{type}}</span>
        </div>
    </div>
</template>

<script>
    import typeUtil from '@/vuex/typeUtil'
    export default {
        props: ['articleData'],
        data () {
            return {}
        },
        computed: {
            type: function () {
                return typeUtil.typeUtil.articleType(this.articleData.type);
            }
        },
        methods: {
            changes: function (id) {
                debugger;
                window.open('../module/detail.html?id=' + id);
            },
            moreList: function (type) {
                var data = {};
                data.action = "showMoreArticle";
                data.data = type;
                this.$emit('data', data);
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "./scss/articleList.scss";
</style>
