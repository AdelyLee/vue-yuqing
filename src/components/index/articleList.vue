<template>
    <div id="article">
        <el-row :gutter="5" class="list">
            <el-col class="el_coldate">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <el-row class="content" id="list">
                        <ul class="ul_p">
                            <li class="l_style" v-for="item in articles" :id="item.id">
                                <div @click="showDetail(item.id)">
                                    <el-row :gutter="1">
                                        <el-col :span="2">
                                            <img v-if="item.type=='news'" :src="logoSrc">
                                        </el-col>
                                        <el-col :span="22">
                                            <a class="a_font"><span v-html="item.title">{{item.title}}</span></a>
                                        </el-col>
                                        <el-col :span="22" class="news_m">
                                            <span v-html="item.content">{{item.content}}</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <el-row :gutter="1" class="l_bottom">
                                    <el-col :span="8">
                                        <span v-if="item.type=='weibo'">
                                            <span class="sours">作者</span>：{{item.author}}
                                        </span>
                                        <span v-else="item.type!='weibo'">
                                            <span class="sours">来源</span>：{{item.site}}
                                        </span>
                                    </el-col>
                                    <el-col :span="8">
                                        <span><span class="time">发布时间</span>：{{item.pubTime}}</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <span><span class="number">评论数</span>：{{item.commentNum}}</span>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </el-row>
                    <list-page v-if="articles" :pager="pager" @data="getPager"></list-page>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Paging from '@/components/commons/paging';

    export default {
        name: 'articles',
        props: ['type', 'articles', 'pager'],
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
            showDetail: function (id) {
                window.open('../../module/detail.html?id=' + id)
            },
        }
    }

</script>
