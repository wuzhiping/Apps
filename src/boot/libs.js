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
import { userMsg } from "../service/agilebpm/org/userResource";

export default ({ app, router, store, Vue }) => { 
   router.beforeEach((to, from, next) => {
      console.dir(from.path + " -> " + to.path)

      // console.dir( store.state );
      // next();return;
      if (store.state.token.userInfo || (to.meta.open || false) ){

         store.commit("token/where", { title: to.meta.title || to.path,
                                        back: to.meta.back  || false,
                                       color: to.meta.color || "linear-gradient(90deg,#595f69,#2173dc,#696969)"
                                     });
         next()
      }
      else {
         // console.dir("auto");
         userMsg()
            .then((result)=>{
                  var res = result.data;
                  // console.dir(res.data);

                  if(res.isOk){
                     store.commit("token/login", res.data);
                     next();
                  } else {
                     next({ path: '/login' })
                  }
            })
           .catch((error)=>{ console.dir(error); next({ path: '/login' })  });
      }

      // next();
  });
}

