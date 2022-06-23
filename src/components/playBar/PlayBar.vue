<template>
  <div class="play-bar-main">
    <transition name="fade">
      <Bar
        @playAudioMode="playAudioMode"
        @audioHandler="playSongStates"
        @setAudioBoxTime="setAudioBoxTime"
        @isMutedHandler="isMutedHandler"
        @setVolumeProgress="setVolumeProgress"
      ></Bar>
    </transition>
  </div>
  <AudioBox ref="audioRef" @setCurrentTime="setCurrentTime"></AudioBox>
</template>

<script setup>
import Bar from './Bar.vue'
import AudioBox from './AudioBox.vue'
import { computed, ref, provide, onMounted } from 'vue'
import { useStore } from 'vuex'

const audioRef = ref(null)
const store = useStore()
const currentTime = ref(0)

// 更新实时歌曲的时间
const setCurrentTime = (t) => {
  currentTime.value = t
}
// 下发时间戳
provide('currentTime', currentTime)

// 播放的模式
const playAudioMode = (type) => {
  audioRef.value.playAudioMode(type)
}
// 播放 暂停 上一首 下一首
const playSongStates = (state) => {
  audioRef.value.playAudioType(state)
}
// 拖动进度条 改变audiobox时间
const setAudioBoxTime = (t) => {
  audioRef.value.setAudioProgress(t)
}
// 静音处理
const isMutedHandler = (flag) => {
  audioRef.value.isMutedHandler(flag)
}
// 音量处理 (拖动slider)
const setVolumeProgress = (val) => {
  audioRef.value.setVolumeProgress(val)
}
</script>

<style scoped lang="scss"></style>
