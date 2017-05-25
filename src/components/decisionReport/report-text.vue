<template>
    <div class="report-text">
        <div class="title">{{briefingJson.outline}}</div>
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
