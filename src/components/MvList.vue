<template>
  <el-skeleton animated :count="count" :throttle="500" :loading="loading">
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" class="ske__img" />
        <div class="ske__info">
          <el-skeleton-item variant="h3" class="ske__name" />
          <el-skeleton-item variant="h3" class="ske__name" />
          <div class="ske__tags">
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="mvlist">
        <div class="item" v-for="item in mv_list" :key="item.id">
          <router-link
            :to="{ path: '/mvlist/mv', query: { id: item.id } }"
            class="cover-img"
          >
            <i class="iconfont icon-video-play"></i>
            <el-image :src="item.cover" :fit="'contain'" lazy>
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-image"></i>
                </div>
              </template>
            </el-image>
          </router-link>

          <div class="info">
            <router-link
              :to="{ path: '/mvlist/mv', query: { id: item.id } }"
              class="info__name"
              >{{ item.name }}
            </router-link>
            <router-link
              :to="{ path: '/singer', query: { id: item.artistId } }"
              class="info__artist"
              >{{ item.artistName }}
            </router-link>
            <div class="tags">
              <i class="iconfont icon-video"></i>
              {{ $utils.formatNum(item.playCount) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
defineProps({
  mv_list: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
  count: {
    type: Number,
    default: 12,
  },
})
</script>

<style lang="scss" scoped>
@import '@assets/scss/var.scss';
@import '@assets/scss/mixins.scss';
.mvlist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item {
  width: calc(100% / 6);
  margin-top: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  &:hover {
    .el-image {
      transform: scale(1.1);
    }
    .icon-video-play {
      transform: translate(150%, 50%) scale(1);
      opacity: 1;
    }
  }
}

.cover-img {
  display: block;
  position: relative;
  width: 100%;
  // 为了撑开盒子高度，类似于提前占位
  height: 123px;
  overflow: hidden;
  background-color: #f5f7fa;
  border-radius: 4px;

  .icon-video-play {
    position: absolute;
    overflow: hidden;
    transform: translate(150%, 50%) scale(0.5);
    opacity: 0;
    font-size: 60px;
    color: #fff;
    transition: all 0.4s linear;
    z-index: 3;
    text-shadow: 2px 2px 2px #000;
  }
  .el-image {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    transition: all 0.4s linear;
    z-index: 2;
  }
}

.info {
  padding: 15px 0;
  font-size: 14px;
}
.info__name {
  display: block;
  height: 20px;
  font-weight: 400;
  @include ellipsis;
}
.info__artist {
  display: block;
  line-height: 24px;

  font-weight: 400;
  color: #999999;
}
.tags {
  line-height: 24px;

  color: #999999;
  i {
    font-size: 20px;
    vertical-align: middle;
  }
}

.el-skeleton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0;

  .ske__img {
    width: 100%;
    height: 123px;
  }

  .ske__info {
    padding: 15px 0;
  }

  .ske__name {
    width: 55%;
    line-height: 16px;
    margin: 3px 0;
  }

  .ske__tags {
    display: flex;
    padding: 5px 0;

    * {
      width: 20%;
      margin-right: 10px;
    }
  }
}
</style>
