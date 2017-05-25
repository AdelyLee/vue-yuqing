<template>
    <div class="list-header">
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                title: '往期月报',
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-header {
        text-align: center;
    .title {
        color: #ffffff;
        font-size: 30px;
        line-height: 78px;
        width: 371px;
        height: 78px;
        margin: auto;
        background-image: url("../../../static/img/bgbj.png");
    }
    }
</style>
