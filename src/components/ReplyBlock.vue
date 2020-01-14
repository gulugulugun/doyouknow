<template>
    <div class="mdEditor">
<!--        <mavon-editor ref="editor" v-model="doc"> </mavon-editor>-->
        <mavon-editor
                class="editorWindow"
                v-model = 'doc'
                ref=md
                @change="change"
                @imgAdd="$imgAdd" @imgDel="$imgDel"
        />
        <div class="sendReplyBtn">
            <el-button type="primary" @click="sendReply">提交回答</el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ReplyBlock",
        data(){
            return {
                //
                // doc:'', // 输入的markdown
                // html:'',    // 转成的html
            }
        },

        props: {
            // qId: "",
            // content:"",
        },
        methods: {
            /* 获取图片函数 */
            // async getImg() {
            //     const res = await this.$http.get('/upload');
            //     console.log(res);
            // },
            // login() { /*本函数用于测试*/
            //     this.$http.get('/')
            //         .then(res=>console.log(res));
            // },
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {
                console.log(pos);
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.$http({
                    url: '/reply',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data'},
                }).then((res) => { /*返回的数据于res中*/
                    console.log(res);
                    let _res = res.data;
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    this.$refs.md.$img2Url(pos, this.$http.defaults.baseURL + res.data.data);
                })
            },
            $imgDel(pos) {
                delete this.img_file[pos];
            },

            change(value, render) {
                //实时获取转成html的数据
                this.html = render
                console.log(this.html)
            },
            // http://114.116.144.179:9091/reply
    // {
    //     'questionId': this.qId,
    //     'userId': this.userId,
    //     'content': this.html,
    // }
            sendReply() {
                // this.content = this.html;
                /*发送数据*/
                this.$http.post('http://114.116.144.179:9091/reply', {
                    questionId: this.qId,
                    userId: this.userId,
                    content: this.html,
                }).then((res)=>{
                        // console.log(res);
                        // console.log(this.resList);
                        if(res.data.code != 200)
                            return this.$message.error('获取失败');
                        let data=res.data.data;
                        let inCardNum = data.length;
                        this.cardID += inCardNum;
                        this.totalCardsNum += inCardNum;
                        for (let i = 0; i < inCardNum; i++) {
                            console.log(data[i]);
                            this.resList.push(data[i]);
                        }
                        // this.resList=data;
                        // console.log(this.resList[1].id);
                    });
                /*保存信息*/
                this.$emit('addArticleOnTop', this.qId, this.userId, this.html);
            },
        }
    }
</script>

<style scoped>
    .mdEditor {
    }

    .editorWindow {
    }



    .el-button {
        margin-right: 15px;
        font-size: 16px;
        font-weight: 600;
    }
</style>