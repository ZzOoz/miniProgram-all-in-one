
// 導出一個touches類
// 利用touchStart的event里面的touches里面的clientX和touchEnd的event里面的changedTouches里面的clientX相减得出的距离
class Touches {
  constructor() {

  }

  _getIndex(e) {  // 获取滑动列表的下标值
      return e.currentTarget.dataset.index
  }

  _getMoveX(e, startX) {  // 获取滑动过程中滑动的距离
      return this.getClientX(e) - startX
  }

  _getEndX(e, startX) {  // 获取滑动结束滑动的距离
      // console.log(e, '触摸结束事件的event')
      let touch = e.changedTouches
      if (touch.length === 1) {
          return touch[0].clientX - startX
      }
  }

  _resetData(dataList) {  // 重置数据， 把所有的列表 left 置为 0
      for (let i in dataList) {
          dataList[i].left = 0
      }
      return dataList
  }

  getClientX(e) {  // 获取滑动的横坐标
      let touch = e.touches
      // console.log(e, '接触开始事件的event')
      if (touch.length === 1) {
          return touch[0].clientX
      }
  }

  touchM(e, dataList, startX) {  // touchmove 过程中更新列表数据
      // 这里是用来复位的
      let list = this._resetData(dataList)
      // 这里是对触摸的某一项数据的left进行修改
      list[this._getIndex(e)].left = this._getMoveX(e, startX)
      // console.log(list[this._getIndex(e)].left, 'left')
      // 返回这里list
      return list
  }

  touchE(e, dataList, startX, width) {  // touchend 更新列表数据
      // 这里的resetData是用来复位的 就是点击触摸结束是left回归为0
      let list = this._resetData(dataList)
      let disX = this._getEndX(e, startX)
      // console.log(startX, '开始的x坐标')
      let left = 0

      if (disX < 0) {  // 判断滑动方向， （向左滑动）
          // 滑动的距离大于删除宽度的一半就显示操作列表 否则不显示, -width 是删除按钮的宽度
          Math.abs(disX) > width / 2 ? left = -width : left = 0
          console.log(left, '左偏')
      } else {  // 向右滑动复位
          left = 0
      }

      list[this._getIndex(e)].left = left
      return list
  }

  deleteItem(e, dataList) {  // 删除功能
      dataList.splice(this._getIndex(e), 1)
      return dataList
  }
}

export default Touches