import Vue from 'vue'
import VueRouter from 'vue-router'
import CardBlock from "../components/CardBlock"
import ArticleListBlock from "../components/ArticleListBlock";
import ReplyBlock from "../components/ReplyBlock";
import HomeBlock from "../components/HomeBlock";
import AllQuestionsBlock from "../components/AllQuestionsBlock";
import QuestionHatBlock from "../components/QuestionHatBlock";

Vue.use(VueRouter)

const routes = [
  // {path: '/', redirect: '/all_questions'},
  {path: '/home', component: HomeBlock},
  {path: '/all_questions', component: AllQuestionsBlock},
  {path: '/article_lists', component: ArticleListBlock},
  {path: '/reply', component: ReplyBlock},
  {path: '/card', component: CardBlock},
  {path: '/question_hat', component: QuestionHatBlock},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
