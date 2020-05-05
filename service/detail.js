import request from './network.js'

// 获取商品详情数据
export function getDetailData(iid){
  return request({
    url: '/detail',
    data:{
      iid
    }
  })
}

//获取详情页推荐数据
export function getRecommend(){
  return request({
    url: '/recommend'
  })
}

//基本信息汇总 类
export class BaseInfo {
  constructor(itemInfo, columns,services){
    this.detaiImage = itemInfo.topImages
    this.title = itemInfo.title
    this.price = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discountBgColor = itemInfo.discountBgColor
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.address = itemInfo.extra.sendAddress
    this.services = services
  }
}
//店铺信息汇总 类
export class ShopInfo {
  constructor(shopInfo){
    this.shopLogo = shopInfo.shopLogo
    this.shopName = shopInfo.name 
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score =shopInfo.score
  }
}

