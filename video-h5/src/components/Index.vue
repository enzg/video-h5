<template>
    <div class="main-index">
        <div class="main-item">
            <div class="item-button" @click="toCj1">案例事件背景</div>
            <div class="item-button" @click="toCj2">法律法规学习</div>
            <div class="item-button" @click="toCj3">案例场景复原</div>
            <div class="item-button" @click="toResult">仿真实验报告</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    methods: {
        toCj1 () {
            this.$router.push('/CJ1')
        },
        toCj2 () {
            this.$router.push('/CJ2')
        },
        toCj3 () {
            this.$router.push('/CJ3')
        },
        toResult () {
            if (this.g.finished) {
                this.$router.push('/Result')
            } else {
                alert('本次实验未完成，请重新操作。')
            }
        }
    }
}
</script>

<style scoped>
.main-index {
    width: 100%;
    height: 100%;
    background: url("../assets/OI/main.png") 100% 100% no-repeat;
    background-size: 100%;
    float: left;
}

.main-item {
    width: 65%;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin: auto;
    margin-top: 15%;
    display: flex;
    display: -webkit-flex; /*Safari*/
    justify-content: space-between; /*水平排布方式*/
    align-items: center; /*垂直对齐方式*/
}

.item-button {

    width: 15%;
    padding: 15px;
    background-color: rgba(33, 128, 26, 0.8);
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 10px 10px 8px #0f1921;
}

.item-button:hover {
    width: 15%;
    padding: 15px;
    background-color: rgba(3, 4, 5, 0.8);
    border-radius: 5px;
    cursor: pointer;
}
</style>
