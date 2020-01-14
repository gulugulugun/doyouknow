<template>
    <div>
        <div class="home-list-wrapper">
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
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import CardBlock from "./CardBlock";
    export default {
        name: "HomeBlock",
        components: {
            CardBlock,
        },
        data() {
            return {
                cardID:"0",
                resList: [],
                totalCardsNum: 0,
            };
        },

        created() {
            this.getCards();
        },

        methods: {
            getCards() {
                this.$http.get('home')
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
        },
    }
</script>

<style scoped>
    .home-list-wrapper {
        height: 100%;
        /*max-height: 650px;*/
        overflow-y: auto;

    }
</style>