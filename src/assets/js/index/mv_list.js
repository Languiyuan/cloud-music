import { getCurrentInstance, reactive } from 'vue'

export default function () {
  const { proxy } = getCurrentInstance()
  const mv_info = reactive({
    mv_type: proxy.$COMMON.MV_AREA,
    mv_list: [],
    mv_params: { limit: 12 },
    mv_loading: true,
    mv_index: 0,
    mv_count: 12,
  })

  const getNewMvList = async () => {
    const { data: res } = await proxy.$http.mv(mv_info.mv_params)

    if (res.code !== 200) {
      return proxy.$msg.error('数据请求失败！')
    }
    mv_info.mv_list = res.data
    mv_info.mv_loading = false
  }

  getNewMvList()

  const chooseMVType = (index) => {
    mv_info.mv_index = index
    mv_info.mv_params.area = mv_info.mv_type[index]
    getNewMvList()
  }
  return {
    mv_info,
    chooseMVType,
  }
}
