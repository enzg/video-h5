<template>
    <div class="main-container">
        <img :src="img" class="fit-o">
        <div id="notice" ref="notice" class="notice" v-show="notice_show" @click="notice_click">
            <img :src="notice" width="100%"/>
        </div>
        <div class="pop" ref="pop" v-show="pop_show">
            <div class="title">{{pop_title}}</div>
            <div class="content" v-show="pop_context_show" v-html="pop_content">
            </div>
            <div class="select-content" v-show="pop_select_show">
                <ul>
                    <li v-for="item,index in pop_list">
                        <input type="checkbox" :value="item.score" :id="index"/> {{item.title}}
                    </li>
                </ul>
            </div>
            <div class="next" @click="next">下一条</div>
        </div>
        <div class="back" @click="back">返回</div>
    </div>
</template>

<script>
    export default {
        name: "CJ2_1",
        data() {
            return {
                img: this.g.cj202,
                notice: this.g.notice,
                notice_show: false,
                pop_show: false,
                pop_context_show: false,
                pop_select_show: false,
                pop_title: '安全问题',
                pop_content: '',
                pop_list:[],
                pop_type: 0,
                videoShow: true,
                videoSrc: this.g.cj101,
                imgSrc: this.g.cj102,
                imgShow: false,
                xw: (1920 / document.body.clientWidth),
                xh: (1080 / document.body.clientHeight),
                startMode: false,
                info: this.g.position2[this.$route.query.index],
                info_index: 0,
                item_index: 0,
                checked:false,
                position_x: 0,
                position_y: 0
            }
        },
        methods: {
            notice_click() {
                this.notice_show=false
                this.pop_show = true
                if (this.pop_type == 0) {
                    this.pop_context_show = true
                    this.pop_select_show = false
                } else {
                    this.pop_context_show = false
                    this.pop_select_show = true
                }
            },
            next() {
                if (this.startMode) {
                    this.videoShow = false
                    this.imgShow = true
                    this.showNotice(this.g.position1[0].position[0], this.g.position1[0].position[1])
                    this.pop_show = false
                    this.startMode = false;
                }
                this.showData();

            },
            showData() {

                let _this = this
                let item = this.info[this.info_index]
                if (item === null || item === undefined) {
                    this.g.cj2_1[this.$route.query.index]=true
                    this.back()
                } else {
                    if (item.items[_this.item_index] === null || item.items[_this.item_index] === undefined) {
                        this.info_index++
                        this.item_index = 0
                        this.pop_show = false
                        this.showData()
                    } else {
                        this.notice_show=false
                        if (item.type == 0) {
                            _this.imgShow = true
                            _this.videoShow = false
                            _this.imgSrc = item.source
                            _this.img=item.source
                        }
                        if (item.position !== null) {
                            _this.showNotice(item.position[0], item.position[1])
                            _this.pop_title = item.items[_this.item_index].title
                            _this.pop_content = item.items[_this.item_index].content
                            _this.pop_type = item.items[_this.item_index].type
                            if (this.pop_type == 0) {
                                this.pop_context_show = true
                                this.pop_select_show = false
                            } else {
                                this.pop_context_show = false
                                this.pop_select_show = true
                                this.pop_list = item.items[_this.item_index].content
                            }

                        }
                        _this.item_index++
                        if (this.pop_show) {
                            this.notice_show=false
                        }

                    }
                }
            },
            showNotice(positionX, positionY) {
                this.position_x = positionX
                this.position_y = positionY
                this.notice_show = true
                this.$refs.notice.style.left = (positionX / this.xw) + 'px'
                this.$refs.notice.style.top = (positionY / this.xh) + 'px'
            }, back() {
                this.$router.push("/CJ2")
            }
        }
        ,mounted() {
            let _this = this

            window.onresize = function temp () {
                _this.xw = (1920 / document.body.clientWidth)
                 _this.xh = (1080 / document.body.clientHeight)

                _this.$refs.notice.style.left =(_this.position_x/_this.xw) + 'px'
                _this.$refs.notice.style.top = (_this.position_y/_this.xh) + 'px'

            }
            this.showData()
        }
    }
</script>

<style scoped>

</style>
