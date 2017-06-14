<template>
    <div v-loading="yujingDetailsList.loading2"
         element-loading-text="拼命加载中">
        <table align="center" border="0" cellspacing="0" cellpadding="0" class="mailBack"
               style="padding:20px; width: 800px; border: solid 1px #ccc; background-color:#fff; color: #444;">
            <tbody>
            <tr >
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style=" margin:0px;">
                        <tbody>
                        <tr>
                            <td>
                                <a  target="_blank" v-for = "item in yujingDetailsList.items" @click = "getNewPage(item.id)" >
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                           class="line" style="padding-bottom:10px; margin-top:10px;text-decoration:none;border-bottom:1px solid #000;cursor: pointer;" title  = "点击查看详情">
                                        <tbody>
                                        <tr>
                                            <td style = "width:50px;">
                                                <div>
                                                    <img src="../../../static/img/default_avatar_male_50.gif" alt="暂无图片" style = "border-radius: 50%">
                                                </div>
                                            </td>
                                            <td>
                                                <h3 class="newsName" style = "color:#1F2D3D;margin-left:10px;">{{item.author}}</h3>
                                                <p class="newsDate" style = "font-size:14px;color:#475669;"><span style = "margin-left:10px;">{{item.pubTime}}</span><span style = "margin-left:30px;">来自：{{item.source}}</span><span style = "margin-left:30px;">载体：{{item.type}}</span></p>
                                            </td>
                                            <td style = "width:60px;height:30px;">
                                                <span v-if="item.emotion=='正面'" style = "display:inline-block;font-weight:600;font-size:16px;text-align:center;line-height:30px;color:#13CE66;border:2px solid #13CE66;border-radius:20px;width:60px;height:30px;">{{item.emotion}}</span>
                                                <span v-if="item.emotion=='负面'"style = "display:inline-block;font-weight:600;font-size:16px;text-align:center;line-height:30px;color:#FF4949;border:2px solid #FF4949;border-radius:20px;width:60px;height:30px;">{{item.emotion}}</span>
                                                <span v-if="item.emotion=='中性'"style = "display:inline-block;font-weight:600;font-size:16px;text-align:center;line-height:30px;color:#F7BA2A;border:2px solid #F7BA2A;border-radius:20px;width:60px;height:30px;">{{item.emotion}}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style = "color:#475669;font-weight:600;" v-html = "item.title">

                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style = "color:#475669;background:#F9FAFC;padding:5px;" v-html="item.content">

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        props: ['yujingDetailsList'],
        data () {
            return{
            }
        },
        methods: {
            getNewPage:function(id){
                window.open('../module/detail.html?id='+id)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
