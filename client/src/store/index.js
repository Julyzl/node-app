import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex)

const state = {
    isAuthenticated: false, // 是否认证登录
    user: {}, // 用户登录信息
    profile: {}, // 用户个人信息
    loading: false, // 是否加载动画 
    profiles: [] // 开发者信息

}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})