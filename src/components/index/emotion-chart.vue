<template>
    <div id="emotion-chart-box">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
                <span style="line-height: 20px;">ECharts 入门示例</span>
            </div>
            <div id="emotion-chart">
            </div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data () {
            return {
                url: '../../static/api/',
            }
        },
        mounted () {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('emotion-chart'));
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: [
                            {value: 235, name: '视频广告'},
                            {value: 274, name: '联盟广告'},
                            {value: 310, name: '邮件营销'},
                            {value: 335, name: '直接访问'},
                            {value: 400, name: '搜索引擎'}
                        ]
                    }
                ]
            });
        }
    }
</script>
<style>
    .el-card__header {
        padding: 5px 10px;
    }

    .clearfix {
        text-align: center;
    }
</style>
