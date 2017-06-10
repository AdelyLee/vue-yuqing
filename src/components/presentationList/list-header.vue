<template>
    <div class="list-header">
        <div class="title">{{wqName}}</div>
    </div>
</template>

<script>
    export default {
        props: ['wqName'],
        data: function () {
            return {
                //title: '往期报告',
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./scss/list-header.scss";
</style>
