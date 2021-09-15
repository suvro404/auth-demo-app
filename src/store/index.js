import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  modules: {
    auth
  }
});

export default store
