import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue, router }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  axios.defaults.baseURL = 'http://ateam.feg.cn:85';

  axios.defaults.withCredentials=false;
  //axios.defaults.headers.common["TZ"] = -(new Date()).getTimezoneOffset()/60;

  // axios.defaults.retry = 2;
  // axios.defaults.retryDelay = 2000;
  axios.defaults.timeout = 20000;

  //
  axios.interceptors.response.use((response) => {
        console.dir(response);
        if(response.data && response.data.code === '401'){
             Notify.create( { 
                              caption:response.config.url.replace( response.config.baseURL,'' ), 
                              message:response.data.msg || response.data.code 
                            });
             router.push('/login')
             return Promise.reject(response.data.msg || response.data.code);

        }
        return response.data
    }, (error) => {
        if (error.response.status === 401) {
            
            router.push('/login')
        }
        Notify.create({
                           caption:error.response.status,
                           message:"restfull error"
                      });
        return Promise.reject(error)
    })
  //
  Vue.prototype.$axios = axios;
});
