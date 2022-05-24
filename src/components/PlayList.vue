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
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="playlist">
        <div class="item" v-for="item in playList_list" :key="item.id">
          <router-link
            :to="{ path: '/playlist/detail', query: { id: item.id } }"
            class="cover-img"
          >
            <el-image :src="item.coverImgUrl">
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-image"></i>
                </div>
              </template>
            </el-image>
            <span class="play-count">
              <i class="iconfont icon-headset"></i>
              {{ $utils.formatNum(item.playCount) }}/{{ item.trackCount }}首
            </span>
          </router-link>

          <div class="info">
            <router-link
              :to="{ path: '/playlist/detail', query: { id: item.id } }"
              class="info__name"
              >{{ item.name }}
            </router-link>
            <div class="tags">
              <router-link
                :to="{ path: '/playlist', query: { cat: tag } }"
                v-for="(tag, index) in item.tags"
                :key="index"
                class="tag"
                >#{{ tag }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
defineProps({
  playList_list: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
  count: {
    type: Number,
    default: 6,
  },
})
</script>

<style lang="scss" scoped>
@import '@assets/scss/var.scss';
.playlist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item {
  width: calc(100% / 6);
  padding: 20px 40px 20px 0;
  box-sizing: border-box;
}

.cover-img {
  display: block;
  position: relative;
  // 为了撑开盒子高度，类似于提前占位
  padding-top: 100%;
  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #d9d9d9;
    position: absolute;
    top: 0;
  }

  &::before {
    right: -6px;
    transform: scale(0.85);
    transform-origin: 100% 50%;
    z-index: 2;
    border-radius: 2px;
    transition: all 0.4s linear;
  }

  &::after {
    right: -11px;
    transform: scale(0.73);
    transform-origin: 100% 50%;
    z-index: 1;
    border-radius: 2px;
    opacity: 0.5;
    transition: all 0.4s linear 0.1s;
  }
  .el-image {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    border-radius: 4px;
  }

  .play-count {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 10px;
    line-height: 32px;
    display: block;
    font-size: 12px;
    border-radius: 0 4px 0 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 97%,
      rgba(0, 0, 0, 0.5) 100%
    );
    color: #fff;
    z-index: 4;
  }
}

.item:hover {
  .cover-img {
    position: relative;
    &::after,
    &::before {
      background: #ff960080;
    }
    &::before {
      right: -8px;
    }
    &::after {
      right: -15px;
    }
  }
}
.info__name {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 400;
}
.tags {
  padding: 5px 0;
  .tag {
    padding-right: 5px;
    font-size: 12px;
    color: $text-hightLight;
  }
}

// 每个歌单的宽度
$w: calc($main-width / 6 - 40px);
.el-skeleton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0;

  .ske__img {
    width: $w;
    height: $w;
    line-height: $w;
  }

  .ske__info {
    padding-top: 15px;
  }

  .ske__name {
    line-height: 16px;
    margin: 3px 0;
  }

  .ske__tags {
    display: flex;
    padding: 5px 0;

    * {
      width: 10%;
      margin-right: 10px;
    }
  }
}
</style>
