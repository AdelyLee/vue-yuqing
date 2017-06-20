<template>
    <div class="list-box">
        <div class="title-bj">{{articleData.emotion}}{{type}}</div>
        <ul class="article-list" v-for="item in articleData.articles">
            <li :id="item.id" @click="changes(item.id)">
                <el-row :gutter="15">
                    <el-col :span="10"><i class="el-icon-d-arrow-right"></i>  <span v-html="item.title">{{item.title}}</span></el-col>
                    <el-col :span = "4">{{item.emotion}}</el-col>
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
    import typeUtil from '../../vuex/typeUtil'
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
