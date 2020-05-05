// pages/detail/detail.js
import {getDetailData,getRecommend, BaseInfo, ShopInfo} from '../../service/detail.js'
//App实例对象
const app = getApp()

Page({
  data: {
    iid: '',
    titles: ['商品', '参数', '评价', '推荐'],
    topPosition: 0,

    swiperImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    detailParams: {},
    detailComments: {},
    detailRecommend: []
  },
  onLoad: function (options) { 
    this.setData({
      iid: options.iid
    })
    //1.获取详情页的基本数据
    this._getDetailData()
    //2.获取详情页的推荐数据
    this._getRecommend()
  },

//------------------------------------- 向服务器请求数据 -------------------------------------
  _getDetailData(){
    getDetailData(this.data.iid).then(res => {
      const data = res.data.result
      // console.log(data);
      const swiperImages = data.itemInfo.topImages
      const baseInfo = new BaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      const shopInfo = new ShopInfo(data.shopInfo)
      const detailInfo = data.detailInfo
      const detailParams = data.itemParams
      const detailComment = data.rate
      this.setData({
        swiperImages: swiperImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        detailParams: detailParams,
        detailComments: detailComment
      })
    })
  },
  _getRecommend(){
    getRecommend().then(res => {
      this.setData({
        detailRecommend: res.data.data.list
      })
    })
  },

//------------------------------------- 事件监听 -------------------------------------
  scrollPosition(){
  },
  addCart(){
    //1.创建选中对象
    const obj = {}
    obj.iid = this.data.iid
    obj.title = this.data.baseInfo.title
    obj.image = this.data.detailInfo.detailImage[0]
    obj.price = this.data.baseInfo.price
    //2.调用app的addCart()
    app.addCart(obj)
    //3.添加成功后，显示toast
    wx.showToast({
      title: '添加购物车成功',
      duration: 2000
    })
  }

})