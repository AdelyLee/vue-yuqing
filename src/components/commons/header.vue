<template>
    <div class="header">
        <el-row>
            <el-col :span="24">
                <el-col :span="7">
                    <div class="header-logo">
                    </div>
                    <div class="header-text">
                        {{headerText}}
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
        data () {
            return {
                headerText: '安全生产與情分析平台'
            }
        },
        components: {
            'common-menu': CommonMenu
        }
    }
</script>
<style>
    .header {
        height: 65px;
    }

    .header-logo {
        width: 64px;
        height: 64px;
        float: left;
        background: url('../../../static/img/an_newlogo.png');
    }

    .header-text {
        line-height: 60px;
        font-size: 30px;
        padding-left: 80px;
    }
</style>
