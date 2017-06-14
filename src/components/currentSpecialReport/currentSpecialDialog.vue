<template>
    <div>
        <el-dialog :visible.sync="Dialog.dialogTableVisible" >

        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['Dialog'],
        data () {
            return{
                dialogTableVisible: true
            }
        },
        methods: {

        }
    }
</script>

