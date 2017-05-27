<template>
    <div class="report-content">
        <div class="outline" v-if="briefingJson.outline" v-html="briefingJson.outline">{{briefingJson.outline}}</div>
        <div v-for="item of briefingCells">
            <div class="title" v-bind:class="[item.level]" v-if="item.title" v-html="item.title">{{item.title}}</div>
            <line-bar-chart v-if="item.chartType=='bar' || item.chartType=='line'" :chartConfig="item"></line-bar-chart>
            <pie-chart v-if="item.chartType=='pie'" :chartConfig="item"></pie-chart>
            <map-chart v-if="item.chartType=='map'" :chartConfig="item"></map-chart>
            <keywords-chart v-if="item.chartType=='keywordsCloud'" :chartConfig="item"></keywords-chart>
            <div class="description" v-if="item.description" v-html="item.description">{{item.description}}</div>
        </div>
    </div>
</template>
<script>
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import MapChart from '@/components/commons/charts/map';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    export default {
        props: ['briefingJson', 'briefingCells'],
        data: function () {
            return {
            }
        },
        components: {
            'line-bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'map-chart': MapChart,
            'keywords-chart': KeywordsChart,
        }
    }
</script>
