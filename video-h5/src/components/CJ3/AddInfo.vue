<template>
    <div class="main-container bg">
            <div class="title">物业管理法律纠纷虚拟仿真项目课堂思考题</div>
        <div class="item-content">
            <span>1.本虚拟仿真实验教学项目案例中物业服务企业的失职之处有哪些?</span>
            <textarea v-model="text1"></textarea>
        </div>
        <div class="item-content">
            <span>2.物业服务企业如何加强对消防设备设施的管理</span>
            <textarea v-model="text2"></textarea>
        </div>
        <div @click="submit" class="submit">提交</div>
    </div>
</template>

<script>
  export default {
    name: 'AddInfo',
      data(){
        return{
            text1:"",
            text2:""
        }
      },
      methods:{
        submit(){
            if (this.text1 !== null && this.text1 !== '') {
                this.g.score+=8
                this.g.t1=true
            }
            if (this.text2!== null && this.text2 !== '') {
                this.g.score+=8
                this.g.t2=true
            }
            if (this.g.t1 && this.g.t2) {
                this.g.costTime=parseInt(((Date.parse(new Date())-this.g.startTime)/1000/60)+60)
                this.g.finished=true
                this.$router.push("/Result")
            }

        }
      }
  }
</script>

<style scoped>
.title{
    margin:auto;
    padding:20px;
    background-color: rgba(0,0,0,0.8);
    color:#fff;
    font-size:16px;
    font-weight:bold;
    border-radius:5px;
    width:400px;
    margin-top:5%;
    text-align:center;
}
    .item-content{
        width:70%;
        margin:auto;
        background-color: rgba(0,0,0,0.8);
        margin-top:50px;
        border-radius:10px;
    }
    .item-content span{
        color:#fff;
        margin:1%;
    }
    .item-content textarea{
        width:98%;
        height:200px;
        margin:1%;
        border-radius:5px;
    }
    .submit{
        width:100px;
        background-color: rgba(0,0,0,0.8);
        text-align:center;
        color:#fff;
        margin:auto;

        margin-top:20px;
        padding:10px;
        border-radius:5px;
        font-weight:bold;
        cursor:pointer;
    }
</style>
