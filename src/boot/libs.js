import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueQrcodeReader from 'vue-qrcode-reader'
import formCreate from '@form-create/iview'

import PouchDB from 'pouchdb';
import io from 'socket.io-client/dist/socket.io.min'

Vue.use(formCreate)
Vue.use(VueQrcodeReader)
Vue.use(iView)

import Mock from 'mockjs'

export default ({ app }) => { }

