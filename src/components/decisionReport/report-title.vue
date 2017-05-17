<template>
    <div class="report-title">
        <div class="title" :class="[title.levelClass]">{{title.text}}</div>
    </div>
</template>

<script>
    export default {
        props: ['title'],
        data: function () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .report-title {
        .title {
            &.level-one{
                 color: #333;
                 font-size: 26px;
                 line-height: 78px;
             }
            &.level-two{
                 color: #555;
                 font-size: 18px;
                 line-height: 50px;
             }
            &.level-three{
                 color: #777;
                 font-size: 16px;
                 line-height: 40px;
             }
        }
    }
</style>
