import Vue from 'vue'
import Vuex from 'vuex'

import flowData from "./flowData"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flowData
  }
})
