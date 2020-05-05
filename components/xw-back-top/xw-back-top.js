// components/xw-back-top/xw-back-top.js
Component({
  properties: {

  },
  data: {

  },
  methods: {
    handleBackTop(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      })
    }
  }
})
