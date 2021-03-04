<template>
    <div class="main-container bg">
        <div class="result-container">
            <div class="result-title">实验报告</div>
            <div class="result-content">
                <div class="left-result">
                    <div class="score">
                        <div class="title">实验分数</div>
                        <div class="score-content">
                            <div class="score-detail">{{score}}分</div>
                        </div>
                    </div>
                    <div class="timecost">
                        <div class="title">实验时间</div>
                        <div class="score-content">
                            <div class="score-detail">{{time}}分钟</div>
                        </div>
                    </div>
                </div>
                <div class="middle-result">
                    <div class="title">正确数量</div>
                    <div class="correct-content">
                        <div class="score-detail">{{trueCount}}</div>
                    </div>
                    <div class="title mgt">错误数量</div>
                    <div class="correct-content">
                        <div class="score-detail error">{{falseCount}}</div>
                    </div>
                </div>
                <div class="right-result">
                    <div class="top-content">
                        <div class="title">体验场景</div>
                        <div class="answer-content">
                            <ul >
                                <li>1.消控室<input type="checkbox" v-model="cj1" disabled/></li>
                                <li>2.小区全景<input type="checkbox" v-model="cj2" disabled></li>
                                <li>3.小区楼道<input type="checkbox" v-model="cj3" disabled></li>
                                <li>4.房间<input type="checkbox" v-model="cj4" disabled></li>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom-content">
                        <div class="title">答题回顾</div>
                        <div class="content">
                            <ul style="padding: 0;margin:0;">
                                <li class="error-asw" v-for="(item,index) in datas" :key="index"
                                    :class="selectClass(item)">{{index+1}}
                                </li>
                                <li class="t">
                                    思考题
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="download">
                    <a href="/static/实验测试结果表.doc" target="_blank">下载实验报告表</a>
                </div>
            </div>
        </div>
        <div class="back" @click="back">返回</div>
    </div>
</template>

<script>
    export default {
        name: 'Result',
        data () {
            return {
                score: this.g.score,
                time: this.g.costTime,
                trueCount: this.g.trueCount,
                falseCount: this.g.falseCount,
                datas: this.g.scoreItem,
                cj1: this.g.cj2_1[0],
                cj2: this.g.cj2_1[1],
                cj3: this.g.cj2_1[2],
                cj4: this.g.cj2_1[3],

            }
        },
        methods: {
            back () {
                this.$router.push('/Index')
            },
            selectClass (item) {
                if (item === 1) {
                    return 'crorect-asw'
                } else {
                    return 'error-asw'
                }
            }
        },
        mounted () {
            if (!this.g.finished) {
                alert("本次实验未完成，请重新操作。")
                this.$router.push("/Index")
            }
        }
    }
</script>

<style scoped>
    input[type=checkbox] {
        margin-right: 5px;
        cursor: pointer;
        font-size: 20px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        position: relative;
    }

    input[type=checkbox]:after {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 0;
        content: "✘";
        color: #ff460c;
        display: inline-block;
        visibility: visible;
        border-radius: 3px;
    }

    input[type=checkbox]:checked:after {
        content: "✔";
        font-size: 20px;
        color: green;

    }

    .result-container {
        width: 1154px;
        height: 555px;
        margin: auto;
        margin-top: 10%;
        position: relative;
        display: block;
        border: 1px solid transparent;
    }

    .result-title {
        position: absolute;
        left: 50%;
        width: 30%;
        margin-left: -15%;
        text-align: center;
        height: 50px;
        background: #25a3ff;
        line-height: 50px;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        border-radius: 5px;
    }

    .result-content {
        margin-top: 25px;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 95%;
        border-radius: 20px;
        float: left;
        color: #fff;
        font-size: 20px;
        font-weight: bold;

    }

    .left-result {
        width: 30%;
        height: 80%;
        margin-top: 5%;
        margin-left: 30px;
        float: left;
    }

    .middle-result {
        width: 20%;
        height: 80%;
        margin-top: 5%;
        margin-left: 30px;
        float: left;
        background: rgba(37, 163, 255, 0.5);
    }

    .right-result {
        width: 30%;
        height: 80%;
        margin-top: 5%;
        margin-left: 30px;
        float: left;

    }

    .download {
        width: 3%;
        padding:0 20px;
        height: 80%;
        margin-top: 5%;
        margin-left: 30px;
        float: left;
        vertical-align: middle;
        text-align: center;
        background-color:#25a3ff;
        color:#ffffff;
        border-radius: 5px;

    }
    .download a{
        color: #fff;
        display:block;
        text-decoration: none;
        margin-top:100px;
        float:left;
        height:100%;

    }

    .right-result .top-content {
        width: 100%;
        background: rgba(37, 163, 255, 0.5);
        height: 48%;
        float: right;
        border-radius: 5px;
    }

    .right-result .bottom-content {
        margin-top: 25px;
        background: rgba(37, 163, 255, 0.5);
        height: 48%;
        margin-top: 4%;
        float: right;
        border-radius: 5px;
        width: 100%;
        text-align: center;
    }

    .right-result .answer-content li {
        line-height: 35px;
        list-style: none;
    }

    .right-result .answer-content li input {
        float: right;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        -webkit-appearance: none;
        color: green;
    }

    .score-detail {
        width: 140px;
        height: 140px;
        border: 6px double green;
        border-radius: 75px;
        line-height: 140px;
        text-align: center;
        margin: auto;
        font-size: 30px;
    }

    .score {
        width: 100%;
        height: 48%;
        float: left;
        background: rgba(37, 163, 255, 0.5);
        border-radius: 5px;
    }

    .timecost {
        width: 100%;
        height: 48%;
        float: left;
        margin-top: 4%;
        background: rgba(37, 163, 255, 0.5);
        border-radius: 5px;
    }

    .title {
        height: 40px;
        width: 100%;
        line-height: 40px;
        text-align: center;
    }

    .error {
        border-color: red;
    }

    .right-result .bottom-content .content ul li {
        list-style: none;
        display: block;
        float: left;
        width: 30px;
        height: 30px;
        border: 1px solid gray;
        border-radius: 15px;
        text-align: Center;
        line-height: 30px;
        margin: 5px;
        box-shadow: 3px 3px 2px #0f1921;
    }

    .error-asw {
        background-color: #ff460c;
    }

    .crorect-asw {
        background-color: green;
    }

    .t {
        text-align: center;
        border-color: #fff !important;
        border-radius: 10px !important;
        display: block !important;
        width: 80px !important;
        background-color: green;
        margin:auto;
    }

    .mgt {
        margin-top: 30px;
    }
</style>
