<template>
    <div class="gauge-chart">
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
        watch: {
            chartConfig: {
                handler: function (val, oldVal) {
                    Chart.drawGuageChart(this.chartConfig.chartId, this.chartConfig.option, this.chartConfig.events);
                },
                deep: true
            }
        }
    }
</script>
