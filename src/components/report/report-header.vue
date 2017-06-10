<template>
    <div class="report-header">
        <div class="title" v-if="briefingJson.title">{{briefingJson.title}}</div>
        <div class="period" v-if="briefingJson.issue">{{briefingJson.issue}}</div>
        <div class="organization" v-if="briefingJson.author">{{briefingJson.author}}</div>
    </div>
</template>

<script>
    export default {
        props: ['briefingJson'],
        data: function () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .report-header {
        text-align: center;
        border-bottom: 2px solid #888;
        font-size: 20px;

        .title {
            color: #ff0000;
            font-size: 30px;
            line-height: 78px;
            width: 378px;
            height: 78px;
            margin: auto;
            background-image: url("../../../static/img/titlebj.png");
        }

        .organization {
            padding: 0 10px;
            text-align: left;
        }
    }
</style>
