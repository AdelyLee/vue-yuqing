<template>
    <div class="report-header">
        <div class="title" v-if="briefingJson.title">{{briefingJson.title}}</div>
        <div class="period" v-if="briefingJson.issue">{{briefingJson.issue}}</div>
        <div class="organization" v-if="briefingJson.author">{{briefingJson.author}}</div>
        <div class="createTime" v-if="briefingJson.author">{{briefingJson.createTime}}</div>
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
