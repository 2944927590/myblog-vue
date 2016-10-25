import time from './time';

let BRAND = 'alsy-blog-cache';

let isSupported = () => {
  try {
    var ls = window.localStorage,
         j = JSON;
    return (ls && ls.getItem && ls.setItem && ls.removeItem && j && j.parse && j.stringify);
  } catch (e) {
    return false;
  }
}

/**
 * 写cache，支持链式写法
 * @param key
 * @param value
 * @param cacheTime
 * @param version
 * @returns {boolean}
 */
let setItem = (key, value, cacheTime, version) => {
  if(!isSupported() || !cacheTime){
    return false;
  }
  version = version || 0;
  cacheTime = cacheTime + time.now();
  var save = {
    value: value,
    cacheTime: cacheTime,
    version: version,
    brand: BRAND
  };
  window.localStorage.setItem(BRAND + '_' + key, JSON.stringify(save));
}

/**
 * 读cache 如果读不到返回null
 * @param key
 * @param version
 * @returns {*}
 */
let getItem = (key, version) => {
  if(!isSupported()) {
    return false;
  }
  version = version || 0;
  var save = JSON.parse(window.localStorage.getItem(BRAND + '_' + key));
  if(!save || !save.brand || (save.brand !== BRAND)) return null;
  if(save.version !== version) return null;
  if(save.cacheTime < time.now()){
    removeItem(key);
    return null;
  }
  return save.value;
}

/**
 * 删cache，支持链式写法
 * @param key
 * @returns {removeItem}
 */
let removeItem = (key) => {
  if(!isSupported()) {
    return false;
  }
  window.localStorage.removeItem(BRAND + '_' + key);
}


export default {
  getItem: getItem,
  setItem: setItem,
  removeItem: removeItem,
  isSupported: isSupported
};
