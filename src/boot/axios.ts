import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  axios.defaults.baseURL = 'https://a.feg.com.tw';

  axios.defaults.withCredentials=true;
  axios.defaults.headers.common["TZ"] = -(new Date()).getTimezoneOffset()/60;

  // axios.defaults.retry = 2;
  // axios.defaults.retryDelay = 2000;
  axios.defaults.timeout = 20000;

  Vue.prototype.$axios = axios;
});
