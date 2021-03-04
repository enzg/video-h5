<template>
    <div id="app">
        <div id="notice" ref="notice" class="notice" @click="showPanel" v-show="false">
            <img :src="notice" width="100%"/>
        </div>
        <div ref="text-content">

        </div>

        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                notice: require('./assets/OI/notice.png'),
                positionX: '400px',
                positionY: '300px'
            }
        },
        mounted () {

        },
        methods: {
            showPanel () {
                this.$refs.notice.style.left = this.positionX
                this.$refs.notice.style.top = this.positionY
            }
        }
    }
</script>

<style>


    html {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    body {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
    }



    #app {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        float: left;
    }
</style>
