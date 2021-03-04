<template>
    <div class="main-container">
        <video :src="videoSrc" autoplay id="video1" ref="video1" class="video fit-o" v-show="videoShow"/>
        <img :src="imgSrc" width="100%" ref="cj2" v-show="imgShow" class="fit-o"/>
        <div id="notice" ref="notice" class="notice" v-show="notice_show" @click="notice_click">
            <img :src="notice" width="100%"/>
        </div>
        <div class="pop" ref="pop" v-show="pop_show">
            <div class="title">{{ pop_title }}</div>
            <div class="content" v-if="pop_context_show">
                {{ pop_content }}
            </div>
            <div class="select-content" v-if="pop_select_show">
                <div class="etitle">{{ e_title }}</div>
                <ul>
                    <li v-for="(item,index) in pop_list" :index="index" :key="item">
                        <label><input type="checkbox" :value="item.score" v-model="item.ischeck"
                                      :id="index" name="score-item"/>
                            {{ item.title }}</label>
                    </li>
                </ul>
            </div>
            <div class="img-content" v-show="pop_img_show">
                <img :src="pop_img_context" width="400px"/>
            </div>
            <div class="next" @click="next">{{ next_btn }}</div>
        </div>
        <div class="back" @click="back">返回</div>

        <div class="law" v-show="law_max_show">
            <div class="law-button" @click="lawshow">法<br>律<br>法<br>规</div>
            <div class="law-context" v-show="law_show" v-html="law_content">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'IndexPage',
    data () {
        return {
            video_index: 0,
            score_index: 0,
            next_btn: '下一条',
            law_max_show: false,
            law_show: false,
            law_content: '',
            notice: this.g.notice,
            notice_show: false,
            pop_show: false,
            pop_context_show: false,
            pop_select_show: false,
            pop_img_show: false,
            pop_title: '安全问题',
            e_title:"",
            pop_content: '',
            pop_img_context: '',
            pop_list: [],
            pop_type: 0,
            videoShow: true,
            videoSrc: this.g.cj101,
            imgSrc: this.g.cj102,
            imgShow: false,
            xw: (1920 / document.body.clientWidth),
            xh: (1080 / document.body.clientHeight),
            startMode: true,
            info: this.g.position1,
            info_index: 0,
            item_index: 0,
            checked: false,
            start_time: this.g.startTime,
            position_x: 0,
            position_y: 0,
            can_next: false
        }
    },
    mounted () {
        this.g.score = 0
        this.g.costTime = 0
        this.g.trueCount = 0
        this.g.falseCount = 19
        this.g.cj2_1[0] = false
        this.g.cj2_1[1] = false
        this.g.cj2_1[2] = false
        this.g.cj2_1[3] = false
        this.g.startTime = Date.parse(new Date())
        this.g.finished = false
        for (let i = 0; i < 19; i++) {
            this.g.scoreItem[i] = 0
        }

        let _this = this

        window.onresize = function temp () {
            _this.xw = (1920 / document.body.clientWidth)
            _this.xh = (1080 / document.body.clientHeight)

            _this.$refs.notice.style.left = (_this.position_x / _this.xw) + 'px'
            _this.$refs.notice.style.top = (_this.position_y / _this.xh) + 'px'

        }

        this.$refs.video1.play()
        this.$refs.video1.addEventListener('ended', function () {
            if (Math.abs(_this.video_index) === 0) {

                _this.pop_context_show = true
                _this.next_btn = '请同学们讨论'
                _this.start('案例事件背景', '　　xx年x月x日,某小区发生了一起嫌疑人纵火时间,由于小区物业缺少规范管理,消防救援受阻,造成了巨大的损失和法律纠纷，现在让我们倒退到案例现场,看看物业管理不规范或安全隐患在哪里？')
                _this.video_index = 1
            } else {
                _this.video_index = 0;
                _this.notice_click();
            }
        })

    },
    methods: {
        lawshow () {
            this.law_show = !this.law_show
        },
        start (title, content) {
            this.pop_show = true
            this.pop_title = title
            this.pop_content = content
        },
        notice_click () {
            this.pop_show = true
            this.notice_show = false
            if (this.pop_type == 0) {
                this.pop_context_show = true
                this.pop_select_show = false
                this.pop_img_show = false
            } else if (this.pop_type === 1) {
                this.pop_context_show = false
                this.pop_select_show = true
                this.pop_img_show = false
            } else {
                this.pop_img_show = true
                this.pop_context_show = false
                this.pop_select_show = false
            }

        },
        next () {
            this.law_max_show = true
            this.notice_show = false
            if (this.startMode) {
                this.videoShow = false
                this.imgShow = true
                this.showNotice(this.g.position1[0].position[0], this.g.position1[0].position[1])
                this.pop_show = false
                this.startMode = false

            }
            this.next_btn = '下一条'
            if (this.pop_select_show) {

                let items = document.getElementsByName('score-item')
                let all_score = 0
                if (items.length != undefined) {
                    for (let index = 0; index < items.length; index++) {
                        if (items[index].checked) {
                            all_score += parseInt(items[index].value)
                            this.can_next = true
                        }
                    }
                }
                if (!this.can_next) {
                    return
                }
                if (all_score <= 0) {
                    this.g.scoreItem[this.score_index] = 0
                } else {
                    this.g.trueCount++
                    this.g.falseCount--
                    this.g.score += 4
                    this.g.scoreItem[this.score_index] = 1
                }
                this.score_index++
                this.can_next = false

            }
            this.showData()

        },
        showData () {
            let _this = this
            let item = this.info[this.info_index]
            console.log(this.info_index)
            if (item === null || item === undefined) {
                this.back()
            } else {
                this.law_content = item.law
                if (item.items[_this.item_index] === null || item.items[_this.item_index] === undefined) {
                    this.info_index++
                    this.item_index = 0
                    this.pop_show = false
                    this.showData()
                } else {
                    if (item.type == 0) {
                        _this.imgShow = true
                        _this.videoShow = false
                        _this.imgSrc = item.source
                    } else {
                        _this.imgShow = false
                        _this.videoShow = true
                        _this.videoSrc = item.source
                    }
                    if (item.position !== null) {
                        if (!this.pop_show) {
                            _this.showNotice(item.position[0], item.position[1])
                        }
                        _this.pop_title = item.items[_this.item_index].title
                        _this.pop_content = item.items[_this.item_index].content
                        _this.pop_type = item.items[_this.item_index].type
                        _this.e_title = item.items[_this.item_index].etitle
                        if (this.pop_type == 0) {
                            this.pop_context_show = true
                            this.pop_select_show = false
                            this.pop_img_show = false
                        } else if (this.pop_type === 1) {
                            this.pop_context_show = false
                            this.pop_select_show = true
                            this.pop_list = item.items[_this.item_index].content
                            this.pop_list.forEach(function (item, index) {
                                item.ischeck = false
                            })
                            this.pop_img_show = false
                        } else {
                            this.pop_context_show = false
                            this.pop_select_show = false
                            this.pop_img_show = true
                            this.pop_img_context = item.items[_this.item_index].content
                        }

                    }
                    _this.item_index++
                }
            }
            // let scoreItem = document.getElementsByName("score-item");
            // for(let i=0;i<scoreItem.length;i++){
            //     scoreItem[i].checked = false;
            // }

        },
        showNotice (positionX, positionY) {
            this.position_x = positionX
            this.position_y = positionY
            this.notice_show = true
            this.$refs.notice.style.left = (positionX / this.xw) + 'px'
            this.$refs.notice.style.top = (positionY / this.xh) + 'px'
        }, back () {
            this.$router.push('/Index')
        }
    }
}
</script>

<style scoped>
.law {
    position: absolute;
    right: 0px;
    top: 20%;
    width: auto;
    height: auto;
}

.law-button {
    padding: 10px;
    background: rgba(21, 48, 189, 0.8);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    float: left;
    border-radius: 5px;
    margin-top: 200px;
}

.law-context {
    width: 230px;
    height: 500px;
    float: left;
    overflow-y: scroll;
    background-color: #fff;
    font-size: 14px;
    border:1px solid  rgba(21, 48, 189, 0.8);
    border-radius: 5px;
    padding: 10px;
}

.fit-o {
    object-fit: fill;
    width: 100%;
    height: 100%;

}

.select-content {
    font-size: 20px;
    text-align: left;
}

.select-content ul li {
    list-style: none;
    line-height: 35px;
}

.select-content ul li input {
    width: 18px;
    height: 18px;
}
.etitle {
    margin: auto;
    width: 90%;
    margin-top:35px;
}
</style>
