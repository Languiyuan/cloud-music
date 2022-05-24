import app from '@utils/app'
import * as getApi from '@apis/http'
import router from './router/index'
import store from './store/index'
import util from '@utils/utils.js'
import common from '@assets/js/common.js'

import '@assets/css/global.css'
import '@assets/fonts/iconfont.css'

app.config.globalProperties['$http'] = getApi
app.config.globalProperties['$msg'] = ElMessage
app.config.globalProperties['$utils'] = util
app.config.globalProperties['$COMMON'] = common

app.use(router).use(store).mount('#app')
