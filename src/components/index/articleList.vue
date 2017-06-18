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
                                            <!--<img v-if="item.type=='news'" :src="newslogoSrc">
                                             <img v-if="item.type=='weibo'" :src="weibologoSrc">
                                            <img v-if="item.type=='bbs'" :src="bbslogoSrc">
                                            <img v-if="item.type=='bar'" :src="barlogoSrc">
                                            -->
                                            <img v-if="item.type=='news'" :src="newslogoSrc" width="60" height="60">
                                            <img v-if="item.type=='weibo'" :src="weibologoSrc" width="60" height="60">
                                            <img v-if="item.type=='bbs'" :src="bbslogoSrc" width="60" height="60">
                                            <img v-if="item.type=='bar'" :src="barlogoSrc" width="60" height="60">
                                            <img v-if="item.type=='comments'" :src="pllogoSrc" width="60" height="60">
                                        </el-col>
                                        <el-col :span="20">
                                            <a class="a_font"><span v-html="item.title">{{item.title}}</span></a>
                                        </el-col>
                                        <el-col :span="2">
                                            <span v-if="item.nlp.sentiment.label=='正面'" class="positive">{{item.nlp.sentiment.label}}</span>
                                            <span v-if="item.nlp.sentiment.label=='负面'" class="negative">{{item.nlp.sentiment.label}}</span>
                                            <span v-if="item.nlp.sentiment.label=='中性'" class="neutral">{{item.nlp.sentiment.label}}</span>
                                        </el-col>
                                        <el-col :span="22" class="news_m">
                                            <span v-html="item.content">{{item.content}}</span>
                                        </el-col>
                                    </el-row>
                                </div>
                                <el-row :gutter="1" class="l_bottom">
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
                                    <el-col :span="8">
                                        <span v-if = "item.type!='comments'"><span class="number">评论数</span>：{{item.commentNum}}</span>
                                        <span v-if = "item.type=='comments'"><span class="number">地区</span>：{{item.area}}</span>
                                    </el-col>
                                </el-row>
                                <!--<el-row class="key">-->
                                    <!--<el-col :span="24">-->
                                        <!--<span v-if="item.nlp.sentiment.label=='正面'" class="positive">{{item.nlp.sentiment.label}}</span>-->
                                        <!--<span v-if="item.nlp.sentiment.label=='负面'" class="negative">{{item.nlp.sentiment.label}}</span>-->
                                        <!--<span v-if="item.nlp.sentiment.label=='中性'" class="neutral">{{item.nlp.sentiment.label}}</span>-->
                                    <!--</el-col>-->
                                <!--</el-row>-->
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
                weibologoSrc: '../../static/img/wb_new.svg',
                newslogoSrc: '../../static/img/news_new.svg',
                bbslogoSrc: '../../static/img/bbs_new.svg',
                barlogoSrc: '../../static/img/bar_new.svg',
                pllogoSrc: '../../static/img/pl.svg',
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
            }
        }
    }

</script>
