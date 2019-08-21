import { RECEOVE_LIST } from './mutation-type'
import listData from '../datas/list-data'

export default {
  getList ({commit}) {
    commit(RECEOVE_LIST, listData)
  }
}
