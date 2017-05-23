<template>
    <div :id="describe.Id" class="report-describe" >
    </div>
</template>

<script>
    export default {
        props: ['describe'],
        data: function () {
            return {
            }
        },
        mounted () {
           this.describe.Id;
        },
        watch: {
            describe: {
                handler: function (val, oldVal) {
                   this.describe.Id;
                },
                deep: true
            }
        }
    }
</script>
