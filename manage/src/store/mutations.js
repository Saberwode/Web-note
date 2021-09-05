/**
 * 获取变化
 */
import storage from '../utils/storage';


export default {
  saveUserInfo(state,userInfo){
    // 改变状态
    state.userInfo =  userInfo;
    // 将数据存入本地storage
    storage.setItem("userInfo",userInfo);

  }
}