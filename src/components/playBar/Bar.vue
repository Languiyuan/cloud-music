<template>
  <div
    :class="['play-bar', showName]"
    v-if="curSongInfo"
    @mouseenter="enterBar($event)"
    @mouseleave="leaveBar($event)"
  >
    <!-- 播放的固定按钮 -->
    <div class="lock">
      <div class="lock-btn" @click="lockHandler">
        <i :class="['iconfont', lockIcon]"></i>
      </div>
    </div>
    <!-- 进度条 -->
    <div class="song-progress">
      <el-slider
        v-model="songProgress"
        :format-tooltip="formatTooltipTime"
        @change="setAudioBoxCurrentTime"
        :max="1"
        :min="0"
        :step="0.01"
      ></el-slider>
    </div>
    <div class="wrapper">
      <div class="bar-inside">
        <div class="bar-left">
          <router-link
            :to="{ path: '/song', query: { id: curSongInfo.id } }"
            class="song-image-content"
          >
            <el-image
              :src="curSongInfo.album.picUrl + '?param=50y50'"
              class="song-image"
            >
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-image"></i>
                </div>
              </template>
            </el-image>
          </router-link>
          <div class="song-info">
            <router-link
              :to="{ path: '/song', query: '{id: curSongInfo.id}' }"
              class="song-name"
              >{{ curSongInfo.name }}</router-link
            >
            <div class="song-artist">
              <router-link
                :to="{ path: '/singer', query: '{id: item.id}' }"
                v-for="(item, index) in curSongInfo.singer"
                :key="item.id"
              >
                {{ index != 0 ? '/' + item.name : item.name }}
              </router-link>
            </div>
          </div>
          <div class="bar-time">{{ songCurrentTime }}/{{ songTime }}</div>
        </div>
        <div class="bar-middle">
          <div class="control">
            <i
              class="iconfont icon-lastSong"
              title="上一首"
              @click="audioHandler('prev')"
            ></i>
            <i
              :class="['iconfont', statusIcon]"
              @click="audioHandler('play')"
            ></i>
            <i
              class="iconfont icon-nextSong"
              title="下一首"
              @click="audioHandler('next')"
            ></i>
          </div>
        </div>
        <div class="bar-right">
          <div class="bar-oper">
            <div class="volume-main">
              <i :class="['iconfont', volumeIcon]" @click="mutedHandler"></i>
              <div class="volume-slider">
                <el-slider
                  v-model="volumeCount"
                  @change="setVolumeCount"
                ></el-slider>
              </div>
            </div>
            <div class="play-mode">
              <i
                :class="['iconfont', modeIcon.iconName]"
                title="modeIcon.title"
                @click="playAudioMode"
              ></i>
            </div>
            <div class="popover">
              <el-popover
                placement="top"
                :width="400"
                trigger="click"
                :offset="40"
                @hide="isLyrics = false"
                @show="isLyrics = true"
              >
                <template #reference>
                  <span class="lyrics-btn">词</span>
                </template>
                <div class="lyrics-container">
                  <Lyrics
                    :sId="curSongInfo.id"
                    :currentTime="currentTime"
                  ></Lyrics>
                </div>
              </el-popover>

              <el-popover
                placement="top"
                :width="550"
                trigger="click"
                :offset="40"
                @hide="isSongList = false"
                @show="isSongList = true"
              >
                <template #reference>
                  <div class="playlist-btn">
                    <span class="song-count">{{
                      playList.length > 99
                        ? playList.length + '+'
                        : playList.length
                    }}</span>
                    <i class="iconfont icon-playlist"></i>
                  </div>
                </template>
                <div class="song-container">
                  <SongList></SongList>
                </div>
              </el-popover>

              <i class="iconfont icon-pip song-pip"></i>
              <i class="iconfont icon-window window-btn"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  reactive,
  toRefs,
  computed,
  getCurrentInstance,
  inject,
  watch,
  ref,
} from 'vue'
import store from '../../store'
import Lyrics from '../Lyrics.vue'
import SongList from '../SongList.vue'

const { proxy } = getCurrentInstance()
const info = reactive({
  showName: '',
  lockIcon: 'icon-unlock',
  statusIcon: 'icon-play',
  volumeIcon: 'icon-volumeHigh',
  mode: 0, // 0 循环模式 1 单曲循环 2 随机播放
  currentTime: inject('currentTime'), // s
  volumeCount: 50,
  isMuted: false,
  isLock: false,
  isSongList: false,
  isLyrics: false,
  timer: null,
})
const {
  showName,
  statusIcon,
  volumeIcon,
  volumeCount,
  lockIcon,
  currentTime,
  isSongList,
  isLyrics,
} = toRefs(info)

const emit = defineEmits([
  'audioHandler',
  'playAudioMode',
  'setAudioBoxTime',
  'isMutedHandler',
  'setVolumeProgress',
])
onMounted(() => {
  // leaverBar()
  store.commit('SET_PLAYLIST', playList.value)
})

// 获取播放列表
const playList = computed(() => store.getters.playList)
const playIndex = computed(() => store.getters.playIndex)
const isPlayed = computed(() => store.getters.isPlayed)

// 获取当前播放歌曲的info
const curSongInfo = computed(() => playList.value[playIndex.value])

// 暂停 播放 图标
info.statusIcon = computed(() => {
  return isPlayed.value ? 'icon-play' : 'icon-pause'
})

// 设置音量（拖动音量） emit
const setVolumeCount = (val) => {
  emit('setVolumeProgress', val / 100)
}
// 音量图标的判断逻辑
const volumeIconHandler = (v) => {
  if (v > 66) {
    info.volumeIcon = 'icon-volumeHigh'
  } else if (v > 33) {
    info.volumeIcon = 'icon-volumeMiddle'
  } else if (v > 0) {
    info.volumeIcon = 'icon-volumeLow'
  } else {
    info.volumeIcon = 'icon-volumeCross'
  }
}
// 设置静音
const mutedHandler = () => {
  info.isMuted = !info.isMuted
  if (info.isMuted) {
    info.volumeIcon = 'icon-volumeCross'
  } else {
    volumeIconHandler(info.volumeCount)
  }

  emit('isMutedHandler', info.isMuted)
}
// 音量的图标
watch(
  () => info.volumeCount,
  (curCount) => {
    volumeIconHandler(curCount)
  }
)

// 播放模式
const modeIcon = computed(() => {
  const params = [
    { iconName: 'icon-repeat', title: '循环播放' },
    { iconName: 'icon-repeatOnce', title: '单曲循环' },
    { iconName: 'icon-shuffle', title: '随机播放' },
  ]
  return params[info.mode]
})

const playAudioMode = () => {
  info.mode = info.mode == 2 ? 0 : info.mode + 1
  emit('playAudioMode', info.mode)
}

// 音频 播放 暂停 上一首 下一首
const audioHandler = (type) => {
  emit('audioHandler', type)
}

// 进度条 0.123234 0~1
let songProgress = ref(0)

watch(
  () => info.currentTime,
  (currentTime) => {
    if (!curSongInfo.value) {
      return
    }
    // 0~1
    songProgress.value =
      (currentTime * 1000) /
      proxy.$utils.formatSongSecond(curSongInfo.value.duration)
  }
)

// el-slider format-tooltip
const formatTooltipTime = () => {
  return proxy.$utils.formatSongTime(info.currentTime)
}
// 进度条的拖动
const setAudioBoxCurrentTime = (val) => {
  let changedTime =
    (songProgress.value *
      proxy.$utils.formatSongSecond(curSongInfo.value.duration)) /
    1000
  emit('setAudioBoxTime', changedTime)
}

// 时间进度显示 03:30
let songTime = computed(() =>
  proxy.$utils.formatSongTime(
    proxy.$utils.formatSongSecond(curSongInfo.value.duration) / 1000
  )
)

let songCurrentTime = computed(() =>
  proxy.$utils.formatSongTime(info.currentTime)
)

// 锁定bar
const lockHandler = () => {
  info.isLock = !info.isLock
  if (info.isLock) {
    info.lockIcon = 'icon-locked'
  } else {
    info.lockIcon = 'icon-unlock'
  }
}
const lyricsHandle = () => {
  info.isLyrics = !info.isLyrics
  info.isSongList = false
}
const songListHandle = () => {
  info.isSongList = !info.isSongList
  info.isLyrics = false
}
const enterBar = () => {
  info.showName = 'active'
  if (info.timer) {
    clearTimeout(info.timer)
  }
}
const leaveBar = () => {
  clearTimeout(info.timer)
  info.timer = setTimeout(() => {
    if (info.isLock || info.isSongList || info.isLyrics) {
      return
    }
    info.showName = ''
  }, 3000)
}

defineExpose({})
</script>

<style lang="scss" scoped>
@import '@assets/scss/mixins.scss';
.play-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  z-index: 5;
  box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
  transition: all 0.4s ease-out;
  transform: translateY(100%);

  &.active {
    transform: translateY(0);
  }
}
.lock {
  position: absolute;
  top: -34px;
  height: 30px;
  width: 100%;
  z-index: 6;
  .lock-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15%;
    top: -3px;
    width: 60px;
    height: 30px;
    border-radius: 30px 30px 0 0;
    background-color: #fff;
    cursor: pointer;
    i {
      font-size: 16px;
    }
  }
}
.song-progress {
  position: absolute;
  width: 100%;
  top: -17px;
  :deep(.el-slider__button) {
    border-color: var(--color-text-height);
  }
  :deep(.el-slider__bar) {
    background-color: var(--color-text-height);
  }
  :deep(.el-slider__button-wrapper) {
    z-index: 7;
  }
  :deep(.el-slider__button) {
    width: 15px;
    height: 15px;
  }
}
.wrapper {
  max-width: 1300px;
  margin: 0 auto;
  height: 100%;
}
.bar-inside {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .bar-left {
    display: flex;
    align-items: center;
    .song-image-content {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      .song-image {
        border-radius: 4px;
      }
    }
    .song-info {
      padding: 0 10px 6px 30px;
      height: 50px;
      width: 95px;
      overflow: hidden;
      .song-name {
        display: block;
        font-size: 12px;
        font-weight: 700;
        color: #2d2d2d;
        padding: 3px 0 17px;
        @include ellipsis;
      }
      .song-artist {
        display: inline;
        font-size: 12px;
        color: #999999;
      }
    }
    .bar-time {
      width: 115px;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      color: #606266;
    }
  }
  .bar-middle {
    .control {
      display: flex;
      align-items: center;
      height: 70px;
      color: #999999;
      .icon-lastSong {
        font-size: 30px;
        color: #999999;
      }
      .icon-nextSong {
        font-size: 30px;
        color: #999999;
      }
      i {
        margin: 0 20px;
        font-size: 50px;
        line-height: 50px;
        text-align: center;
        color: var(--color-text-height);
        cursor: pointer;
      }
    }
  }
  .bar-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bar-oper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      .volume-main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 210px;
        line-height: 70px;
        i {
          margin-left: 20px;
          color: #999999;
          font-size: 22px;
          cursor: pointer;
        }
        .volume-slider {
          flex: 1;
          margin: 0 15px;
          :deep(.el-slider__button) {
            border-color: var(--color-text-height);
          }
          :deep(.el-slider__bar) {
            background-color: var(--color-text-height);
          }
          :deep(.el-slider__button) {
            width: 15px;
            height: 15px;
          }
        }
      }
      .play-mode {
        i {
          font-size: 22px;
          color: #999999;
          cursor: pointer;
        }
      }
      .popover {
        display: flex;
        align-items: center;
        .lyrics-btn {
          margin-left: 15px;
          font-size: 20px;
          cursor: pointer;
          color: #999999;
        }
        .playlist-btn {
          position: relative;
          margin-left: 15px;
          .song-count {
            position: absolute;
            top: -8px;
            right: -10px;
            font-size: 12px;
            color: #999999;
          }
          i {
            font-size: 26px;
            color: #999999;
            cursor: pointer;
          }
        }
        .song-pip {
          margin-left: 15px;
          font-size: 26px;
          color: #999999;
          cursor: pointer;
        }
        .window-btn {
          margin-left: 15px;
          font-size: 22px;
          color: #999999;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
