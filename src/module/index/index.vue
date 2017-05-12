<template>
    <div id="index">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;">重点行业领域</span>
                    </div>
                    <div class="card-body">
                        <check-box @data="getCheckedBox"></check-box>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="21">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 20px;"></span>
                    </div>
                    <div class="card-body">
                        <el-row :gutter="15">
                            <el-col :span="24" class="lists">
                                <news-list :type="newsUrl" :checkedItems="checkedItems"></news-list>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <emotion-chart></emotion-chart>
                            </el-col>
                            <el-col :span="16">
                                <type-category-trend-chart></type-category-trend-chart>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <type-category-chart></type-category-chart>
                            </el-col>
                            <el-col :span="16" class="lists">
                                <weibo-list :type="weiboUrl" :checkedItems="checkedItems"></weibo-list>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="24" class="lists">
                                <bbs-list :type="bbsUrl" :checkedItems="checkedItems"></bbs-list>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/commons/header';
    import News from '@/components/index/news';
    import CheckBox from '@/components/index/checkbox';
    import EmotionChart from '@/components/index/emotion-chart';
    import TypeCategoryChart from '@/components/index/type-category-chart';
    import TypeCategoryTrendChart from '@/components/index/type-category-trend-chart';

    export default {
        name: 'index',
        data () {
            return {
                newsUrl: 'news',
                weiboUrl: 'weibo',
                bbsUrl: 'bbs',
                checkedItems: []
            }
        },
        components: {
            'common-header': Header,
            'news-list': News,
            'check-box': CheckBox,
            'weibo-list': News,
            'bbs-list': News,
            'emotion-chart': EmotionChart,
            'type-category-chart': TypeCategoryChart,
            'type-category-trend-chart': TypeCategoryTrendChart
        },
        mounted () {
            this.checkedItems.push("煤矿")
        },
        methods: {
            getCheckedBox(items) {
                var self = this;
                self.checkedItems = [];
                items.forEach(function (item, index) {
                    self.checkedItems.push(item.text);
                });
            }
        }
    }
</script>
