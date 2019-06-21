// config.js 配置 接口的公共参数

// 公共参数，qq音乐的接口有些参数是固定不变的，存为公共参数
export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// jsonp 传给接口的回调名称
export const options = {
  param: 'jsonpCallback'
}

// 所有接口请求成功的返回值是 0
export const ERR_OK = 0