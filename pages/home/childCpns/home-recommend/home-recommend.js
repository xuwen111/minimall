// pages/home/childCpns/home-recommend/home-recommend.js
Component({
  properties: {
    list: {
      type:Array,
      value: []
    }
  },
  data: {
    isLoaded: false
  },
  methods: {
    imageLoad(){
      if(!this.data.isLoaded){
        this.triggerEvent("imageLoad")
        this.data.isLoaded = true
      }
    }
  }
})
