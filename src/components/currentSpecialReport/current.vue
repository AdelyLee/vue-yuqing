/**
将向相同的模块改为一个模块,主要是以数据来驱动.
*/
<template>
    <div class="list-box">
        <div class="clearfix table-top"><span class="news-title">最新{{title}}</span></div>
        <ul class="article-list">
            <li v-for="item in checkedItems" :title="item.title" :id="item.id" @click="change(item.id)">
                <a target="blank">
                    <el-col :span="12">
                        <span>{{item.title.length > 13 ? item.title.substr(0, 13) + '...' : item.title}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>{{item.site}}</span>
                    </el-col>
                    <el-col :span="6">
                        <span>{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                    </el-col>
                </a>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="target(type)">更多{{title}}</span></div>
    </div>
</template>

<script>
    import service from '../../vuex/module/currentSpecialReport.js'
    export default {
        data () {
            return {
                title:"",
                type:"",
//              url: 'http://localhost:10000/news/?page=1&limit=10&sortBy=pubTime&direction=1',
                checkedItems: [],


            }
        },
        mounted () {
            this.getNewsCurrentList();
//            setTimeout(function(){
//                this.title=this.resetArticleTypeName(this.title);
//            },10000)

        },
        methods: {
            getNewsCurrentList:function() {
                var self = this;
                service.actions.getNewsCurrentList().then(function (data) {
                    console.log(data);
                    for(var i=0;i<5;i++){
                        self.checkedItems.push(data.content[i]);
                    }
                    self.type=data.content[0].type
                    self.title=self.resetArticleTypeName(data.content[0].type);
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            change: function (id) {
                window.open('https://www.baidu.com#id=' + id)
            },
            target: function (type) {
                window.open('../../module/articleList.html?type='+type)
            },
            resetArticleTypeName: function (source) {
                var target = '';
                switch (source) {
                    case 'News':
                        target = '新闻';
                        break;
                    case 'Weibo':
                        target = '微博';
                        break;
                    case 'Bbs':
                        target = '论坛';
                        break;
                    case 'Bar':
                        target = '贴吧';
                        break;
                    case 'Comment':
                        target = '评论';
                        break;
                }

                return target;
            },


        },

        watch: {
            checkedItems: function (val, oldVal) {
//                console.log(this.checkedItems)
               console.log('new: %s, old: %s', val, oldVal)
            }
        },

    }


</script>
