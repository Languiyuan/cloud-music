<template>
  <el-container>
    <el-header height="120px"><Header></Header></el-header>

    <el-container>
      <el-aside width="270px">
        <Sidebar />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <PlayBar></PlayBar>
  </el-container>
  <!-- <router-view></router-view> -->
</template>

<script setup>
import Header from '@components/Header.vue'
import Sidebar from '@components/Sidebar.vue'
import PlayBar from './components/playBar/PlayBar.vue'
</script>

<style></style>
