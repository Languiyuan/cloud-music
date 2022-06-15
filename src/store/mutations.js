import * as types from './mutations-types'

export default {
  [types.SET_PLAYSTATUS](state, val = false) {
    state.isPlayed = val
  },
  [types.SET_PLAYLIST](state, val = null) {
    state.playList = val
    window.localStorage.setItem('playList', JSON.stringify(val))
  },
  [types.SET_PLAYINDEX](state, val = 0) {
    state.playIndex = val
    window.localStorage.setItem('playIndex', val)
  },
  [types.SET_PLAYLISTTIPS](state, val = false) {
    state.isShowPlayListTips = val
  },
}
