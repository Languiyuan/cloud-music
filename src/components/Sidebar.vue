<template>
  <ul class="menuList">
    <li
      :class="{
        menuList__item: true,
        item__active: curPath.indexOf(item.path) >= 0,
      }"
      v-for="item in menuList"
      :key="item.path"
      @click="selectMenu(item.path)"
    >
      <i :class="['iconfont', `icon-${item.path}`]"></i>
      <span class="menuList__item__name">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

const router = useRouter()

const menuList = reactive([
  {
    name: '首页',
    path: 'index',
  },
  {
    name: '排行榜',
    path: 'rank',
  },
  {
    name: '歌单',
    path: 'playlist',
  },
  {
    name: 'MV',
    path: 'mvlist',
  },
  {
    name: '歌手',
    path: 'artist',
  },
  {
    name: '我的音乐',
    path: 'my',
  },
])

let curPath = ref('index')
const selectMenu = (toPath) => {
  curPath.value = toPath
  router.push({ path: '/' + toPath })
}
</script>

<style lang="scss" scoped>
.menuList {
  padding: 0 35px;
  &__item {
    display: flex;
    width: 200px;
    height: 52px;
    font-size: 16px;
    line-height: 52px;
    padding: 10px 16px;
    align-items: center;
    border-radius: 14px;
    &__name {
      margin-left: 10px;
      color: #2d2d2d;
      font-weight: 500;
    }
  }
  .item__active {
    background-color: #fff;
    .iconfont {
      background: #ff641e;
      color: #fff;
    }
    .menuList__item__name {
      font-weight: 700;
    }
  }
  .iconfont {
    display: inline-flex;
    width: 40px;
    height: 40px;
    font-size: 23px;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: #909090;
    box-shadow: 0 4px 6px rgb(0 0 0 / 12%);
    border-radius: 6px;
  }
}
</style>
