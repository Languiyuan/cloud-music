import { getCurrentInstance, reactive } from 'vue'

export default function top_album() {
  const { proxy } = getCurrentInstance()

  const albumInfo = reactive({
    album_area: proxy.$COMMON.ALBUM_AREA,
    album_list: [],
    album_params: { limit: 12 },
    album_count: 12,
    album_loading: true,
    album_index: 0,
  })

  const getAlbumList = async (params) => {
    const { data: res } = await proxy.$http.topAlbum(params)

    if (res.code !== 200) {
      return proxy.$msg.error('数据请求失败')
    }

    albumInfo.album_list = res.monthData.slice(0, albumInfo.album_count)
    albumInfo.album_loading = false
  }
  getAlbumList(albumInfo.album_params)

  const chooseAlbumType = (index) => {
    albumInfo.album_params.area = albumInfo.album_area[index].code
    albumInfo.album_index = index
    albumInfo.album_loading = true
    getAlbumList(albumInfo.album_params)
  }

  return { albumInfo, chooseAlbumType }
}
