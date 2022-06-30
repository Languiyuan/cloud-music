<template>
  <div class="song-list">
    <div class="sl-header">
      <div class="sl-left">
        <span class="sl-title">播放列表</span>
        <span class="sl-count">(共{{ playList.length }}首)</span>
      </div>
      <div class="sl-right" @click="clearHandle">
        <i class="iconfont icon-delete"></i>
        <span>清空列表</span>
      </div>
    </div>
    <div class="sl-main">
      <div class="sl-main-header">
        <div>序号</div>
        <div>歌曲</div>
        <div>歌手</div>
        <div>时长</div>
      </div>
      <div class="sl-main-list">
        <ul>
          <li class="sl-item" v-for="(item, index) in playList" :key="item.id">
            <div>
              <div class="song-index" :style="indexShow(index)">
                {{ index + 1 }}
              </div>
              <div class="song-playing" :style="playingShow(index)">
                <div
                  class="playing-cloumn"
                  style="animation-delay: -1.2s"
                ></div>
                <div class="playing-cloumn"></div>
                <div
                  class="playing-cloumn"
                  style="animation-delay: -1.5s"
                ></div>
                <div
                  class="playing-cloumn"
                  style="animation-delay: -0.9s"
                ></div>
                <div
                  class="playing-cloumn"
                  style="animation-delay: -0.6s"
                ></div>
              </div>
              <div
                :class="['song-playicon', 'iconfont', playIcon(index)]"
                @click="isPlayedHandle(index)"
              ></div>
            </div>
            <div>{{ item.name }}</div>
            <div>
              <router-link
                :to="{ path: '/singer', query: '{id: singer.id}' }"
                v-for="(singer, index) in item.singer"
                :key="singer.id"
                class="sl-singer"
              >
                {{ index != 0 ? '/' + singer.name : singer.name }}
              </router-link>
            </div>
            <div>
              <div class="song-duration">{{ list[index] }}</div>
              <div class="handle-icon">
                <i
                  class="iconfont icon-collection"
                  style="transform: scale(1.2); transform-origin: center"
                ></i>
                <i
                  class="iconfont icon-delete"
                  @click.stop="deleteHandle(index)"
                ></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const { proxy } = getCurrentInstance()

const playList = computed(() => store.getters.playList)
const playIndex = computed(() => store.getters.playIndex)
const isPlayed = computed(() => store.getters.isPlayed)

const curSongInfo = computed(() => playList.value[playIndex.value])
const props = defineProps({
  // playList: null,
  // curSongInfo: null,
})

const indexShow = computed(() => (index) => {
  let flag = playIndex.value == index && isPlayed.value == true ? true : false
  if (flag) {
    return 'display: none'
  } else {
    return ''
  }
})

const playingShow = computed(() => (index) => {
  let flag = playIndex.value == index && isPlayed.value == true ? false : true
  if (flag) {
    return 'display: none'
  } else {
    return ''
  }
})

const playIcon = computed(() => (index) => {
  if (playIndex.value == index) {
    return isPlayed.value ? 'icon-pause' : 'icon-play'
  } else {
    return 'icon-play'
  }
})
// 列表播放/暂停
const isPlayedHandle = (index) => {
  if (playIndex.value == index) {
    store.commit('SET_PLAYSTATUS', !isPlayed.value)
  } else {
    store.commit('SET_PLAYINDEX', index)
    store.commit('SET_PLAYSTATUS', true)
  }
}

// 列表删除歌曲
const deleteHandle = (index) => {
  if (playList.value.length == 1) {
    store.commit('SET_PLAYSTATUS', false)
    store.commit('SET_PLAYLIST', [])
  } else {
    playList.value.splice(index, 1)
    if (playIndex.value <= index) {
      store.commit('SET_PLAYLIST', playList.value)
    } else {
      store.commit('SET_PLAYLIST', playList.value)
      store.commit('SET_PLAYINDEX', playIndex.value - 1)
    }
  }
}

// 时长的格式转换
const list = ref([])

const formatDuration = (playList) => {
  if (!playList) {
    return
  }
  const songTime = (duration) => {
    return proxy.$utils.formatSongTime(
      proxy.$utils.formatSongSecond(duration) / 1000
    )
  }
  list.value = []
  playList.forEach((item, index) => {
    list.value.push(songTime(item.duration))
  })
}
watch(
  () => playList.value,
  () => {
    formatDuration(playList.value)
  },
  { immediate: true }
)

// 清空列表
const clearHandle = () => {
  store.commit('SET_PLAYSTATUS', false)
  store.commit('SET_PLAYLIST', [])
  store.commit('SET_PLAYINDEX', 0)
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';
.song-list {
  height: 485px;
  background-color: #fff;
}
.sl-header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .sl-left {
    .sl-title {
      color: var(--color-text-main);
      font-size: 18px;
    }
    .sl-count {
      padding-left: 5px;
      color: var(--color-text);
      font-size: 12px;
    }
  }
  .sl-right {
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 14px;
      color: var(--color-text);
    }
    span {
      vertical-align: bottom;
      padding-left: 5px;
      font-size: 14px;
      color: var(--color-text);
    }
  }
}
.sl-main {
  .sl-main-header {
    display: flex;
    align-items: center;
    height: 50px;
    color: #999999;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid rgba($color: #999999, $alpha: 1);
    :nth-child(1) {
      width: 100px;
      padding-left: 10px;
    }
    :nth-child(2) {
      width: 175px;
    }
    :nth-child(3) {
      width: 175px;
    }
    :nth-child(4) {
      width: 100px;
      text-align: right;
      padding-right: 10px;
    }
  }
  .sl-main-list {
    ul {
      height: 415px;
      overflow-y: scroll;
    }

    .sl-item {
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 14px;
      :nth-child(1) {
        width: 100px;
        padding-left: 10px;
        .song-index {
          width: 25px;
          text-align: center;
          padding-left: 0;
          @include ellipsis;
        }
      }
      :nth-child(2) {
        width: 175px;
        @include ellipsis;
      }
      :nth-child(3) {
        width: 175px;
        .sl-singer {
          padding-left: 0;
        }
        @include ellipsis;
      }
      :nth-child(4) {
        width: 100px;
        text-align: right;
        padding-right: 10px;
        @include ellipsis;
      }
      &:hover {
        background-color: #f0f0f0;
        .song-index {
          display: none;
        }
        .song-playing {
          display: none;
        }
        .song-playicon {
          display: block;
        }
        .song-duration {
          display: none;
        }
        .handle-icon {
          display: flex;
          justify-content: flex-end;
        }
      }
      .song-playicon {
        display: none;
        color: var(--color-text-height);
        font-size: 16px;
        margin-left: 5px;
      }
      .song-playing {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 23px;
        .playing-cloumn {
          padding: 0;
          margin: 0;
          width: 3px;
          height: 20px;
          background-color: var(--color-text-height);
          animation: play 0.9s linear infinite alternate;
        }
      }
      .song-duration {
        padding: 0;
      }
      .handle-icon {
        display: none;
        width: 60px;
        margin-left: 40px;
        color: var(--color-text-height);
        i {
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
@keyframes play {
  0% {
    transform: translateY(10);
  }
  100% {
    transform: translateY(75%);
  }
}
</style>
