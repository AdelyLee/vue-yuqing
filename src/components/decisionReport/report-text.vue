<template>
    <div class="report-text">
        <div class="title">{{mouth}}</div>,安全生产相关舆情约<div class="listNum">{{listNum}}</div>篇，比1月份减少了<div class="percent">{{percent}}</div>。
          其中<div class="listNum">{{type}}</div>是本月的舆情主阵地，<div class="listNum">{{chat}}</div>占比较上月有所下降

    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                mouth:'2月份',
                listNum: 115700,
                percent: '16.7%',
                type: '网络媒体',
                chat:"微信",
            }
        }
    }
</script>

<style lang="scss" scoped>
    .report-text {
        text-align: center;
        border: 1px solid #7DB5EE;
        -webkit-box-shadow:0 0 10px #1D90E6;
        -moz-box-shadow:0 0 10px #1D90E6;
        box-shadow:0 0 10px #1D90E6;
        border-radius: 5px;
        font-size: 20px;
        min-height:50px;
        margin: 50px;
        margin-bottom: 20px;
        line-height:50px;
        font-weight: 600;




    div{
        display: inline-block;
    }

    .listNum{
        color: #EB7E23;
        font-size: 24px;
    }
    .percent{
        color:#7BDF86;
        font-size: 24px;
    }
    }
</style>
