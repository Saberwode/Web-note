/**
 * 对localStorage进行封装
 */

import config from '../config';
export default{
  // 添加内容
  setItem(key,val){
    let storage = this.getStorage();
    storage[key] = val;
    window.localStorage.setItem(config.namespace,JSON.stringify(storage));
  },
  // 获取内容
  getItem(key){
    return this.getStorage()[key];
  },
  // 获取命名空间的数据
  getStorage(){
    return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
  },
  // 删除某内容
  clearItem(key){
    let storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.namespace,JSON.stringify(storage));

  },
  // 删除所有
  clearAll(){
    window.localStorage.clear()
  }
}









