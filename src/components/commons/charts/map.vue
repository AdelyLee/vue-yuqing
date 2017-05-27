<template>
    <div class="map-chart">
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
            Chart.drawMapChart(this.chartConfig.chartId, this.chartConfig.option, this.chartConfig.events);
        },
        watch: {
            chartConfig: {
                handler: function (val, oldVal) {
                    Chart.drawMapChart(this.chartConfig.chartId, this.chartConfig.option, this.chartConfig.events);
                },
                deep: true
            }
        }
    }
</script>
