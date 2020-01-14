<template>
    <div class="back">
                <img src="https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png" class="logo"/>
                <card class="form-container" width="400px" height="350px">

                    <div class="login-form" :v-loading="loading">
                        <div class="title">登录</div>
                        <div>
                            <el-input class="login-input" placeholder="用户名" v-model="username"></el-input>
                            <el-input type="password" class="login-input" placeholder="密码" v-model="password"></el-input>
        <!--                    <el-link :underline="false" class="login-link">忘记密码</el-link>-->
                            <el-button :disabled=disabled class="login-button" type="primary" @click="test">注册/登录</el-button>

                        </div>
                        <!--                <el-button class="login-button"  @click="login2">使用github登陆</el-button>-->
                        <a  href="https://github.com/login/oauth/authorize?client_id=193f40b1e9134a9abfcb" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">>使用github登陆</a>
                    </div>

                </card>
        <el-button>button</el-button>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import Card from "@/components/Card";
    import axios from "axios";
    import auth from "../network/auth";
    import store from "../store";
    import api from "../network/api";

    export default {
        name: "Login",
        components: {Card},
        data() {
            return {
                username: "",
                password: "",
                disabled: false,
                token:'',
                fullscreenLoading:false,
            }
        },

        created() {

            let token = this.getQueryVariable("token");
            console.log(token);
            if(token!=false) {
                this.$message("if")
                this.token = token;
                localStorage.setItem("auth",token)
                this.$router.push("/nav")
                // store.state.Authorization=token
                // store.commit('changeLogin', this.token);
            }else{
                token=localStorage.getItem('auth')
                if(token){
                    this.$router.push("/nav")
                }
            }
        },

        methods: {
            ...mapMutations(['changeLogin']),

            test(){
                console.log(store.state.Authorization);
                api.get("/test").then(res=>console.log(res))

                _this.changeLogin("qwe")

            },
            login() {

                let _this = this;
                if (this.username === '' || this.password === '') {
                    this.$message.error('账号或密码不能为空');
                } else {
                    this.disabled = true;
                    auth({
                        method: 'post',
                        url: '/login',
                        data: {
                            username: this.username,
                            password: this.password,
                        },
                    }).then(res => {
                        this.token = res.data.data;
                        // this.token='111111';
                        // alert('在这儿了')

                        // 将用户token保存到vuex中
                        // _this.changeLogin(this.token);
                        // _this.$router.push('/login');
                        if (res.data.code == 200) {
                            localStorage.setItem("auth",res.data.data)
                            this.$message.success('登陆成功');
                            console.log("local:" + localStorage.getItem("Authorization"));
                        } else {
                            this.$message('账号或密码错误');

                        }

                    }).catch(error => {
                        console.log(error);

                    }).finally(() => this.disabled = false)

                }

            },
            getQueryVariable(variable)
            {
                let query = window.location.search.substring(1);
                let vars = query.split("&");
                for (let i=0;i<vars.length;i++) {
                    let pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
            openFullScreen() {
                this.fullscreenLoading = true;
                // setTimeout(() => {
                //     this.fullscreenLoading = false;
                // }, 2000);
            },

        },

    }
</script>

<style scoped>
    .back {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-image: url(http://1901210519.zhangqx.com/img/bg.png);
        background-repeat: no-repeat;
        /*background-color: #b8e5f8;*/
        background-size: cover;
        width: 100%;
        height: 100vh;
        overflow: auto;
    }

    .logo {
        width: 128px;
        height: 81px;
        margin-bottom: 24px;
        margin-top: 47px;
    }

    .title {
        color: #1a1a1a;
        font-weight: 600;
        position: relative;
        margin-left: 0;
    }

    .form-container {
        margin: 0 auto;
    }

    .title {
        display: flex;
        color: #1a1a1a;
        font-weight: 600;
        font-synthesis: style;
        height: 60px;
        line-height: 60px;
    }

    .login-form {
        margin-left: 20px;
        margin-right: 20px;
    }

    .login-input {
        margin-top: 20px;
    }

    .login-button {
        margin-top: 20px;
        width: 100%;
        font-size: 14px;
    }

    .login-link {
        float: right;
        margin-top: 15px;
        color: #8590a6;
        font-size: 14px;
    }
</style>