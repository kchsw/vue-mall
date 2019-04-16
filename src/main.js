import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './viewport.js'
import axios from 'axios'
import filter from './api/filter.js'
import 'normalize.css'

import { Loading, Tab, Tabs, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Button, Row, Col, Icon, Swipe, SwipeItem, Lazyload, List, Field, NavBar, CellGroup, Toast } from 'vant'
Vue.use(Loading).use(Tab).use(Tabs).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Button).use(Row).use(Col).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(CellGroup).use(Toast)

Vue.config.productionTip = false
Vue.prototype.$http = axios
for(let key in filter){
	Vue.filter(key, filter[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
