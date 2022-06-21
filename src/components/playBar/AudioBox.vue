<template>
  <audio
    v-if="curSongInfo"
    ref="myAudio"
    controls
    preload="auto"
    @canplay="initSongPlay"
    @playing="playSong"
    @ended="endedSong"
    @timeupdate="updateSongTime"
    :src="curSongInfo.url"
  ></audio>
</template>

<script setup>
import { computed, ref, reactive, watch, nextTick } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const myAudio = ref(null)
const info = reactive({
  initAudioReady: false, // 音乐的初始话操作
  playMode: 0, // 0 loop 1 loopOne 2 shuffle
})
const emit = defineEmits(['setCurrentTime'])

// 播放的列表 曲目 状态
const playList = computed(() => store.getters.playList)
const playIndex = computed(() => store.getters.playIndex)
const isPlayed = computed(() => store.getters.isPlayed)

// current song information
const curSongInfo = computed(() => playList.value[playIndex.value])

// 暂停 播放 上一首 下一首
const playAudioType = (type) => {
  if (type === 'play') {
    store.commit('SET_PLAYSTATUS', !isPlayed.value)
    store.commit('SET_PLAYINDEX', playIndex.value)
  } else {
    changeSong(type)
  }
}

// 播放模式 循环 单曲循环 随机播放
const playAudioMode = (mode) => {
  info.playMode = mode
}

// 刷新页面的时候 音频实现初始化
const initSongPlay = (e) => {
  info.initAudioReady = true
}

// 音频播放的时候 初始化状态 获取音频的总时长
const playSong = (e) => {
  info.initAudioReady = true
  store.commit('SET_PLAYSTATUS', true)
}

// 一首歌播放结束之后 自动播放下一首
const endedSong = () => {
  if (info.playMode === 1) {
    loopSong()
  } else {
    changeSong('next')
  }
}

// 拖动进度条 设置当前的时间
const setAudioProgress = (t) => {
  const $myAudio = myAudio.value
  $myAudio.currentTime = t
}

// 静音逻辑
const isMutedHandler = (flag) => {
  const $myAudio = myAudio.value
  $myAudio.muted = flag
}
// 音量设置
const setVolumeProgress = (val) => {
  const $myAudio = myAudio.value
  $myAudio.volume = val
  $myAudio.muted = val ? false : true
}

// change song
const changeSong = (type) => {
  // type: prev / next
  if (playList.value.length !== 1) {
    let index = playIndex.value
    if (info.playMode == 2) {
      // shuffle
      index = Math.floor(Math.random() * playList.value.length - 1) + 1
      console.log(index)
    } else {
      if (type == 'prev') {
        index = index === 0 ? playList.value.length - 1 : --index
      } else {
        index = index >= playList.value.length - 1 ? 0 : ++index
      }
    }

    // 这里的改变会触发 curSongInfo 的改变 通过监听，来实现音乐的播放
    info.initAudioReady = false
    store.commit('SET_PLAYSTATUS', false)
    store.commit('SET_PLAYINDEX', index)
  } else {
    loopSong()
  }
}

// loopSong
const loopSong = () => {
  const $myAudio = myAudio.value
  $myAudio.currentTime = 0
  $myAudio.play()
  store.commit('SET_PLAYSTATUS', true)
}

// 监听音频时间，更新当前的播放时间
const updateSongTime = (e) => {
  if (!info.initAudioReady) {
    return
  }
  emit('setCurrentTime', e.target.currentTime)
}

// 切歌 逻辑
watch(
  curSongInfo,
  (newSong, oldSong) => {
    if (!newSong || (oldSong && newSong.id === oldSong.id)) {
      return
    }
    // 当前切歌的时候 重置状态和当前的时长
    info.initAudioReady = false
    info.currentTime = 0

    // 在dom加载完成之后，在播放歌曲
    nextTick(() => {
      const $myAudio = myAudio.value

      if ($myAudio) {
        $myAudio.play() // 切歌之后的立马播放
      }
    })
  },
  { deep: true }
)

// 面板控制暂停播放逻辑
watch(
  () => isPlayed.value,
  // currtent isPlayed.value
  (playing) => {
    if (!info.initAudioReady) {
      return
    }

    nextTick(() => {
      const $myAudio = myAudio.value

      if ($myAudio) {
        playing ? $myAudio.play() : $myAudio.pause()
      }
    })
  }
)

defineExpose({
  playAudioType,
  playAudioMode,
  setAudioProgress,
  isMutedHandler,
  setVolumeProgress,
})
</script>
