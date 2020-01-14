<template>
    <div>
        <!--顶部，问题内容-->
        <question-hat-block
                :q-id="qid"
                :q-title="qTitle"
                :q-content="qContent"
                :view-count="viewCount"
                @addNewArticle="addArticleOnTop">
        </question-hat-block>
        <!--文章列表-->
        <div class="article-list-wrapper">
            <ul style="list-style:none">
                <li v-for="(res, index) in resList"
                    class="infinite-list-item">
                    <div>
                        <article-block
                                :user-i-d="res.userId"
                                :user-name="res.username"
                                :article-content="res.content"
                                avatarSrc="http://img4.imgtn.bdimg.com/it/u=4262210413,1909590547&fm=26&gp=0.jpg"
                        ></article-block>
                    </div>
                </li>
            </ul>
        </div>
        <!--回到顶部-->
        <el-backtop>
            <div style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                font-weight: bold;
                color: #1989fa;
                }">
                UP
            </div>
        </el-backtop>
    </div>
</template>

<script>
    import CardBlock from "./CardBlock";
    import ArticleBlock from "./ArticleBlock";
    import QuestionHatBlock from "./QuestionHatBlock";

    export default {
        name: "ArticleListBlock",
        components: {
            CardBlock,
            ArticleBlock,
            QuestionHatBlock,
        },
        created() {
            this.getQuery();
            this.getArticles();
        },

        data() {
            return {
                resList: [],
            }
        },
        props: {
            /*ArticleBlock和QuestionHat用*/
            qid:"",
            /*QuestionHat用*/
            qTitle:"",
            qContent:"",
            viewCount:"",
        },
        methods: {
            getQuery() {
                /*ArticleBlock和QuestionHat用*/
                this.qid = this.$route.query.qid;
                /*QuestionHat用*/
                this.qTitle = this.$route.query.qTitle;
                this.qContent = this.$route.query.qContent;
                this.viewCount = this.$route.query.viewCount;
            },

            getArticles() {
                this.$http.get('questionreplys/' + this.qid,)
                    .then((res)=>{
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
                    })
            },
            load () {
                this.$http.get('/upload', {params: this.cardQueryInfo})
                    .then((res)=>{
                        if(res.meta.status != 200)
                            return this.$message.error('获取失败');
                        this.resList.concat(res.data);
                    });
            },
            addArticleOnTop(newArticle) {
                console.log("是我: " + newArticle.username);
                this.resList.splice(0, 0, newArticle);
            },
        }
    }
</script>

<style scoped>
    .article-list-wrapper {
        margin: -7px 0 0;
        /*box-shadow: 0 1px 2px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
        box-sizing: border-box;
    }

    .pagination {
        /*box*/
        padding-top: 20px;


    }
</style>