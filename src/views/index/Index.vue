<template>
  <div class="home">
    <Banners />

    <div class="hot-list">
      <div class="m__title">
        <h3>热门推荐</h3>
        <span
          :class="{
            title__nav: true,
            active: playList_index == index ? true : false,
          }"
          v-for="(item, index) in playList_tags"
          :key="item.id"
          @click="choosePlayListType(index)"
          >{{ item.name }}</span
        >
      </div>
      <div class="wrapper">
        <PlayList
          :playList_list="playList_list"
          :loading="playList_loading"
          :count="playList_count"
        ></PlayList>
      </div>
    </div>

    <div class="album-list">
      <div class="m__title">
        <h3>新碟上架</h3>
        <span
          :class="{
            title__nav: true,
            active: album_index == index ? true : false,
          }"
          v-for="(item, index) in album_area"
          :key="item.index"
          @click="chooseAlbumType(index)"
          >{{ item.name }}</span
        >
      </div>
      <AlbumList
        :album_list="album_list"
        :loading="album_loading"
        :count="album_count"
      ></AlbumList>
    </div>

    <div class="rank-list">
      <RankList></RankList>
    </div>

    <div class="mv-list">
      <div class="m__title">
        <h3>最新MV</h3>
        <span
          :class="{
            title__nav: true,
            active: mv_index == index ? true : false,
          }"
          v-for="(item, index) in mv_type"
          :key="index"
          @click="chooseMVType(index)"
          >{{ item }}</span
        >
      </div>
      <MvList
        :mv_list="mv_list"
        :loading="mv_loading"
        :count="mv_count"
      ></MvList>
    </div>
  </div>
</template>

<script setup>
import Banners from '../../components/Banners.vue'
import PlayList from '../../components/PlayList.vue'
import AlbumList from '../../components/AlbumList.vue'
import RankList from './RankList.vue'
import MvList from '../../components/MvList.vue'

import hot_recom from '@assets/js/index/hot_recom.js'
import top_album from '@assets/js/index/album_list.js'
import new_mv from '@assets/js/index/mv_list.js'

import { toRefs } from 'vue'

// --------------推荐歌单
const { playList_info, choosePlayListType } = hot_recom()
const {
  playList_tags,
  playList_index,
  playList_list,
  playList_loading,
  playList_count,
} = toRefs(playList_info)

// --------------新碟上架
const { albumInfo, chooseAlbumType } = top_album()
const { album_area, album_list, album_count, album_loading, album_index } =
  toRefs(albumInfo)

// --------------最新mv
const { mv_info, chooseMVType } = new_mv()
const { mv_type, mv_index, mv_list, mv_loading, mv_count } = toRefs(mv_info)
</script>

<style lang="scss" scoped>
@import '@assets/scss/var.scss';
.hot-list {
  padding: 0 20px;
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}

.album-list {
  padding: 0 20px;
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  height: 507px;
}

.mv-list {
  padding: 0 20px;
  margin: 25px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
}
.m__title {
  display: flex;
  align-items: baseline;
  padding: 20px 0 10px;
  h3 {
    font-size: 28px;
    font-weight: 700;
    padding-right: 50px;
  }
  .title__nav {
    font-size: 16px;
    margin-right: 40px;
    color: $text-main-color;
    cursor: pointer;
  }
}
.active {
  position: relative;
  z-index: 1;
  font-weight: 600;
  color: $text-main-color;

  &::after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 1px;
    width: 100%;
    height: 6px;
    background: $text-hightLight;
    z-index: -1;
  }
}
</style>
