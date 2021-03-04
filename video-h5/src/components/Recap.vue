<template>
 <div>
        <slide-verify 
          :l="42"
          :r="10"
          :w="310"
          :h="155"
          @success="onSuccess" 
          @fail="onFail"      
          @refresh="onRefresh"
          :slider-text="text">
        </slide-verify>
    </div>

</template>

<script>

export default {
    data(){
      return {
        text:'向右拖动滑块填充拼图', //滑块底部文字
      }
    },
    methods: {
      onSuccess() {
        console.log('验证成功的回调')
        // 清空 recap localstorage
        // 重定向到login
        localStorage.setItem('recap','LOGIN')
        this.$router.push('/')
      },
      onFail() {
        console.log('验证失败的回调')
      },
      onRefresh() {
        console.log('按钮刷新的回调')
      }
    }
  }
</script>

<style>

</style>