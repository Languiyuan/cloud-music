import { getCurrentInstance, reactive } from 'vue'

export default function hot_recom() {
  const { proxy } = getCurrentInstance()

  //---推荐歌单
  // 热门推荐歌单
  const playList_info = reactive({
    playList_tags: [],
    playList_list: [],
    playList_index: 0,
    playList_loading: true,
    playList_params: { limit: 6, offset: 0, cat: '' },
    playList_count: 6,
  })

  // 获取热门推荐歌单标签
  const getHotTags = async () => {
    const { data: res } = await proxy.$http.hotList()

    if (res.code !== 200) {
      return proxy.$msg.error('数据请求失败!')
    }

    res.tags.unshift({ name: '为您推荐' })
    playList_info.playList_tags = res.tags.splice(0, 6)
  }
  getHotTags()

  // 选择歌单类型
  const choosePlayListType = (index) => {
    playList_info.playList_index = index
    playList_info.playList_params.cat =
      index !== 0 ? playList_info.playList_tags[index].name : ''
    getPlayList(playList_info.playList_params)
  }

  // 分类歌单列表
  const getPlayList = async (params) => {
    const { data: res } = await proxy.$http.playList(params)

    if (res.code !== 200) {
      return proxy.$msg.error('数据请求失败!')
    }

    playList_info.playList_list = res.playlists
    playList_info.playList_loading = false
  }

  getPlayList(playList_info.playList_params)

  return {
    playList_info,
    choosePlayListType,
  }
}
