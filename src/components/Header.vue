<template>
  <div class="header">
    <router-link to="/">
      <img src="@assets/img/logo.jpg" class="header__img" />
    </router-link>
    <div class="header__right">
      <div class="header__input">
        <el-input
          placeholder="请输入歌名、歌词、歌手或专辑"
          size="large"
          input-style="{border: none}"
        ></el-input>
      </div>
      <span class="header__login">登录</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 20px 0 20px 15px;
  box-sizing: border-box;
  &__img {
    width: 145px;
    height: 60px;
  }
  &__right {
    display: flex;
    align-items: center;
    .header__input {
      width: 250px;
    }
    .header__login {
      margin-left: 20px;
      font-size: 16px;
    }
  }
}
</style>
