<template>
    <div>
        <!--问题内容-->
        <el-card class="questionHat-card">
            <div class="questionHat-content">
                <div class="questionHat-content-main">
                    {{qTitle}}
                    <p>{{qContent}}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias animi architecto aspernatur beatae error eum facilis fugiat mollitia nam nemo nesciunt pariatur porro, possimus quis repellendus reprehenderit vitae voluptatem?
                    </p>
                </div>
                <div class="questionHat-content-bottom">
                    <el-button  @click="windowFlip" plain>
                        <div v-if="clickCount != 0">写回答</div>
                        <div v-else>关闭窗口</div>
                    </el-button>
                    <el-button type="text" class="bottom-link-unit share-unit" icon="el-icon-share">
                        分享
                    </el-button>
                    <el-button type="text" class="bottom-link-unit favorite-unit" icon="el-icon-star-on">
                        收藏
                    </el-button>
                    <el-button type="text" class="bottom-link-unit like-unit" icon="el-icon-thumb">
                        喜欢
                    </el-button>
                    <el-button type="text" class="bottom-link-unit checkmore-unit" icon="el-icon-more"></el-button>
                </div>
            </div>

            <div class="questionHat-content-side">
                <div class="numberBoard-itemName">浏览数</div>
                <div class="numberBoard-itemValue">{{viewCount}}</div>
            </div>
        </el-card>

        <!--回复框-->
        <div class="mdEditor" v-if="windowOpen">
            <!--        <mavon-editor ref="editor" v-model="doc"> </mavon-editor>-->
            <mavon-editor
                    class="editorWindow"
                    v-model = 'doc'
                    ref=md
                    @change="change"
                    @imgAdd="$imgAdd" @imgDel="$imgDel"
                    :toolbars="toolbars"
            />
            <div class="sendReplyBtn">
                <el-button type="primary" @click="sendReply">提交回答</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import ReplyBlock from "./ReplyBlock";

    export default {
        name: "QuestionHatBlock",
        components: {
            ReplyBlock,
        },
        props: {
            qId: "",
            qTitle: "",
            qContent: "",
            viewCount:"",

        },
        inheritAttrs: false,
        data() {
            return {
                windowOpen: false,
                clickCount: 1,
                /*For Mavon*/
                doc:'', // 输入的markdown
                html:'',    // 转成的html
                userId: 88,
                username: "我是新回答",
                toolbars:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
            };

        },
        methods: {
            windowFlip (){
                this.windowOpen = !this.windowOpen;
                this.clickCount = (this.clickCount + 1) % 2;
            },
            /*For Mavon*/
            $imgAdd(pos, $file) {
                console.log(pos);
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.$http({
                    url: 'http://39.106.210.255:9092/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data'},
                }).then((res) => { /*返回的数据于res中*/
                    console.log(res);
                    let _res = res.data;
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    this.$refs.md.$img2Url(pos, res.data.data);
                })
            },
            $imgDel(pos) {
                delete this.img_file[pos];
            },

            change(value, render) {
                //实时获取转成html的数据
                this.html = render
                console.log(this.html)
                console.log("userID: " + this.userId);
            },

            sendReply() {
                /*发送数据给后端*/
                this.$http.post('http://114.116.144.179:9091/reply', {
                    questionId: this.qId,
                    userId: this.userId,
                    content: this.html,
                });
                //     .then((res)=>{
                //     // console.log(res);
                //     // console.log(this.resList);
                //     if(res.data.code != 200)
                //         return this.$message.error('获取失败');
                //     let data=res.data.data;
                //     let inCardNum = data.length;
                //     this.cardID += inCardNum;
                //     this.totalCardsNum += inCardNum;
                //     for (let i = 0; i < inCardNum; i++) {
                //         console.log(data[i]);
                //         this.resList.push(data[i]);
                //     }
                //     // this.resList=data;
                // });
                /*前端展示信息*/
                let newArticle = {
                    qid: this.qId,
                    userId: this.userId,
                    content: this.html,
                    username: this.username,
                };
                this.$emit('addNewArticle', newArticle);
                this.windowFlip();
            },
        },
    }
</script>

<style scoped>
    .questionHat-card {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
    }

    .questionHat-content {
        /*border: #2e2e2e 1px solid;*/
        width: 80%;
        float: left;
        /*height: 100%;*/
        padding: 10px 15px;
        box-sizing: border-box;
    }

    .questionHat-content-main {
        /*border: #2e2e2e 1px solid;*/
        font-size: 26px;
        font-weight: 700;
        line-height: 32px;
        color: #1a1a1a;
        text-align: left;
    }

    .questionHat-content-main p {
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
    }

    .questionHat-content-side {
        /*border: #2e2e2e 1px solid;*/
        width: 20%;
        box-sizing: border-box;
        /*padding-left: 30px;*/
        box-sizing: border-box;
        float: right;

    }

    .numberBoard-itemName {
        font-size: 15px;
        color: #9fadc7;
    }

    .numberBoard-itemValue {
        font-size: 25px;
        font-weight: 500;
        color: #1a1a1a;
    }

    .questionHat-content-bottom {
        display: flex;
        align-items: center;
        /*盒子*/
        padding: 10px 20px;
        margin: -10px -20px -10px;
        color: #646464;
    }

    .el-button {
        margin-right: 15px;
        font-size: 16px;
        font-weight: 600;
    }

    .sendReplyBtn {
        display: flex;
        justify-content: flex-end;
    }
</style>