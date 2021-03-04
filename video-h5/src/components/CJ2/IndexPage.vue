<template>
    <div class="main-container bg">
        <div class="main-menu">
            <div class="item" ref="menu1" @click="menu1m">
                <img :src="menu1"/>
            </div>
            <div class="item" ref="menu2" @click="menu2m">
                <img :src="menu2"/>
            </div>
            <div class="item" ref="menu3" @click="menu3m">
                <img :src="menu3"/>
            </div>
            <div class="item" ref="menu4" @click="menu4m">
                <img :src="menu4"/>
            </div>
        </div>
        <div class="back" @click="back">返回</div>
    </div>
</template>

<script>
    export default {
        name: 'IndexPage',
        data() {
            return {
                menu1: this.g.cj201_1,
                menu2: this.g.cj201_2,
                menu3: this.g.cj201_3,
                menu4: this.g.cj201_4,
                xw: (1920 / document.body.clientWidth),
                xh: (1080 / document.body.clientHeight)
            }
        },
        methods: {
            menu1m() {
                this.$router.push({path:"/CJ2_1",query:{index:0}})
            },
            menu2m() {
                this.$router.push({path:"/CJ2_1",query:{index:1}})
            },
            menu3m() {
                this.$router.push({path:"/CJ2_1",query:{index:2}})
            },
            menu4m() {
                this.$router.push({path:"/CJ2_1",query:{index:3}})
            },back() {
                this.$router.push("/Index")
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .item {
        margin: auto;
        cursor: pointer;
        border: 1px solid transparent;
    }

    .item:hover {
        border: 1px solid #fff;
    }

    .item img {
        width: 90%;
        margin: auto;
    }

    .main-menu {
        width: 70%;
        margin-left: 15%;
        margin-top: 13%;
        text-align: center;
        display: inline-flex;
    }
</style>
