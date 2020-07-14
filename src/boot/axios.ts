import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

const axiosInstance = axios.create()

export default boot(({ app, Vue, router }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.dir( process.env.DEV )
  if(process.env.DEV)
     axiosInstance.defaults.baseURL = "http://ateam.feg.cn:85"
  else
     axiosInstance.defaults.baseURL = "https://a.feg.com.tw"

  axiosInstance.defaults.withCredentials=true;
  axiosInstance.defaults.headers.common["TZ"] = -(new Date()).getTimezoneOffset()/60;
  
  // axiosInstance.defaults.headers.common["i18n"] =  app.i18n.locale;
  // axios.defaults.retry = 2;
  // axios.defaults.retryDelay = 2000;
  axiosInstance.defaults.timeout = 8000;

  //
  axiosInstance.interceptors.request.use(function (config) {
       // axiosInstance.defaults.headers.common["i18n"] =  app.i18n.locale;
       return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }); 
  //
  axiosInstance.interceptors.response.use((response) => {
        // console.dir(response);
        if(response && response.data && response.data.code === '401'){
             /*
             Notify.create( { 
                              caption:response.config.url.replace( response.config.baseURL,'' ), 
                              message:response.data.msg || response.data.code 
                            });
             */
             router.push('/login')
             return Promise.reject(response.data.msg || response.data.code);

        }
        return response
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
  Vue.prototype.$axios = axiosInstance;
});

export { axiosInstance }

