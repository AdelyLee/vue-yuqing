<template>
    <div class="box">
        <ul class="ulTag">
            <li class="liTag" v-for="item in items" v-on:click="clickItem(item, $evnet)">
                <span class="text">{{item.text}}</span>
                <img src="../../../static/img/sglm_bj1440.png" alt="" class="img">
                <span :class="{active:item.isActive}" class="spanTag"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                items: [{
                    text: '煤矿',
                    isActive: true
                }, {
                    text: '金属非金属矿',
                    isActive: false
                }, {
                    text: '化工',
                    isActive: false
                }, {
                    text: '烟花爆竹',
                    isActive: false
                }, {
                    text: '建筑',
                    isActive: false
                }]
            }
        },
        methods: {
            clickItem: function (item, event) {
                if (item.isActive) {
                    item.isActive = false;
                } else {
                    item.isActive = true;
                }

                // send the checkedItems to parent component
                var checkedItems = [];
                this.items.forEach(function (item) {
                    if (item.isActive) {
                        checkedItems.push(item);
                    }
                });

                if (checkedItems.length === 0) {
                    this.items.forEach(function (item) {
                        checkedItems.push(item);
                    });
                }

                this.$emit('data', checkedItems);
            }
        }
    }
</script>

<style>
    .box {
        width: 100%;
        float: left;
        margin: 0;
        padding: 0;
        position: relative;
    }

    .ulTag {
        width: 100%;
        padding: 0;
        min-height: 750px;
        list-style: none;
    }

    .liTag {
        width: 134px;
        margin: 30px auto;
        cursor: pointer;
        position: relative;
    }

    .text {
        text-align: center;
        margin: 0 auto;
        position: absolute;
        line-height: 86px;
        width: 134px;
    }

    .spanTag {
        display: inline-block;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 10px;
        right: 3px;
        background: url("../../../static/img/checkbox.png") no-repeat -13px -18px;
    }

    .spanTag.active {
        background: url("../../../static/img/checkbox.png") no-repeat -13px -218px;
    }

</style>
