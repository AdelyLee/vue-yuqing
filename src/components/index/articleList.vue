<template>
    <div id="article">
        <el-row :gutter="5" class="list">
            <el-col class="el_coldate">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <el-row class="content" id="list">
                        <ul v-if="type =='news'" class="ul_p">
                            <li class="l_style" v-for="item in articleList" :key="item.id" :title="item.title"
                                :id="item.id" @click="change(item.id)">
                                <a target="blank">
                                    <el-col :span="1">
                                        <img :src="logoSrc">
                                    </el-col>
                                    <el-row :gutter="1" class="news_p">
                                        <el-col :span="12">
                                            <a class="a_font"><span>{{item.title}}</span></a>
                                        </el-col>
                                        <el-col :span="20" class="news_m">
                                            <span>{{item.content.length > 100 ? item.content.substr(0, 100) + '...' : item.content}}</span>
                                        </el-col>
                                    </el-row>
                                </a>
                                <a target="blank" class="a_position">
                                    <el-row :gutter="1" class="l_bottom">
                                        <el-col :span="8">
                                            <span v-html=""><span class="sours">来源</span>：{{item.site}}</span>
                                        </el-col>
                                        <el-col :span="8">
                                            <span><span class="time">发布时间</span>：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                                        </el-col>
                                        <el-col :span="8">
                                            <span><span class="number">评论数</span>：{{item.commentNum}}</span>
                                        </el-col>
                                    </el-row>
                                </a>
                            </li>
                        </ul>
                        <ul v-else-if="type =='bar'">
                            <li class="l_style" v-for="item in articleList" :key="item.id" :title="item.title"
                                :id="item.id"
                                @click="change(item.id)">
                                <a target="blank">
                                    <el-col :span="4">
                                        <img :src='item.photo'>
                                        <a><span class="author">{{item.author}}</span></a>
                                        <span class="bar_title">{{item.title}}</span>
                                    </el-col>
                                    <el-row :gutter="1">
                                        <el-col :span="12">
                                            <a class="a_font"><span>{{item.title}}</span></a>
                                        </el-col>

                                    </el-row>
                                </a>
                                <a target="blank" class="a_position">
                                    <el-row :gutter="1" class="l_bottom">

                                        <el-col :span="8">
                                            <span v-html="">[来源]：{{item.site}}</span>
                                        </el-col>
                                        <el-col :span="8">
                                            <span>[发布时间]：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                                        </el-col>
                                        <el-col :span="8">
                                            <span>[评论数]：{{item.commentNum}}</span>
                                        </el-col>
                                    </el-row>
                                </a>
                            </li>
                        </ul>
                        <ul v-if="type =='bbs'">
                            <li class="l_style" v-for="item in articleList" :key="item.id" :title="item.title"
                                :id="item.id"
                                @click="change(item.id)">
                                <a target="blank">
                                    <el-col :span="1">
                                        <img :src="logoSrc">
                                    </el-col>
                                    <el-row :gutter="1">
                                        <el-col :span="12">
                                            <a class="a_font">{{item.title.length > 13 ? item.title.substr(0, 13) +
                                                '...' : item.title}}</a>
                                        </el-col>
                                        <el-col :span="20" class="news_m">
                                            <span>{{item.content.length > 100 ? item.content.substr(0, 100) + '...' : item.content}}</span>
                                        </el-col>
                                    </el-row>
                                </a>
                                <a target="blank" class="a_position">
                                    <el-row :gutter="1" class="l_bottom">

                                        <el-col :span="8">
                                            <span>[作者]：{{item.author}}</span>
                                        </el-col>
                                        <el-col :span="8">
                                            <span v-html="">[来源]：{{item.channel}}</span>
                                        </el-col>
                                        <el-col :span="8">
                                            <span>[发布时间]：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                                        </el-col>

                                    </el-row>
                                </a>
                            </li>
                        </ul>
                    </el-row>
                    <list-page v-if="articleList" :pager="pager" @data="getPager"></list-page>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Paging from '@/components/commons/paging';
    export default {
        name: 'articleList',
        props: ['type', 'articleList', 'pager'],
        data () {
            return {
                logoSrc: '../../static/img/WB_logo.png',
            }
        },
        components: {
            'common-header': Header,
            'list-page': Paging
        },
        mounted () {
        },
        methods: {
            getPager (pager) {
                var data = {};
                data.action = "clickArticleListPager";
                data.articleListPager = pager;

                this.$emit("data", data);
            },
            change: function (id) {
                window.open('../../module/detail.html?id=' + id)
            },
        },
        watch: {
            type: function (val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
            },
            articleList: function (val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
            },
            moreFormVisible: function (val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
            }
        },
    }

</script>
