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
          <q-btn flat round color="red" @click="login" icon="camera_rear" />
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
import Mock from 'mockjs'

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
  },
  methods:{
    login(){
       this.$store.commit("token/login", { uid:'041007'});
       this.$router.push('/');
       // this.$router.go(-1);
    }
  },
  created(){
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
    // 输出结果
    console.log(JSON.stringify(data, null, 4))     
  }
});
</script>

<style lang="sass">

</style>

