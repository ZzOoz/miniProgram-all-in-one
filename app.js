//app.js

import Touches from './utils/touches.js'

App({
  onLaunch: function () {
    (async () => {
      const p = await new Promise(resolve => {
          setTimeout(() => resolve("hello async/await"), 1000);
      });
      console.log(p);
  })();
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        var a = e.model;
        if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1) { //是不是包含iphoneX
          that.globalData.isIphoneX = true
        } else {
          that.globalData.isIphoneX = false
        }
      }
    })
  },
  globalData: {
    isIphoneX: false
  },
  // 向左滑動效果
  Touches: new Touches()
})