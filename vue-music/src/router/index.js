import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: recommend,
      name: 'recommend'
    }, {
      path: '/singer',
      component: singer,
      name: 'singer',
      children: [
        {path: ':id', component: singerDetail}
      ]
    }, {
      path: '/rank',
      component: rank,
      name: 'rank'
    }, {
      path: '/search',
      component: search,
      name: 'search'
    }
  ]
})
