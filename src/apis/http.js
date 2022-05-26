import api from './instance'

// 首页轮播图
const getBanner = () => {
  return api.get('/banner', {})
}

/*************歌单 ****************/
// 热门歌单分类
const hotList = () => {
  return api.get('/playList/hot', {})
}
// 歌单列表
const playList = ({ order = 'hot', cat = '', limit = 50, offset = 0 }) => {
  return api.get(
    `/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`,
    {}
  )
}

/********** 专辑 新碟 ***********/
// 新碟上架
const topAlbum = ({
  limit = 20,
  offset = 0,
  area = 'all',
  type = 'new',
  year = '',
  month = '',
}) => {
  return api.get(
    `/top/album?limit=${limit}&offset=${offset}&area=${area}&type=${type}&year=${year}&month=${month}`,
    {}
  )
}

/********** 排行榜 ***********/
// 所有的排行榜（种类）
const toplist = () => {
  return api.get('/toplist', {})
}
// 获取排行榜的列表
const topRankList = ({ id = '', s = 8 }) => {
  return api.get(`/playlist/detail?id=${id}&s=${s}`, {})
}

/********** MV ***********/
// 最新MV
const newMv = ({ limit = 50 }) => {
  return api.get(`/mv/all?limit=${limit}`, {})
}

// 获取 mv
const mv = ({ area = '', type = '', order = '', limit = 50, offset = 0 }) => {
  return api.get(
    `/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`,
    {}
  )
}
export {
  getBanner,
  hotList,
  playList,
  topAlbum,
  toplist,
  topRankList,
  newMv,
  mv,
}
