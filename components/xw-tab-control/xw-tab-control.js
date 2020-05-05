// components/xw-tab-control/xw-tab-control.js
Component({
  properties: {
    titles: {
      type:Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleClickItem(event){
      //获取点击 item 的 index
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('handleClickItem', {index: this.data.currentIndex}, {})
    },
    setCurrentIndex(index){
      this.setData({
        currentIndex: index
      })
    }
  }
})
