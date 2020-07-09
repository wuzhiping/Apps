import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';

import { StoreInterface } from '../store';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<StoreInterface>(function ({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash
        }
      } else if (savedPosition) {
        return savedPosition
      } else if (to.meta.saved_position) {
        return to.meta.saved_position
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if (from.meta.keepAlive) {
      from.meta.saved_position = { x: 0, y: document.documentElement.scrollTop };
    }
    next();
  });

  return Router;
})
