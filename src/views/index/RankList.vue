<template>
  <el-skeleton animated :count="4" :throttle="500" :loading="loading">
    <template #template>
      <div class="ske-item">
        <el-skeleton-item variant="h1" class="ske__h1" />
        <el-skeleton-item variant="h3" class="ske__h3" />
        <div class="song-wrapper">
          <div class="song-item" v-for="item in num">
            <el-skeleton-item
              class="ske-img"
              variant="image"
            ></el-skeleton-item>
            <div class="song-info">
              <el-skeleton-item
                class="ske-title"
                variant="text"
              ></el-skeleton-item>
              <el-skeleton-item
                class="ske-artist"
                variant="text"
              ></el-skeleton-item>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="wrapper">
        <div class="rank-list" v-for="item in rankList" :key="item.id">
          <div class="rank__hd">
            <div class="rank__type">{{ item.name }}</div>
            <h5 class="rank__update">
              最近更新：{{
                $utils.formartDate(item.updateTime, 'MM月dd日')
              }}（{{ item.updateFrequency }}）
            </h5>
          </div>
          <div class="song__wrapper">
            <div
              class="song-item"
              v-for="(songItem, index) in songList[item.id]"
              :key="songItem.id"
            >
              <div class="song-img">
                <el-image :src="songItem.album.picUrl + '?param=48y48'">
                  <template #placeholder>
                    <div class="image-slot">
                      <i class="iconfont icon-image"></i>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="song-info">
                <h5 class="song-title">{{ songItem.name }}</h5>
                <div
                  class="song-artist-list"
                  v-for="(author, k) in songItem.singer"
                  :key="k"
                >
                  <span class="song-artist" v-if="k <= 1 ? true : false">{{
                    k !== 0 ? '/ ' + author.name : author.name
                  }}</span>
                </div>
              </div>
              <!-- 做一个权限的判断 -->
              <div class="song__operate">
                <i
                  class="iconfont icon-add"
                  title="添加到列表"
                  @click="addSongList(songItem)"
                ></i>
                <i class="iconfont icon-favorite" title="添加到收藏"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const { proxy } = getCurrentInstance()

const rankInfo = reactive({
  rankList: [],
  songList: [],
  num: 6,
  loading: true,
})

const getTopList = async () => {
  const { data: res } = await proxy.$http.toplist()

  if (res.code !== 200) {
    return proxy.$msg.error('请求数据失败！')
  }
  rankInfo.rankList = res.list.splice(0, 4)

  rankInfo.rankList.forEach(async (item) => {
    const { data: res } = await proxy.$http.topRankList({ id: item.id })

    if (res.code !== 200) {
      return proxy.$msg.error('请求数据失败！')
    }

    rankInfo.songList[item.id] = proxy.$utils.formatSongs(
      res.playlist.tracks.splice(0, rankInfo.num),
      res.privileges.splice(0, rankInfo.num)
    )
  })
  rankInfo.loading = false
  console.log(rankInfo.songList)
}

getTopList()

// 添加歌曲到播放列表
const addSongList = (songInfo) => {
  store.dispatch('addList', { list: [songInfo] })
  store.commit('SET_PLAYLISTTIPS', true)
}

const { rankList, songList, num, loading } = toRefs(rankInfo)
</script>

<style lang="scss" scoped>
@import '@assets/scss/mixins.scss';
.el-skeleton {
  width: auto;
  display: flex;
  height: 522px;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0 -10px;
  box-sizing: border-box;
}
.ske-item {
  flex: 1;
  padding: 20px;
  margin: 0 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  .ske__h1 {
    display: block;
    height: 30px;
    width: 30%;
    margin-bottom: 10px;
  }
  .ske__h3 {
    height: 18px;
    width: 50%;
  }
}

.song-wrapper {
  padding-top: 30px;
  .song-item {
    display: flex;
    padding-bottom: 20px;
    .ske-img {
      width: 48px;
      height: 48px;
      margin-right: 20px;
    }
    .song-info {
      flex: 1;
      font-size: 14px;
      padding-top: 10px;

      .ske-title {
        width: 60%;
        padding-bottom: 5px;
      }
      .ske-artist {
        width: 50%;
      }
    }
  }
}

.wrapper {
  width: auto;
  display: flex;
  height: 522px;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0 -10px;
  box-sizing: border-box;

  .rank-list {
    flex: 1;
    padding: 20px;
    margin: 0 10px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }

  .rank__hd {
    .rank__type {
      font-size: 22px;
      color: #2d2d2d;
      padding-bottom: 10px;
      font-weight: 700;
    }
    .rank__update {
      font-size: 12px;
      color: #909090;
    }
  }

  .song__wrapper {
    padding-top: 30px;
    .song-item {
      position: relative;
      display: flex;
      padding-bottom: 20px;
      .song-img {
        width: 48px;
        height: 48px;
        margin-right: 20px;
        .el-image {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgb(0 0 0 / 12%);
          overflow: hidden;
        }
      }
      .song-info {
        height: 48px;
        flex: 1;
        font-size: 14px;
      }
      .song-title {
        display: block;
        padding-bottom: 12px;
        font-size: 14px;
        font-weight: 400;
        @include ellipsis;
        transition: all 0.3s ease-in;
      }

      .song-artist-list {
        display: inline;
        .song-artist {
          color: #909090;
        }
      }

      .song__operate {
        width: 0;
        overflow: hidden;
        line-height: 48px;
        transition: all 0.3s ease-in;
        i {
          margin-left: 10px;
          cursor: pointer;
        }
      }

      &:hover {
        .song-title {
          transform: translate(15px, 0);
          // margin-left: 15px;
          transition: all 0.3s ease-in;
        }
        .song__operate {
          width: 60px;
          transition: all 0.3s ease-in;
        }
      }
    }
  }
}
</style>
