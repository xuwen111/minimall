// pages/profile/profile.js
Page({
  data: {
    imagePath: ''
  },
  handleChooseImage(){
    wx.chooseImage({
      complete: (res) => {
        this.setData({
          imagePath: res.tempFilePaths[0]
        })
        
      },
    })
  }
})