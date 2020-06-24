<template>
  <q-page class="row items-center justify-evenly" style="background:#f0f0f0;">
    <div class="q-pa-md">
        <div class="q-pa-md q-gutter-sm" style="width: 300px">
          <q-input color="orange" standout bottom-slots v-model="uid" label="Employee Id" counter clearable>
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
            <template v-slot:hint>
              uid
            </template>
          </q-input>
          <q-input color="orange" type="password" standout bottom-slots v-model="pwd" label="Password" counter clearable>
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:hint>
              pwd
            </template>
          </q-input>
          <q-toggle
            v-model="save"
            checked-icon="check"
            color="red"
            label="Auto login the next time"
            unchecked-icon="clear"/>
          <br/>
          <q-btn flat color="warning" label="CLEAR ALL" />
          <q-btn flat rounded color="primary" label="CANCLE" />
          <q-btn flat round color="red" icon="camera_rear" />
          <!--q-img
           :src="url"
           spinner-color="white"
           class="rounded-borders" /-->
        </div>
    </div>
  </q-page>
</template>

<script lang="javascript">
import Vue from 'vue';

export default Vue.extend({
  name: 'PageLogin',
  components: { },
  data() {
     return { 
        uid:"",
        pwd:"",
        save:true,
        url:"https://a.feg.com.tw/FEG/static/img/qr2.jpg"
     };
  }
});
</script>

<style lang="sass">

</style>

