<template>
  <q-page class="row items-center justify-evenly" style="background:black;overflow:hidden;">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'

export default {
  data () {
    return {
      decodedString: null
    }
  },
  // name: 'PageName',
 created(){
      this.$Message.config({
        top: 70,
        duration: 8
      });

     this.$q.loading.show()
  },

  mounted: async function () {
        var that = this;

        this.$store.commit("token/where", { title:this.$route.params.appId, back: !this.$route.params.appId, color:"black" });
        this.$q.loading.hide()
  },
  methods: {
    onDecode (value) {
      var that = this;

      if(this.decodedString != value){
         this.decodedString  = value;
         if(value)
             // Notify.create( { caption:"QR", message: value, html:true} );
             that.$axios.post('https://a.feg.com.tw/oauth2/qrcode4app', 
                { 
                   qrcode:value ,
                   appId:that.$route.params.appId,
                   uid : (this.$store.state.token || { userInfo: { user: {} }}).userInfo.user.account || 'guest'
                }).then((res) => {
                 console.dir(res.data);
                 // this.$Message.info(res.data.qrcode"<br>"+res.data.from);

                 Notify.create( { caption:res.data.from, message: res.data.qrcode, html:true} );

                 if(res.data.route){
                    that.$router.push( res.data.route );
                 }
                 else that.$router.go(-1);

             }).catch(error => {
                     console.log(error);
                     this.$Message.error(error);
             });
         else
             this.$router.go(-1);
      }
    }
  }
}
</script>
