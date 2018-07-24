// mutation: 对数据的修改操作

import * as types from './mutation-types'
const mutations = {
  [types.CHANGE_SELECTGOODS](state, flag) {
    state.selectGoods = []
    state.selectGoods = flag
  },
  [types.SET_PENDINGBILL](state, flag) {
    state.pendingBill = []
    state.pendingBill = flag
  }
}
export default mutations
