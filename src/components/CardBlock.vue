<template>
    <div class="card-container">
        <div class="top-bar">
            <el-button
                    type="text"
                    @click="jumpToArticles"
                    class="title-style">
                {{cardTitle}}
            </el-button>
            <span>{{viewCount}}位朋友看过</span>
        </div>
        <!--                <hr>-->
        <div class="middle-bar">
            <div class="text-pic">
                <img :src="cardPicSrc" alt="This is a image tag.">
            </div>

            <div class="question-abstract">
                <div class="text-content" itemprop="text">
                    {{cardContent}}
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dicta dolor dolorum eius, explicabo harum nostrum quas repudiandae saepe tenetur.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ex facilis illum iure laboriosam, libero maxime, modi perferendis qui quo quod ut voluptates. Accusantium animi, beatae distinctio doloribus harum hic nostrum officia optio quidem sit! Eos esse hic repudiandae ullam! Accusantium asperiores, commodi doloribus facere ipsam iure iusto libero, maiores molestias nobis nostrum officia possimus qui, reiciendis suscipit. Fugit, itaque vero. Accusantium, adipisci architecto aut beatae consectetur dolores eligendi harum illum impedit molestiae possimus quas quo ratione repellat reprehenderit, rerum saepe sapiente temporibus totam ullam unde ut, veritatis. Adipisci, aperiam consequatur cupiditate debitis provident qui repellat sint sunt voluptate. Ad, animi, at blanditiis cum cumque enim, ipsa nemo non obcaecati perspiciatis porro possimus rerum temporibus unde veniam. Assumenda autem, debitis distinctio dolores, esse harum id libero minus molestiae nobis obcaecati provident quia sunt suscipit tenetur totam veniam. Aspernatur assumenda cupiditate debitis eius inventore ipsum iste iusto magni mollitia. Aspernatur at dolorem doloremque earum ex nobis provident quidem sequi veniam vero. Doloribus excepturi molestias neque odit voluptate voluptatum. Ab adipisci aliquam assumenda aut beatae dolor ea earum est ex excepturi itaque labore minus molestiae nisi nostrum quis reprehenderit repudiandae saepe sint tenetur, ullam ut voluptas? Atque incidunt laborum tempore? Doloribus, ipsa?
                </div>
            </div>
        </div>
<!--                <hr>-->
        <div class="bottom-bar">
            <span class="voteAndUndo-unit">
                <el-button class="vote-unit Button vote-Button" @click="voteClick" icon="el-icon-arrow-up" >
                赞同{{click}}
                </el-button>
                <el-button class="undo-unit Button undo-Button" @click="undoClick" icon="el-icon-arrow-down">
                </el-button>
            </span>
            <div class="bottom-link-unit reply-unit">
                <el-link :underline="false" icon="el-icon-edit" href="https://www.cnki.net/" target="_blank">回复</el-link>
            </div>
            <div class="bottom-link-unit share-unit">
                <el-link :underline="false" icon="el-icon-share" href="https://www.cnki.net/" target="_blank">分享</el-link>
            </div>
            <div class="bottom-link-unit favorite-unit">
                <el-link :underline="false" icon="el-icon-star-on" href="https://www.baidu.com" target="_blank">收藏</el-link>
            </div>
            <div class="bottom-link-unit like-unit">
                <el-link :underline="false" icon="el-icon-thumb" href="https://www.cnki.net/" target="_blank">喜欢</el-link>
            </div>
            <div class="bottom-link-unit checkmore-unit">
                <el-link :underline="false" icon="el-icon-more" href="https://www.cnki.net/" target="_blank"></el-link>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "CardBlock",
        data(){
            return {
                click:0,
                cardPicSrc:"data:image/jpeg;base64,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",

            }
        },
        props:{
            cardID:"",
            cardTitle:"",
            cardContent:"",
            viewCount:"",
        },
        methods: {
            voteClick(){
                this.click++
                const a = this.$http.post("upload")
            },
            undoClick(){
                if(this.click > 0)
                    this.click--;
            },
            jumpToArticles() {
                //传递的参数用{{ $route.query.Qid }}获取
                this.$router.push({ path:'/article_lists/',
                    query: {
                        qid: this.cardID,
                        qTitle: this.cardTitle,
                        qContent: this.cardContent,
                        viewCount: this.viewCount,
                    }
                })
            },
        }
    }
</script>


<style scoped>
    .main-column-card {
        /*偏移*/
        position: relative;
        top: 80px;
        left: 80px;
    }
    .card-container {
        /*盒子*/
        margin-left: 20px;
        margin-bottom: 5px;
        padding: 8px 20px 20px;
        /*border: 3px darkred dotted;*/
        box-shadow: 0 1px 2px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        /*border-bottom: 1px solid #2e2e2e;*/
        /*偏移*/
        position: relative;
        width: 80vw;
    }

    /*标题*/
    .top-bar {
        /*display*/
        display: flex;
        justify-content: space-between;
        /*偏移*/
        position: relative;
        /*float: left;*/
        text-align: left;
        /*字体*/
        font-size: 22px;
        font-weight: 600;
        /*font-synthesis: style;*/
        line-height: 1;
        color: #1a1a1a;
        /*盒子*/
        margin-top: -4px;
        margin-bottom: 0px;
        /*margin-right: 16px;*/
        /*margin-left: -4px;*/
    }

    .top-bar span {
        font-size: 1px;
        color: #9fadc7;
        height: 10px;
        /*border: 5px solid #2e2e2e;*/
        padding-top: 22px;
    }

    .title-style {
        font-size: 20px;
        color: #2e2e2e;
    }

    /*知乎的top-bar*/
    .ContentItem-title {
        font-size: 18px;
        font-weight: 600;
        font-synthesis: style;
        line-height: 1.6;
        color: #1a1a1a;
        margin-top: 16px;
        margin-bottom: -4px;
        text-align:left;
    }

    h1, h2, h3 {
        margin: 0;
        font: inherit;
    }
    h2, .top-bar a{
        display: block;
        /*font-size: 1.5em;*/
        color: #1a1a1a;
        font-weight: bold;
        text-decoration: unset;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .top-bar a:hover {
        color: #2e69c2;
    }

    /*.top-bar a:visited {*/
    /*    color: dimgrey;*/
    /*}*/

    /*下半部分*/
    .middle-bar{
        position: relative;
        /*尺寸*/
        width: 100%;
        height: 120px;
        /*layout*/
        display: flex;
        justify-content: flex-start;
        /* box */
        padding: 0px 0px 5px;
        box-sizing: border-box;
    }
    .text-pic{
        /*偏移*/
        position: relative;
        width: 190px;
        height: 105px;
        /*盒子*/
        margin-top: 2px;
        margin-right: 18px;
        margin-bottom: 2px;

        float: left;
        overflow: hidden;
        background-position: 50%;
        background-size: cover;
        border-radius: 4px;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
    .text-pic img{
        /*偏移*/
        position: absolute;
        top:50%;
        left:50%;
        width:100%;
        /*height: 100%;*/
        -webkit-transform:translate3d(-50%,-50%,0);
        transform:translate3d(-50%,-50%,0);
    }
    /*关于文字框的设置*/
    .question-abstract{
        /*偏移*/
        /*size*/
        width: 100%;
        height: 90%;
        overflow: hidden;

    }
    /*关于文字本身的设置*/
    .text-content{
        text-align:left;
        word-break: break-word;
        line-height: 1.6;
    }
    .bottom-bar{
        display: flex;
        align-items: center;
        /*盒子*/
        padding: 10px 20px;
        margin: -10px -20px -10px;
        color: #646464;

        clear: both;
    }

    /*el-button {*/
    /*    height: 3px;*/
    /*    !*盒子*!*/
    /*    padding: 0 12px;*/
    /*    border-color: transparent;*/
    /*    !*内容*!*/
    /*    background: rgba(0,132,255,.1);*/
    /*    color: #666666;*/
    /*    line-height: 30px;*/
    /*}*/

    /*赞踩按钮*/
    .voteAndUndo-unit{
        height: 32px;
    }

    .vote-unit{
        padding: 0 12px;
    }

    .undo-unit{
        margin-left: 4px;
        padding: 0 12px;
    }

    .Button{
        display:inline-block;
        /*color:#606a80;*/
        /*盒子*/
        /*padding:0 16px;*/
        border:1px solid;
        border-radius:3px;
        /*字体*/
        font-size:14px;
        line-height:30px;
        color:#8590a6;
        text-align:center;
        cursor:pointer;
        background:none;
    }

    .Button:hover{
        background-color: firebrick;
        color: lightgrey;
        font-weight: bold;
    }

    .Button:focus {
        color: #555555;
        background-color: #ffffff;
        /*box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(0,132,255,.3);*/
        /*box-shadow:0 0 0 2px #1a1a1a, 0 0 0 4px rgba(58,118,208,.6);*/
    }

    .Button:disabled {
        cursor: default;
        opacity: 0.5;
        pointer-events: none;
    }

    .vote-Button{
        padding:0 10px;
        color:#3a76d0;
        background:rgba(58,118,208,.1);
        /*color:#0084ff;*/
        /*background:rgba(0,132,255,.1);*/
        border-color:transparent
    }

    .vote-Button:not(:disabled):hover{
        background-color:rgba(58,118,208,.15);
        /*background-color:rgba(0,132,255,.15);*/
    }

    .vote-Button:disabled:hover{
        background:#f6f6f6;
    }

    /*.vote-Button.is-active{color:#fff;background:#0084ff}*/
    .vote-Button.is-active{color:#ebebeb;background:#3a76d0}
    /*.vote-Button.is-active:hover{background-color:#0084ff}*/
    .vote-Button.is-active:hover{background-color:#3a76d0}

    .undo-Button{
        padding:0 10px;
        color:#3a76d0;
        background:rgba(58,118,208,.1);
        /*color:#0084ff;*/
        /*background:rgba(0,132,255,.1);*/
        border-color:transparent;
    }

    .undo-Button:not(:disabled):hover{
        background-color:rgba(58,118,208,.15);
        /*background-color:rgba(0,132,255,.15);*/
    }

    .undo-Button:disabled:hover{
        background:#f6f6f6;
    }

    .undo-Button.is-active{color:#ebebeb;background:#3a76d0}
    .undo-Button.is-active:hover{background-color:#3a76d0}

    /*给bottom的链接统一display*/
    .bottom-link-unit{
        display: flex;
        margin-left: 24px;

    }

    /*评论*/
    .reply-unit {

    }
</style>