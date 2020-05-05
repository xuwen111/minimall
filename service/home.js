import request from './network.js'

//轮播图、推荐数据请求
export function getMultiData(){
  return request({
    url: '/home/multidata'
  })
}

//商品goods数据请求
export function getGoods(type, page){
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}