/**
 * vuex状态管理入口
 */
import storage from '../utils/storage';
import mutations from './mutations';
import { createStore } from 'vuex';


// 创建状态
const state = {
  // 初始为空，如果本地存储有的话，就从本地存储的用户信息
  userInfo : {} || storage.getItem("userInfo")
}

// 创建一个VUEx的实例
export default createStore({
  // 传入两个参数，一个是状态，一个是变化
  state,
  mutations
})