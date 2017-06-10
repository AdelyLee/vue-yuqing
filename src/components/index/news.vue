<template>
    <div class="list-box">
        <div class="clearfix table-top"><span class="news-title">最新{{title}}</span></div>
        <ul class="article-list" v-for="item in newsList.slice(0, 5)">
            <li :id="item.id" @click="change(item.id)">
                <el-row :gutter="15">
                    <el-col :span="17">{{item.title}}</el-col>
                    <el-col :span="5">{{item.source}}</el-col>
                    <el-col :span="2">{{item.pubTime}}</el-col>
                </el-row>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="target(type)">更多{{title}}</span></div>
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
            change: function (id) {
                window.open('../module/detail.html?id=' + id);
            },
            target: function (type) {
                window.open('../module/articleList.html?type=' + type);
            }
        }
    }
</script>
