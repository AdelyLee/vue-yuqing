<template>
    <div class="report-summary">
        <div class="text" v-if="briefingJson.summary">{{briefingJson.summary}}</div>
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
