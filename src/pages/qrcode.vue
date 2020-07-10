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
  methods: {
    onDecode (value) {
      if(this.decodedString != value){
         this.decodedString  = value;
         if(value)
             Notify.create( { caption:"QR", message: value, html:true} );
         else
             this.$router.go(-1);
      }
    }
  }
}
</script>
