import { RECEOVE_LIST } from './mutation-type'

export default {
  [RECEOVE_LIST] (state, {listData}) {
    state.list = listData
  }
}
