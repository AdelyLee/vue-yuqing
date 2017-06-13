<template>
    <div class="list-box">
        <ul class="article-list" v-for="item in newsList.slice(0, 5)">
            <li :id="item.id" @click="changes(item.id)">
                <el-row :gutter="15">
                    <el-col :span="17">{{item.title}}</el-col>
                    <el-col :span="5">{{item.source}}</el-col>
                    <el-col :span="2">{{item.pubTime}}</el-col>
                </el-row>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="moreList(item.type)">更多{{title}}</span></div>
    </div>
</template>

<script>
    export default {
        props: ['newsList'],
        data () {
            return {
                title: '新闻',
                type:'News',
                items: []
            }
        },
        mounted () {
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
