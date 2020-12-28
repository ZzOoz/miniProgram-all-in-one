const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#10C2C4",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/assets/images/ytm.png",
      selectedIconPath: "/assets/images/active_ytm.png",
      text: "首页",
      isSpecial: false
    }, {
      pagePath: "/pages/generationPoster/generationPoster",
      iconPath: "/assets/images/AddIcon.png",
      selectedIconPath: "/assets/images/AddIcon.png",
      text: "",
      isSpecial: true
    }, {
      pagePath: "/pages/logs/logs",
      iconPath: "/assets/images/profile.png",
      selectedIconPath: "/assets/images/active_profile.png",
      text: "我的",
      isSpecial: false
    }],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX
  },
  attached() {},
  methods: {
    switchTab(e) {
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      //如果是特殊跳转界面
      if (this.data.list[index].isSpecial) {
        wx.navigateTo({
          url: path
        })
      } else {
        //正常的tabbar切换界面
        wx.switchTab({
          url: path
        })
        this.setData({
          selected: index
        })
      }
    }
  }
})