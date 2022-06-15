<template>
  <div
    :class="['play-bar', showName]"
    v-if="curSongInfo"
    @mouseenter="enterBar($event)"
    @mouseleave="leaveBar($event)"
  >
    <!-- 播放的固定按钮 -->
    <div class="lock">
      <div class="lock-btn">123</div>
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
            <p class="song-artist">
              <router-link
                :to="{ path: '/singer', query: '{id: item.id}' }"
                v-for="(item, index) in curSongInfo.singer"
                :key="item.id"
              >
                {{ index != 0 ? '/' + item.name : item.name }}
              </router-link>
            </p>
          </div>
          <div class="bar-time">12:31/11:23</div>
        </div>
        <div class="bar-middle">
          <div class="control">
            <i class="iconfont icon-lastSong" title="上一首"></i>
            <i :class="['iconfont', statusIcon]" @click="changePlayStatus"></i>
            <i class="iconfont icon-nextSong" title="下一首"></i>
          </div>
        </div>
        <div class="bar-right">
          <div class="bar-oper">
            <div class="volume-main">
              <i :class="['iconfont', volumeIcon]"></i>
            </div>
            <div class="play-mode">
              <i
                :class="['iconfont', modeIcon.iconName]"
                title="modeIcon.title"
                @click="changePlayMode"
              ></i>
            </div>
            <div class="popover">
              <el-popover placement="top" :width="400" trigger="click">
                <template #reference>
                  <span class="lyrics-btn">词</span>
                </template>
                <div class="lyrics-container">我是划过天边的那道火焰</div>
              </el-popover>

              <el-popover placement="top" :width="550" trigger="click">
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
                <div class="lyrics-container">我是划过天边的那道火焰</div>
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
import { p } from '@antfu/utils'
import { onMounted, reactive, toRefs, computed } from 'vue'
import store from '../../store'

const info = reactive({
  showName: 'active',
  statusIcon: 'icon-play',
  volumeIcon: 'icon-volumeHigh',
  mode: 0, // 0 循环模式 1 单曲循环 2 随机播放
})
const { showName, statusIcon, volumeIcon } = toRefs(info)

onMounted(() => {
  // leaverBar()
  store.commit('SET_PLAYLIST', playList.value)
  console.log(playList.value)
})

// 获取播放列表
const playList = computed(() => store.getters.playList)
const playIndex = computed(() => store.getters.playIndex)
const isPlayed = computed(() => store.getters.isPlayed)

// 获取当前播放歌曲的info
const curSongInfo = computed(() => playList.value[playIndex.value])

// 暂停 播放功能
const changePlayStatus = () => {
  info.statusIcon = info.statusIcon == 'icon-play' ? 'icon-pause' : 'icon-play'
}

// 音量的icon
// const changeVolumeIcon = () => {
//   // 临时的音量数据 100
//   let volumeCount = 100

// }

// 播放模式
const modeIcon = computed(() => {
  const params = [
    { iconName: 'icon-repeat', title: '循环播放' },
    { iconName: 'icon-repeatOnce', title: '单曲循环' },
    { iconName: 'icon-shuffle', title: '随机播放' },
  ]
  return params[info.mode]
})

const changePlayMode = () => {
  info.mode = info.mode == 2 ? 0 : info.mode + 1
}

const enterBar = () => {
  info.showName = 'active'
}
const leaveBar = () => {
  info.showName = 'active'
}
</script>

<style scoped lang="scss">
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
  top: -30px;
  height: 30px;
  width: 100%;
  .lock-btn {
    position: absolute;
    right: 15%;
    background-color: #fff;
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
        display: inline-block;
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
        width: 210px;
        line-height: 70px;
        i {
          margin-left: 20px;
          color: #999999;
          font-size: 22px;
          cursor: pointer;
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
