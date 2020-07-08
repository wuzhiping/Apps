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

export default ({ app, router, store, Vue }) => { 
   router.beforeEach((to, from, next) => {
      console.dir(from.path + " -> " + to.path)
      // console.dir( store.state );
      // next();return;
      console.dir(to);
      if (store.state.token.userInfo || (to.meta.open || false) ){

         store.commit("token/where", { title: to.meta.title || to.path,
                                        back: to.meta.back  || false,
                                       color: to.meta.color || "linear-gradient(90deg,#595f69,#2173dc,#696969)"
                                     });
         next()
      }
      else
         next({ path: '/login' })

      // next();
  });
}

