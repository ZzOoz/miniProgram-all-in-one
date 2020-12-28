const app = getApp()
Page({

  jsData: {
    columnsHeight: [0, 0],
    isLoading: false
  },
  data: {
    columns: [
      [],
      []
    ],
    tempPics: []
  },
  onLoad: function () {
    this.loadData()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log(this.getTabBar(), 'getTab')
      console.log('设置选中项 0')
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  // 加载数据
  loadData: function () {
    const that = this
    console.log(that.jsData.isLoading,'isLoading')
    if (!that.jsData.isLoading) {
      // wx.showLoading()
      this.jsData.isLoading = true // 显示加载中
      setTimeout(() => {
        const pics = []
        pics.push({
          pic: '/assets/images/1.jpg'
        })
        pics.push({
          pic: '/assets/images/2.jpg'
        })
        pics.push({
          pic: '/assets/images/3.jpg'
        })
        pics.push({
          pic: '/assets/images/1.jpg'
        })
        pics.push({
          pic: '/assets/images/4.jpg'
        })
        pics.push({
          pic: '/assets/images/2.jpg'
        })
        // 插入数据
        this.setData({
          tempPics: pics
        })
        console.log('插入數據了咩')
      },200)
    }
  },
  // 在image中定義獲取圖片最佳尺寸
  loadPic: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let tempPics = that.data.tempPics
    console.log(tempPics[index],'index')
    if (tempPics[index]) {
      console.log('temtem')
      tempPics[index].height = e.detail.height * 750 / e.detail.width
      tempPics[index].isLoad = true
    }

    this.setData({
      tempPics: tempPics
    }, function () {
      that.finLoadPic()
    })
  },
  //图片加载错误处理
  loadErrorPic: function (e) {
    const that = this,
      data = that.data,
      tempPics = data.tempPics,
      index = e.currentTarget.dataset.index
    if (tempPics[index]) {
      //图片加载错误时高度固定750，展示为正方形
      tempPics[index].height = 750
      tempPics[index].isLoad = true
    }
    that.setData({
      tempPics: tempPics
    }, function () {
      that.finLoadPic()
    })
  },
  // 最終加載的方法
  finLoadPic: function () {
    const that = this
    let tempPics = that.data.tempPics
    let length = that.data.tempPics.length
    var finish = true
    for (var i = 0; i < length; i++) {
      if (!tempPics[i].isLoad) {
        finish = false
        break
      }
    }
    console.log(finish,"??????")
    if (finish) {
      wx.hideLoading()
      console.log('finish???')
      if (that.jsData.isLoading) {
        that.jsData.isLoading = false
        that.renderPage()
      }
    }

  },
  // 渲染瀑布流
  renderPage: function () {
    const that = this
    let { tempPics, columns } = that.data
    let { columnsHeight } = that.jsData
    let length = tempPics.length
    let index = 0
    for (var i = 0; i < length; i++) {
      index = columnsHeight[1] < columnsHeight[0] ? 1 : 0
      // temPics的i項根據實際情況插入columns的第一列或者第二列
      columns[index].push(tempPics[i])
      columnsHeight[index] += tempPics[i].height
    }

    that.setData({
      columns: columns,
      tempPics: []  // 清空 後續再插入數據
    })

    that.jsData.columnsHeight = columnsHeight
  },
  /*
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onReachBottom:function(){
    console.log('1111')
    this.loadData()
  }
})
