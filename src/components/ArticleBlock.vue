<template>
    <div class="list-item">
        <div class="list-header">
            <div class="avatar_box">
                <img :src="avatarSrc"
                     alt="avatar image">
            </div>
            <a href="" class="header-title">{{userName}}</a>
        </div>
        <div class="list-body" v-html="articleContent">
            {{articleContent}}
        </div>
        <div class="bottom-bar">
            <span class="voteAndUndo-unit">
                <el-button class="vote-unit Button vote-Button" @click="articleVoteClick()" icon="el-icon-arrow-up" >
                赞同 {{clickArticle}}
                </el-button>
                <el-button class="undo-unit Button undo-Button" @click="articleUndoClick()" icon="el-icon-arrow-down">
                </el-button>
            </span>
            <div class="bottom-link-unit reply-unit">
                <el-link :underline="false" icon="el-icon-edit" href="/reply" target="_blank">回复</el-link>
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
        name: "ArticleBlock",

        data(){
            return {
                clickArticle: 0,
            }
        },
        props:{
            userName:"",
            articleContent:"",
            avatarSrc:"",
        },
        methods: {
            articleVoteClick(){
                this.clickArticle++;
            },
            articleUndoClick(){
                if(this.clickArticle > 0)
                    this.clickArticle--;
            },
        }
    }
</script>

<style scoped>
    .list-item {
        /*尺寸*/
        width: 80vw;
        /*偏移*/
        position: relative;
        /*top: 80px;*/
        left: 49%;
        right: 50%;
        transform: translate(-50%);
        /*盒子*/
        padding: 20px 30px;
        margin-bottom: 5px;
        /*border: 3px darkred dotted;*/
        box-shadow: 0 1px 2px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .list-header {
        /*尺寸*/
        width: 100%;
        /*layout*/
        display: flex;
        justify-content: flex-start;
        /* position */
        position: -webkit-sticky;
        position: sticky;
        top: 0px;
        /* box */
        padding: 10px 0px 5px;
        box-sizing: border-box;
        /*background*/
        background-color: #ffffff;
    }

    .avatar_box {
        /* size */
        height: 50px;
        width: 50px;
        /* box */
        border: 1px solid #eeeeee;
        border-radius: 40%;
        padding: 2px;
    }

    .avatar_box img {
        /* size */
        width: 100%;
        height: 100%;
        border-radius: 40%;
    }

    .header-title {
        /* box */
        padding: 2px;
        margin: 3px 4px;

        /* font */
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
        text-decoration: none;
        color: #1a1a1a;
    }

    .list-body {
        /* size */
        width: 100%;
        height: 100%;
        /* position */
        float: left;
        text-align: left;
        /* font */
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        text-decoration: none;
        color: #1a1a1a;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    .bottom-bar {
        /* position */
        position: -webkit-sticky;
        position: sticky;
        bottom: 0px;
        /* layout */
        display: flex;
        align-items: center;
        /* box */
        padding: 10px 20px 15px;
        margin: -10px -20px 10px;
        color: #646464;
        /* background */
        background-color: #ffffff;
        clear: both;
    }

    /*赞踩按钮*/
    .voteAndUndo-unit{
        height: 25px;
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