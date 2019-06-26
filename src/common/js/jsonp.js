import originJSONP from 'jsonp'

// 封装jsonp方法
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {

        // 把 调用 originJSONP() 成功之后的 data保存到 promise对象上
        // 外部调用 promise.then(res => { xxx } )  就能拿到返回的数据  res
        resolve(data)   
        
      } else {
        reject(err)
      }
    })
  })
}

// 把 传参的 data对象 key value值 在url上做拼接处理
function param(data) {
  let url = ""
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
