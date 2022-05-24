<template>
  <div class="banner">
    <el-skeleton class="skeleton" :loading="skeletonLoading" animated>
      <template #template>
        <el-skeleton-item class="skeleton__img" variant="image" />
        <el-skeleton-item class="skeleton__img" variant="image" />
        <el-skeleton-item class="skeleton__img" variant="image" />
        <el-skeleton-item class="skeleton__img" variant="image" />
      </template>
      <template #default>
        <swiper
          :slides-per-view="4"
          :space-between="30"
          :modules="modules"
          :autoplay="{ delay: 3000 }"
          :pagination="{ clickable: true }"
          ref="mySwiper"
          class="banner__wrap"
        >
          <swiper-slide v-for="item of banners" :key="item.imageUrl">
            <el-image
              :src="item.imageUrl"
              :alt="item.typeTitle"
              class="banner__img"
            >
              <template #placeholder>
                <div class="image-slot">占位符</div>
              </template>
            </el-image>
          </swiper-slide>
        </swiper>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, onMounted, toRefs } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper'

const modules = [Pagination, Autoplay]
let skeletonLoading = ref(true)

const { proxy } = getCurrentInstance()
const bannerList = reactive({ banners: [] })
const { banners } = toRefs(bannerList)
const GetBanner = async () => {
  try {
    const { data: res } = await proxy.$http.getBanner()
    if (res.code !== 200) {
      proxy.$msg.error('请求数据失败')
    }
    bannerList.banners = res.banners
    skeletonLoading.value = false
  } catch (error) {
    proxy.$msg.error(error.message)
  }
}

onMounted(() => {
  GetBanner()
})
</script>

<style lang="scss" scoped>
@import '@assets/scss/var.scss';

$banner-width: calc((1610px - 90px) / 4);
.skeleton {
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  .skeleton__img {
    flex: 1;
    width: $banner-width;
    height: calc-height($banner-width, 1080, 400);
  }
}
.banner {
  padding-bottom: 30px;
  .banner__wrap {
    padding-bottom: 40px;
    .banner__img {
      width: $banner-width;
      height: calc-height($banner-width, 1080, 400);
      border-radius: 10px;
    }
  }
}
</style>
