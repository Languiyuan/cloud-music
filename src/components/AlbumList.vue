<template>
  <el-skeleton animated :count="count" :throttle="500" :loading="loading">
    <template #template>
      <div class="item">
        <el-skeleton-item variant="image" class="ske__img" />
        <div class="ske__info">
          <el-skeleton-item variant="h3" class="ske__name" />
          <el-skeleton-item variant="h3" class="ske__name" />
          <el-skeleton-item variant="text" class="ske__txt" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="album-list">
        <router-link
          :to="{ path: '/album', query: { id: item.id } }"
          v-for="item in album_list"
          :key="item.id"
          class="item"
        >
          <div class="cover-img">
            <el-image :src="item.picUrl + '?param=120y120'" lazy>
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-image"></i>
                </div>
              </template>
            </el-image>
          </div>

          <div class="info">
            <div class="album-type">{{ item.type }}</div>
            <div class="album-name" v-if="item.name">{{ item.name }}</div>
            <div class="artist-name" v-if="item.artist">
              {{ item.artist.name }}
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
defineProps({
  album_list: {
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

.album-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: center;
  padding-bottom: 20px;
  box-sizing: border-box;
  .item {
    display: flex;
    flex: 25%;
    max-width: calc(100% / 4 - 20px);
    margin: 20px 10px 0;
    color: $text-main-color;
    background-color: #f0f0f0;
    border-radius: 4px;
    &:hover {
      .cover-img::after {
        right: -25px;
        transform: rotate(90deg);
      }
    }
  }
  .cover-img {
    display: block;
    position: relative;
    max-width: 120px;
    max-height: 120px;
    &::after {
      display: inline-block;
      content: '';
      position: absolute;
      top: 0;
      right: -20px;
      width: 100%;
      height: 100%;
      background: url('@assets/img/disc.png') no-repeat;
      background-size: contain;
      transition: all 0.4s linear;
    }
  }
  .info {
    flex: 1;
    margin-left: 40px;
    overflow: hidden;
    position: relative;
    .album-type {
      position: absolute;
      top: 5px;
      right: -33px;
      width: 100px;
      font-size: 12px;
      line-height: 2;
      text-align: center;
      background-color: $text-hightLight;
      color: #fff;
      transform: rotate(45deg);
    }

    .album-name {
      font-size: 16px;
      padding: 15% 20px 10px 0;
      word-break: break-all;
      @include ellipsis;
      &:hover {
        color: $text-hightLight;
      }
    }

    .artist-name {
      font-size: 14px;
      color: #909090;
    }
  }
  .el-image {
    border-radius: 4px;
    z-index: 2;
  }
}

.el-skeleton {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: center;
  padding-bottom: 20px;
  .item {
    display: flex;
    flex: 25%;
    max-width: calc(100% / 4 - 20px);
    margin: 20px 10px 0;
  }
  .ske__img {
    width: 120px;
    height: 120px;
  }

  .ske__info {
    flex: 1;
    padding: 30px;
    height: 120px;
    box-sizing: border-box;
  }

  .ske__name {
    margin-top: 3px;
  }

  .ske__txt {
    margin-top: 10px;
  }
}
</style>
