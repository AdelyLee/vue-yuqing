<template>
    <div class="report-header">
        <div class="title">{{title}}</div>
        <div class="period">{{period}}</div>
        <div class="organization">{{organization}}</div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                title: '安全生产與情月报',
                period: '2017年第5期',
                organization: '人事司(宣教办)、通信信息中心编制'
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
