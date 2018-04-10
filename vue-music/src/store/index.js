import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutation from './mutation'
import * as getters from './getter'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production' // 开发模式下开启严格模式，线上不开启
export default new Vuex.Store({
  state,
  mutation,
  getters,
  strict: debug,
  plugins: [debug ? createLogger() : ''] // 仅在开发模式下有快照,线上不开启快照
})
