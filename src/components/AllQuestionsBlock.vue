<template>
    <div>
        <div class="infinite-list-wrapper"
             v-infinite-scroll="getMoreCards"
             infinite-scroll-disabled="scrollDisabled"
             infinite-scroll-distance="8">
            <ul style="list-style:none">
                <li v-for="(res, index) in resList" class="infinite-list-item">
                    <div>
<!--                        {{res.id}}-->
                        <card-block
                            :card-i-d="res.id"
                            :card-title="res.title"
                            :card-content="res.content"
                            :view-count="res.viewCount"
                        ></card-block>
                        <!--                              :view-count="res.viewCount"-->
                        <!--                              :card-title="res.title"-->
                    </div>

                </li>
            </ul>

            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>

<script>
    import CardBlock from "./CardBlock";
    import ArticleBlock from "./ArticleBlock";
    export default {
        name: "AllQuestionsBlock",
        components: {
            CardBlock,
            ArticleBlock,
        },
        data() {
            return {
                cardID:"100",
                CardLimit: 50,
                resList: [
                ],
                totalCardsNum: 0,
                loading: false,
            };
        },
        computed: {
            noMore() {
                return this.totalCardsNum >= this.CardLimit || this.cardID <= 0;
            },
            scrollDisabled () { /*true:关闭无限滚动；false:打开无限滚动；*/
                return this.loading || this.noMore
            },
        },

        methods: {
            getMoreCards() {
                // console.log(this.resList);
                this.loading = true;
                this.$http.get('questionlist/' + this.cardID,)
                    .then((res)=>{
                        // console.log(res);
                        // console.log(this.resList);
                        if(res.data.code != 200)
                            return this.$message.error('获取失败');
                        let data=res.data.data;
                        let inCardNum = data.length;
                        this.cardID -= inCardNum;
                        this.totalCardsNum += inCardNum;
                        for (let i = 0; i < inCardNum; i++) {
                            console.log(data[i]);
                            this.resList.push(data[i]);
                        }
                        // this.resList=data;
                        // console.log(this.resList[1].id);
                    })
                this.loading = false;
            },
        },
    }
</script>

<style scoped>
    .infinite-list-wrapper {
        height: 600px;
        /*max-height: 615px;*/
        overflow-y: auto;

    }
</style>