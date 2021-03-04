<template>
    <div class="main-login">
        <div class="login-title">
            福建江夏学院物业管理法律纠纷案例场景还原,隐患分析与仿真演练实验
        </div>
        <div class="login-container">
            <div class="left-logo">
                <img src="../assets/OI/logo.png" width="80%">
            </div>
            <div class="right-form">
                <ul>
                    <li>
                        <input type="text" class="form-item" name="username" v-model="username" placeholder="用户名"/>
                    </li>
                    <li>
                        <input type="password" class="form-item" name="password" v-model="password" placeholder="密码"/>
                    </li>
                    <li v-show="register_mode">
                        <input type="password" class="form-item" name="password2" v-model="password2"
                               placeholder="再次输入密码"/>
                    </li>
                    <li>
                        <div class="handler-item">
                            <span style="float:left"> <input type="checkbox" name="remember_me"/>记住密码</span>
                            <span style="float:right"><a href="#" @click="register">{{reg_txt}}</a></span>
                        </div>
                    </li>
                    <li>
                        <button @click="login">{{txt}}</button>
                    </li>
                    <li>
                        <button @click="toIndex">专家入口</button>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data () {
            return {
                register_mode: false,
                txt: '立即登录',
                reg_txt:'注册账号',
                username: '',
                password: '',
                password2: ''
            }
        },
        methods: {
            toIndex () {
                this.g.startTime = Date.parse(new Date())
                this.$router.push('/Index')
            },
            login () {
                // 从localstorge 中检查 recap标志位 如果为true 则跳转 recap页面
                // 
                if (this.register_mode) {
                    //调用注册 /UESTC/API/ Reg.aspx? LoginName=用户名& PassWord= 密码&ConPassWord=密码
                    console.log(' /UESTC/API/Reg.aspx?LoginName=' + this.username + '&PassWord=' + this.$md5(this.password) + '&ConPassWord=' + this.$md5(this.password2))
                    axios.get('/API/Sys/Reg.aspx', {
                        params: {
                            LoginName: this.username,
                            PassWord: this.$md5(this.password),
                            ConPassword: this.$md5(this.password2)
                        }
                    }).then(res => {
                        if (res.data.Success=="true") {
                            alert("注册成功,请登录!")
                            this.register_mode=false
                            this.txt = '立即登录'
                            this.reg_txt='注册账号'
                        } else {
                            alert(res.data.Msg)
                        }
                    }).catch((e) => {
                        console.log(e)
                        alert("注册失败,请检查服务器设置!")
                    })
                } else {
                    //调用登录 /API/Login.aspx?LoginName=123&Password=123
                    console.log('/API/Sys/Login.aspx?LoginName=' + this.username + '&Password=' + this.$md5(this.password))
                    axios.get('/API/Sys/Login.aspx', {
                        params: {
                            LoginName: this.username,
                            PassWord: this.$md5(this.password)
                        }
                    }).then(res => {
                        if (res.data.Success=="true") {
                            this.$router.push('/Index')
                        } else {
                            alert(res.data.Msg)
                        }
                    }).catch((e) => {
                        console.log(e)
                        alert("登录失败,请检查服务器设置!")
                    })
                }

            },
            register () {
                this.register_mode = !this.register_mode
                if (this.register_mode) {
                    this.txt = '立即注册'
                    this.reg_txt='返回登录'
                } else {
                    this.txt = '立即登录'
                    this.reg_txt='注册账号'
                }
            }
        },
        mounted () {
            this.g.faseCount = 19
            this.g.trueCount = 0
            for (let i = 0; i < 19; i++) {
                this.g.scoreItem[i] = 0
            }
        }
    }
</script>

<style scoped>
    .main-login {
        width: 100%;
        height: 100%;
        background: url("../assets/OI/main.png") 100% 100% no-repeat;
        float: left;
    }

    .login-container {
        width: 50%;
        height: 50%;
        float: left;
        padding: 5%;
        margin-left: 20%;
        margin-top: 100px;
        border-radius: .3em;
        box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .5em 1em rgba(0, 0, 0, 0.6);
        text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
        background-color: rgba(0, 0, 0, 0.5);;
        padding-bottom: 0;
    }


    .login-container .left-logo {
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
    }

    .login-container .right-form {
        float: right;
        width: 50%;
        height: 100%;
        text-align: center;
    }

    .right-form .handler-item {
        height: 50px;
        line-height: 30px;
        color: #ffffff;
        font-size: 20px;
    }

    .handler-item input {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-top: 0;
        color: #4d8007;
    }

    .handler-item a {
        color: #fff;
        text-decoration: none;
    }

    .right-form ul {
        width: 80%;
        margin: auto;
        list-style: none;
    }

    .right-form ul li {
        display: block;
        height: 20%;
        margin-top: 15px;
    }

    .right-form .form-item {
        width: 100%;
        height: 50px;
        font-size: 20px;
    }

    .right-form button {
        width: 100%;
        background: #4d8007;
        height: 50px;
        color: #fff;
        border: 1px solid #4d8007;
        font-size: 20px;
        cursor: pointer;
    }

    .login-title {
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 45px;
        margin-top: 40px;
        float: left;
        font-weight: bold;

    }
</style>
