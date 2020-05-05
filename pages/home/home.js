import { getMultiData, getGoods } from '../../service/home.js'

const types = ['pop', 'new', 'sell']

// pages/home/home.js
Page({
  data: {
    banners: [],
    recommend: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    },
    //当前点击tab-control的index
    currentIndex: 0,
    currentType: 'pop',
    showTabTwo: false,
    showBackTop: false,
    tabControlTop: 0,
    topPosition: 0
  },
  onLoad: function (options) {
    //1.请求轮播图以及推荐数据
    this._getMultiData()
    //2.获取商品数据
    this._getGoods('pop')
    this._getGoods('new')
    this._getGoods('sell')

  },

  //--------------------------------------------网络请求数据相关函数----------------------------------------------
  _getMultiData(){
    getMultiData().then(res => {
      // 获取轮播图、推荐数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners: banners,
        recommend: recommends
      })
    })
  },
  _getGoods(type){
    //1)根据type，获取当前type的page
    const page = this.data.goods[type].page + 1
    //2)获取商品数据
    getGoods(type, page).then(res => {
      //2.1取出数据
      const list = res.data.data.list
      //2.2把数据添加到对应的type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      //2.3更改this.data.goods中数据
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })

    })
  },

// -----------------------------------------事件监听函数---------------------------------------------
  handleClickItem(event){
    const index = event.detail.index
    const type = types[index]
    this.setData({
      currentType: type
    })
    this.selectComponent(".tab-control1").setCurrentIndex(index)
    this.selectComponent(".tab-control2").setCurrentIndex(index)
    //判断tab-control是否停留，如果停留，goods-list需要向上scroll到goods-list的顶部
    if(this.data.showTabTwo){
      this.setData({
        topPosition: this.data.tabControlTop
      })
    }
  },
  imageLoad(){
    wx.createSelectorQuery().select(".tab-control1").boundingClientRect(rect => {
      this.data.tabControlTop = rect.top
      // console.log(this.data.tabControlTop)
    }).exec()
  },
  handleBackTop(){
    this.setData({
      showBackTop: false,
      topPosition: 0,
      showTabTwo: false
    })
  },
  loadMore(){
    //上拉加载 --> 请求当前index的新数据
    this._getGoods(this.data.currentType) 
  },
 
  // -----------------------------------------页面滚动监听---------------------------------------------
  scrollPosition(e) {
    // 1.获取滚动的顶部
    const position = e.detail.scrollTop;
    // console.log(position)
    // 2.设置是否显示
    const temp1 = position >= 1000
    if(temp1 !== this.data.showBackTop){
      this.setData({
        showBackTop: temp1
      })
    }
    //3.获取tab-control的位置
    wx.createSelectorQuery().select('.tab-control1').boundingClientRect((rect) => {
      // console.log(rect.top)
      const temp2 = rect.top < 0
      if(temp2 !== this.data.showTabTwo){
        this.setData({
          showTabTwo: temp2
        })
      }
    }).exec()
    //4.获取goods-list的位置
    wx.createSelectorQuery().select('.goods-list').boundingClientRect(rect => {
      console.log(rect)
    })
  }

})