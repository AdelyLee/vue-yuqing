<template>
    <div class="header">
        <el-row>
            <el-col :span="24">
                <el-col :span="7">
                    <div class="header-logo">
                    </div>
                    <div class="header-text">
                        安全生产與请分析平台
                    </div>
                </el-col>
                <el-col :span="17">
                    <common-menu></common-menu>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CommonMenu from '@/components/commons/menu'
    export default {
        name: 'header',
        components: {
            'common-menu': CommonMenu
        }
    }
</script>
<style>
    .header-logo{
        width: 60px;
        height: 60px;
        float: left;
        background: url('../../../static/img/an_newlogo.png');
    }
    .header-text {
        line-height: 60px;
        font-size: 30px;
        padding-left: 80px;
    }
</style>
