/**
将向相同的模块改为一个模块,主要是以数据来驱动.
*/
<template>
    <div class="list-box">
        <div class="clearfix table-top"><span class="news-title">最新{{title}}</span></div>
        <ul class="article-list">
            <li v-for="item in items" :title="item.content" :id="item.id" @click="change(item.id)">
                <a target="blank">
                    <span>{{item.content.length > 13 ? item.content.substr(0, 13) + '...' : item.content}}</span>
                    <span>{{item.time}}</span>
                </a>
            </li>
        </ul>
        <div class="clearfix table-bottom"><span class="news-more" @click="target(title)">更多{{title}}</span></div>
    </div>
</template>

<script>
    export default {
        props: ['type', 'checkedItems'],
        data () {
            return {
                url: '../../static/api/',
                title: '',
                items: []
            }
        },
        mounted () {
            console.log(this.checkedItems)
            this.url = this.url + this.type + '.json'
            this.$http.get(this.url).then((response) => {
                this.title = response.data.title
                this.items = response.data[this.type].slice(0, 5)
            }, (response) => {
                console.log(response)
            })
        },
        methods: {
            change: function (id) {
                window.open('https://www.baidu.com#id=' + id)
            },
            target: function (name) {
                window.open('https://www.baidu.com#name=' + name)
            }
        },
        watch: {
            checkedItems: function (val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
            }
        }
    }
</script>
