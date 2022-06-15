import { formatSongInfo } from '@utils/song'

export default {
  // 数字过万的处理
  formatNum(val) {
    let num = 0
    if (val > 9999) {
      num = Math.round((val / 10000) * 10) / 10 + '万'
    } else {
      num = val
    }
    return num
  },

  // 歌曲的市场duration 的转换 格式转换成 03:30
  formatSongTime(duration = 0) {
    duration = duration >= 1000 ? duration : 0
    const m = (Math.floor(duration / 60) + '').padStart(2, '0')
    const s = (Math.floor(duration % 60) + '').padStart(2, '0')
    return `${m}:${s}`
  },

  // 时间毫秒格式化处理 2020-10-30 09:30:00
  formartDate(originVal, fmt) {
    const dt = new Date(originVal)
    const opt = {
      yyyy: dt.getFullYear(),
      MM: (dt.getMonth() + 1 + '').padStart(2, '0'),
      dd: (dt.getDate() + '').padStart(2, '0'),
      HH: (dt.getHours() + '').padStart(2, '0'),
      mm: (dt.getMinutes() + '').padStart(2, '0'),
      ss: (dt.getSeconds() + '').padStart(2, '0'),
    }

    for (const k in opt) {
      const ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(ret[1], opt[k])
      }
    }

    return fmt
  },

  // 处理歌曲格式
  formatSongs(list, privileges) {
    const ret = []
    list.map((item, index) => {
      if (item.id) {
        // 版权的校验
        item.license = !privileges[index].cp
        ret.push(formatSongInfo(item))
      }
    })
    return ret
  },

  // 添加歌曲到播放列表，过滤重复的歌曲
  concatPlayList(newList = [], oldList = []) {
    const arr = [...oldList, ...newList]
    const map = new Map()

    for (const item of arr) {
      if (!map.has(item.id)) {
        map.set(item.id, item)
      }
    }
    return [...map.values()]
  },
}
