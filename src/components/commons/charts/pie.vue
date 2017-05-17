<template>
    <div class="pie-chart">
        <div :id="chartConfig.chartId">
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import Chart from '../../../../lib/draw-echarts'
    export default {
        props: ['chartConfig'],
        data () {
            return {
            }
        },
        mounted () {
            Chart.drawPieChart(this.chartConfig.chartId, this.chartConfig.option, this.chartConfig.events);
        }
    }
</script>

<style lang="scss" scoped>
    #pie-chart-test {
        margin: auto;
        width: 300px;
        height: 300px;
    }
</style>
