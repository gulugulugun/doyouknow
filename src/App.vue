<template>
    <div id="app">
<!--        <main-block></main-block>-->
        <!--路由占位符-->
        <router-view></router-view>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
<script>


  import CardBlock from "./components/CardBlock";
  import ArticleBlock from "./components/ArticleBlock";
  import AllQuestionsBlock from "./components/AllQuestionsBlock";
  import HomeBlock from "./components/HomeBlock";
  import QuestionHatBlock from "./components/QuestionHatBlock";

  export default {
      components: {
          CardBlock,
          ArticleBlock,
          HomeBlock,
          AllQuestionsBlock,
          QuestionHatBlock,
      }
  }
</script>