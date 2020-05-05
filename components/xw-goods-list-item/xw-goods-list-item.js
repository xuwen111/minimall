// components/xw-goods-list-item/xw-goods-list-item.js
Component({
  properties: {
    goodsItem: {
      type: Object,
      value: {}
    }
  },
  methods: {
    goodsItemClick(e){
      const iid = this.data.goodsItem.iid
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }
  }
})
