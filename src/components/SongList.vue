<template>
  <div class="song-list">
    <div class="sl-header">
      <div class="sl-left">
        <span class="sl-title">播放列表</span>
        <span class="sl-count">(共{{ playList.length }}首)</span>
      </div>
      <div class="sl-right" @click="clearHandle">
        <i class="iconfont icon-close"></i>
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
              <div class="song-playing" :style="playingShow(index)">10</div>
              <div
                :class="['song-playicon', 'iconfont', playIcon(index)]"
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
            <div>{{ list[index] }}</div>
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

const playIndex = computed(() => store.getters.playIndex)
const isPlayed = computed(() => store.getters.isPlayed)

const props = defineProps({
  playList: null,
  curSongInfo: null,
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
  () => props.playList,
  () => {
    formatDuration(props.playList)
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
      }
      .song-playicon {
        display: none;
        color: var(--color-text-height);
        font-size: 16px;
      }
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
    }
  }
}
</style>
