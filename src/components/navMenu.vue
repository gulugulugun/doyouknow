<template>
    <div>
        <el-form :inline="true" >
            <el-row>
                <el-form-item>
                    <span class="title" >知乎</span>
                </el-form-item>
                <el-form-item>
                    <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"

                            text-color=black
                            active-text-color="#0084ff">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">发现</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3" >等你来答</el-menu-item>
                    </el-menu>
                </el-form-item>
                <el-form-item>
                    <el-input class="search" v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="test">提问</el-button>
                </el-form-item>
                <el-form-item>
                    <i class="el-icon-message-solid"></i>
                </el-form-item>
                <el-form-item>
                    <i class="el-icon-chat-round"></i>
                </el-form-item>
                <el-form-item>
                    <i class="el-icon-user"></i>
                </el-form-item>
                <el-form-item>
                    <i class="el-icon-circle-close" @click="quit"></i>
                </el-form-item>

            </el-row>
        </el-form>
    </div>


</template>

<script>
    import api from "../network/api";

    export default {
        name:"navMenu",
        created() {
            let token = localStorage.getItem('auth')
            console.log(token);
            if(token) {
                this.token = token;
                let userString=window.atob(token.split('.')[1])
                let user=JSON.parse(userString)
                this.username=user.sub
                alert(this.username)
            }
        },

        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                input:'',
                username:''
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            } ,
            open() {
                this.$prompt('写下你的问题', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    //inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '正在检索：' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            quit(){
                localStorage.removeItem("auth");
                this.$router.push("/login")
            },
            test(){
                api.get("/test").then(res=>console.log(res))
            }
        }
    }

</script>
<style>
    .title{
        /*float: left;*/
        width: 100px;
        color: black;
        /*border-width: 1px;
        border-style: solid;
        border-color: red;*/
        text-decoration: none;
        height: 60px;
        line-height: 60px;
        /*background-color: #545c64;*/
    }
    .el-menu-demo{
        /*float: left;*/
        /*width: 30%;*/
        /*border-width: 1px;
        border-style: solid;
        border-color: red;*/
        height: 100%;
        line-height: 60px;
    }
    .search{
        width: 326px;
        /*float: left;*/
        /*width: 40%;*/
        /*height: 100%;*/
        /*background-color: #545c64;*/
    }
</style>