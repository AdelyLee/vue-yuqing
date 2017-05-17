<template>
    <div class="map-chart">
        <div :id="mapConfig.chartId" v-if="mapConfig">
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
                mapConfig: {}
            }
        },
        mounted () {
            this.mapConfig = this.chartConfig;
            Chart.drawMapChart(this.chartConfig.chartId, this.chartConfig.option, this.chartConfig.events);
        },
        watch: {
            chartConfig: function () {
                this.mapConfig = this.chartConfig
            },
            mapConfig: {
                handler(val, oldVal) {
                    debugger;
                    console.log('new: %s, old: %s', val, oldVal)
                    Chart.drawMapChart(this.mapConfig.chartId, this.mapConfig.option, this.mapConfig.events);

                },
                deep :true
            }
        }
    }
</script>

<style lang="scss" scoped>
    #map-chart-test {
        margin: auto;
        width: 800px;
        height: 500px;
    }
</style>
