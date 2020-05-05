//app.js
App({
  onLaunch: function (options) {
    // wx.getUserInfo({
    //   success: function(res){
    //     console.log(res); 
    //   }
    // })
  },
  //定义全局变量，存储购物车的商品
  globalData: {
    cartList: []
  },
  //--------------------------------------------------- 事件监听 -----------------------------------------------
  //1.监听“添加购物车”的点击
  addCart(obj){
    //1.1判断obj是否已经加入购物车
    const oldProduct = this.globalData.cartList.find(item => item.iid ===obj.iid)
    if(oldProduct){
      oldProduct.count += 1
    } else{
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
    // console.log(this.globalData.cartList);
    //1.2 调用全选点击
    this.clickAll(true)
    //1.3执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },
  //2.减少购物车内商品的数量
  reduceCount(obj){
    const oldProduct = this.globalData.cartList.find(item => item.iid ===obj.iid)
    if(oldProduct){
      oldProduct.count -= 1
    }
    //2.1执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },
  //3.更改cartList中goods的状态
  changeGoodsState(goods, index){
    const temp = this.globalData.cartList[index]
    this.globalData.cartList[index].checked = !temp.checked
    console.log(temp.checked);
    
    //3.1执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  },
  //4.全选按钮的点击监听
  clickAll(temp){
    for(let item of this.globalData.cartList){
      item.checked = temp
    }
    //1.1执行购物车回调函数
    if(this.addCartFunction){
      this.addCartFunction()
    } 
  }
})

