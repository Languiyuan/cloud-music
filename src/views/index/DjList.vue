<template>
  <el-skeleton animated :count="count" :throttle="500" :loading="loading">
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" class="ske__img" />
        <div class="info">
          <el-skeleton-item variant="h3" class="ske__name" />
          <el-skeleton-item variant="text" class="ske__txt" />
          <el-skeleton-item variant="text" class="ske__txt" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="dj-list">
        <router-link
          :to="{ path: '/dj', query: { id: item.id } }"
          v-for="item in Dj_list"
          :key="item.id"
          class="item"
        >
          <div class="cover-img">
            <el-image :src="item.picUrl + '?param=100y100'" lazy>
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-image"></i>
                </div>
              </template>
            </el-image>
          </div>

          <div class="info">
            <div class="dj-name">
              <i class="iconfont icon-dj-play"></i>
              {{ item.name }}
            </div>
            <div class="dj-des">{{ item.copywriter }}</div>
            <div class="dj-basenum">
              <span class="dj-program-count">共{{ item.programCount }}期</span>
              <span class="dj-order-count">
                订阅{{ $utils.formatNum(item.playCount) }}次
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import { getCurrentInstance, reactive, toRefs } from 'vue'

const { proxy } = getCurrentInstance()
const DjInfo = reactive({
  Dj_list: [],
  Dj_params: { limit: 6 },
  loading: true,
  count: 6,
})
const getHotDjList = async () => {
  const { data: res } = await proxy.$http.getHotDj(DjInfo.Dj_params)

  if (res.code !== 200) {
    return proxy.$msg.error('数据请求失败')
  }

  DjInfo.Dj_list = res.djRadios
  DjInfo.loading = false
  console.log('dj', DjInfo.Dj_list)
}

getHotDjList()

const { Dj_list, loading, count } = toRefs(DjInfo)
</script>

<style lang="scss" scoped>
.el-skeleton {
  display: flex;
  flex-wrap: wrap;
  .ske__img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }
  .ske__name {
    height: 24px;
    width: 20%;
  }
  .ske__txt {
    height: 15px;
    width: 30%;
  }
}
.dj-list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  width: 50%;
  margin-bottom: 20px;
  .cover-img {
    width: 100px;
    height: 100px;
    .el-image {
      border-radius: 4px;
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 20px;
  }
  .dj-name {
    font-size: 18px;
    font-weight: 700;
    i {
      margin-right: 5px;
    }
  }
  .dj-des {
    font-size: 14px;
    color: #909090;
  }
  .dj-basenum {
    position: relative;
    font-size: 12px;
    color: #909090;

    .dj-order-count {
      position: absolute;
      right: 0;
    }
  }
}
</style>
