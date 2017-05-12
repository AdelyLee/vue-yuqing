<template>
    <div id="type-category-trend-chart-box">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
                <span style="line-height: 20px;">ECharts 入门示例</span>
            </div>
            <div id="type-category-trend-chart">
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
            var myChart = echarts.init(document.getElementById('type-category-trend-chart'));
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
</script>
