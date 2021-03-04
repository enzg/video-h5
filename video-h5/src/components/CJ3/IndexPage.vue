<template>
    <div class="main-container">
        <div style="position: absolute;z-index:999;width:600px;left:50%;margin-left:-300px;top:15%;"
             v-show="mVideoShow">
            <span @click="shownextx" style="display: block;width: 25px;height: 25px;border-radius: 50%;float: right;background: green;text-align: center;color: #fff;line-height: 25px;position: absolute;left: 575px;cursor: pointer;font-weight: bold;z-index:1000">X</span>
            <video :src="mVideo" autoplay width="100%" ref="video2"></video>
        </div>
        <video :src="videoSrc" autoplay id="video1" ref="video1" class="video fit-o" v-show="videoShow"/>
        <img :src="imgSrc" width="100%" ref="cj2" v-show="imgShow" class="fit-o"/>
        <div id="notice" ref="notice" class="notice" v-show="notice_show" @click="notice_click">
            <img :src="notice" width="100%"/>
        </div>
        <div class="pop" ref="pop" v-show="pop_show">
            <div class="title">{{ pop_title }}</div>
            <div class="content" v-show="pop_context_show">
                {{ pop_content }}
            </div>
            <div class="select-content" v-show="pop_select_show">
                <div class="etitle">{{ e_title }}</div>
                <ul>
                    <li v-for="(item,index) in pop_list" :key="item" :index="index">
                        <label>
                            <input type="checkbox" :value="item.socre" name="score-item"
                                   :id="index" v-if="item.type===1" v-model="item.ischeck"/>
                            <input type="radio" :value="item.socre" :id="index"
                                   name="score-item" v-if="item.type===2" v-model="item.ischeck"/>
                            {{ item.title }}
                        </label>
                    </li>
                </ul>
            </div>
            <div class="next" @click="next">下一条</div>
        </div>
        <div class="back" @click="back">返回</div>
        <div class="next-3" v-show="show_next" @click="shownext">下一条</div>
    </div>
</template>

<script>

export default {
    name: 'IndexPage',
    data () {
        return {
            mVideo: null,
            mVideoShow: false,
            score_index: 5,
            show_next: false,
            notice: this.g.notice,
            notice_show: false,
            pop_show: false,
            pop_context_show: false,
            pop_select_show: false,
            pop_title: '安全问题',
            pop_content: '',
            e_title: '',
            pop_list: [],
            pop_type: 0,
            videoShow: true,
            videoSrc: this.g.cj301,
            videoList: this.g.cj3,
            imgSrc: this.g.cj102,
            imgShow: false,
            xw: (1920 / document.body.clientWidth),
            xh: (1080 / document.body.clientHeight),
            startMode: true,
            info: this.g.position3,
            info_index: 0,
            item_index: 0,
            currentVideoIndex: 1,
            notice_x: 0,
            notice_y: 0,
            position_x: 0,
            position_y: 0,
            can_next: false,
            next_type: 0
        }
    },
    mounted () {

        let _this = this

        window.onresize = function temp () {
            _this.xw = (1920 / document.body.clientWidth)
            _this.xh = (1080 / document.body.clientHeight)

            _this.$refs.notice.style.left = (_this.position_x / _this.xw) + 'px'
            _this.$refs.notice.style.top = (_this.position_y / _this.xh) + 'px'

        }
        this.$refs.video1.play()
        this.$refs.video1.addEventListener('ended', function () {
            _this.item_index = 0
            if (_this.info_index == 14) {
                this.$router.push('/AddInfo')
            }
            if (_this.currentVideoIndex >= 5) {
                _this.showData()
                if (_this.notice_x !== 0 && _this.notice_y !== 0) {
                    _this.showNotice(_this.notice_x, _this.notice_y)
                }
                _this.show_next = false
            } else {
                _this.show_next = true
            }
            if (_this.currentVideoIndex === 3) {
                _this.mVideo = _this.videoList['cj321']
                _this.mVideoShow = true
                _this.show_next = false
            }
            // if (_this.mVideo !== null && _this.mVideo !== undefined) {
            //
            // }
        })

    },
    methods: {
        shownextx () {
            this.mVideoShow = false
            this.$refs.video2.pause()
            if (this.next_type >0) {
                this.showData()

            } else {
                this.shownext()
            }
        },
        shownext () {
            this.currentVideoIndex++

            let prefix = 'cj30'
            if (this.currentVideoIndex > 9) {
                prefix = 'cj31'
            }
            if (this.currentVideoIndex === 11 || this.currentVideoIndex === 12) {
                this.imgSrc = this.videoList[prefix + this.currentVideoIndex]
                this.imgShow = true
                this.videoShow = false
                this.show_next = false
                this.showData()
            } else {
                this.imgShow = false
                this.videoShow = true
                this.videoSrc = this.videoList[prefix + this.currentVideoIndex]
                this.$refs.video1.src = this.videoSrc
                console.log(this.videoSrc)
                this.$refs.video1.play()
                this.show_next = false
            }
        },
        start (title, content) {
            this.pop_show = true
            this.pop_title = title
            this.pop_content = content
        },
        notice_click () {
            this.pop_show = true
            if (this.pop_type == 0) {
                this.pop_context_show = true
                this.pop_select_show = false
            } else {
                this.pop_context_show = false
                this.pop_select_show = true
            }
            this.notice_show = false
        },
        next () {
            // if (this.startMode) {
            //     this.videoShow = false
            //     this.imgShow = true
            //     this.showNotice(this.g.position1[0].position[0], this.g.position1[0].position[1])
            //     this.pop_show = false
            //     this.startMode = false;
            // }
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
                this.can_next = false
                if (all_score <= 0) {
                    this.g.scoreItem[this.score_index] = 0
                } else {
                    this.g.trueCount++
                    this.g.falseCount--
                    this.g.score += 4
                    this.g.scoreItem[this.score_index] = 1
                }
                this.score_index++

            }

            if (this.score_index === 11&& this.next_type===0) {
                this.mVideo = this.videoList['cj322']
                this.mVideoShow = true
                this.show_next = false
                this.$refs.video2.play()
                this.pop_show = false
                this.next_type = 1
            } else if (this.score_index === 15&&this.next_type==1) {
                this.mVideo = this.videoList['cj323']
                this.mVideoShow = true
                this.show_next = false
                this.$refs.video2.play()
                this.pop_show = false
                this.next_type = 2
            } else {
                this.showData()
            }
        },
        showData () {

            let _this = this
            let item = this.info[this.info_index]
            if (item === null || item === undefined) {
                this.$router.push('/AddInfo')
            } else {
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
                        // _this.showNotice(item.position[0], item.position[1])
                        if (item.type === 0 && _this.item_index == 0) {
                            _this.showNotice(item.position[0], item.position[1])
                            _this.notice_x = 0
                            _this.notice_y = 0
                        } else {
                            _this.notice_x = item.position[0]
                            _this.notice_y = item.position[1]

                        }

                        _this.pop_title = item.items[_this.item_index].title
                        _this.pop_content = item.items[_this.item_index].content
                        _this.pop_type = item.items[_this.item_index].type
                        _this.e_title = item.items[_this.item_index].etitle
                        if (this.pop_type == 0) {
                            this.pop_context_show = true
                            this.pop_select_show = false
                        } else {
                            this.pop_context_show = false
                            this.pop_select_show = true
                            this.pop_list = item.items[_this.item_index].content
                            this.pop_list.forEach(function (item, index) {
                                item.ischeck = false
                            })
                        }

                    }
                    _this.item_index++
                }
            }
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

.next-3 {
    width: 100px;
    heigth: 50px;
    padding: 10px;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 85%;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    cursor: pointer;
}

.etitle {
    margin: auto;
    width: 90%;
    margin-top: 20px;
}

</style>
