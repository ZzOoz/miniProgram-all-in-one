// pages/leftSlide/leftSlide.js

const App = getApp()
import itemData from './mock.js'

Page({
  data: {
    itemData,
  },
  touchS: function (e) {  // touchstart
    // getClientX是获取触摸的横坐标
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  // 触摸移动时的情况
  touchM: function (e) {  // touchmove
    let itemData = App.Touches.touchM(e, this.data.itemData, this.data.startX)
    itemData && this.setData({ itemData })
  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let itemData = App.Touches.touchE(e, this.data.itemData, this.data.startX, width)
    itemData && this.setData({ itemData })
  },
  itemDelete: function (e) {  // itemDelete
    let itemData = App.Touches.deleteItem(e, this.data.itemData)
    itemData && this.setData({ itemData })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  }
})