<template>
    <div class="map-chart">
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
            Chart.drawMapChart(this.chartConfig.chartId, this.chartConfig.option, this.chartConfig.events);
        }
    }
</script>
