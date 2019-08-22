import { RECEOVE_LIST, MOVIES_LIST } from './mutation-type'

export default {
  [RECEOVE_LIST] (state, {listData}) {
    state.list = listData
  },
  [MOVIES_LIST] (state, data) {
    state.moviesList = data
  }
}
