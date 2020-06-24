import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueQrcodeReader from 'vue-qrcode-reader'
import formCreate from '@form-create/iview'

Vue.use(formCreate)
Vue.use(VueQrcodeReader)
Vue.use(iView)

import Mock from 'mockjs'

export default ({ app }) => { }

