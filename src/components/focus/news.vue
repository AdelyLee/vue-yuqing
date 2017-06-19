<template>
    <div class="list-box">
        <div class="title-bj">最新报道</div>
        <ul class="article-list" v-for="item in articleData.articles">
            <li :id="item.id" @click="changes(item.id)">
                <el-row :gutter="15">
                    <el-col :span="14">
                        <i class="el-icon-d-arrow-right"></i>
                        <!--<span v-html="item.content" v-if="item.title==''" >{{item.content}}</span>-->
                        <span v-html="item.title">{{item.title}}</span>
                    </el-col>
                    <el-col :span="6">{{item.source}}</el-col>
                    <el-col :span="4">{{item.pubTime}}</el-col>
                </el-row>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="moreList()">更多{{type}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['articleData'],
        data () {
            return {}
        },
        computed: {

        },
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
