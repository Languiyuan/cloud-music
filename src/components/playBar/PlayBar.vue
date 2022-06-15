<template>
  <div class="play-bar-main">
    <transition name="fade">
      <Bar></Bar>
    </transition>
  </div>
</template>

<script setup>
import Bar from './Bar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
</script>

<style scoped lang="scss"></style>
