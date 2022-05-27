<template>
  <el-skeleton animated :count="count" :throttle="500" :loading="loading">
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" class="ske__img" />
      </div>
    </template>
    <template #default>
      <div class="artist-list">
        <el-carousel
          height="340px"
          arrow="never"
          trigger="hover"
          :interval="8000"
          indicator-position="outside"
        >
          <el-carousel-item v-for="(item, index) in artist_list" :key="index">
            <router-link
              :to="{ path: '/artist', query: { id: artistInfo.id } }"
              class="item"
              v-for="artistInfo in item"
              :key="artistInfo.id"
            >
              <el-image :src="artistInfo.picUrl + '?param=100y100'">
                <template #placeholder>
                  <div class="image-slot">
                    <i class="iconfont icon-image"></i>
                  </div>
                </template>
              </el-image>
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import { getCurrentInstance, reactive, toRefs } from 'vue'

const { proxy } = getCurrentInstance()
const artistInfo = reactive({
  artist_list: [],
  artist_params: { limit: 36 },
  loading: true,
  count: 12,
})

const getHotArtistList = async () => {
  const { data: res } = await proxy.$http.getHotArtist(artistInfo.artist_params)

  if (res.code !== 200) {
    return proxy.$msg.error('数据请求失败')
  }

  for (let i = 0; i < 3; i++) {
    let j = artistInfo.count * i
    artistInfo.artist_list[i] = res.artists.slice(j, j + artistInfo.count)
  }

  artistInfo.loading = false
}
getHotArtistList()

const { artist_list, loading, count } = toRefs(artistInfo)
</script>

<style lang="scss" scoped>
.el-skeleton {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .ske__img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
.item {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.el-carousel__item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.el-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
