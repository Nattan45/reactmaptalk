// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('userToken')
  },
  mutations: {
    LOGIN(state) {
      state.isAuthenticated = true
    },
    LOGOUT(state) {
      state.isAuthenticated = false
    }
  },
  actions: {
    login({ commit }) {
      commit('LOGIN')
    },
    logout({ commit }) {
      localStorage.removeItem('userToken')
      commit('LOGOUT')
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated
  }
})
