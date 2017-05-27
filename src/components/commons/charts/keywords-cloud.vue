<template>
    <div class="keyword-chart">
        <div :id="chartConfig.chartId">
        </div>
    </div>
</template>

<script>
    import Chart from '../../../../lib/draw-echarts'
    export default {
        props: ['chartConfig'],
        data () {
            return {
            }
        },
        mounted () {
            Chart.drawKeyWordsCloud(this.chartConfig.chartId, this.chartConfig.option);
        },
        watch: {
            chartConfig: {
                handler: function (val, oldVal) {
                    Chart.drawKeyWordsCloud(this.chartConfig.chartId, this.chartConfig.option);
                },
                deep: true
            }
        }
    }
</script>
