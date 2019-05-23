import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  isLogin: false,
  isStudent: false,
  isTeacher: false,
  isAdmin: false
}

const getters = {
  getIsLogin (state) {
    return state.isLogin
  },
  getIsStudent (state) {
    return state.isStudent
  },
  getIsTeacher (state) {
    return state.isTeacher
  },
  getIsAdmin (state) {
    return state.isAdmin
  }
}

const mutations = {
  setIsLogin (state, status) {
    state.isLogin = status
  },
  setIsStudent (state, status) {
    state.isStudent = status
  },
  setIsTeacher (state, status) {
    state.isStudent = status
  },
  setIsAdmin (state, status) {
    state.isAdmin = status
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
