<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <!-- <input v-model="number" />
    <p v-for="index in 300" :key="index">{{index}}</p>-->
    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-card class="my-card" flat bordered v-for="(item, index) in newList" :key="index">
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{item.titleClear}}</div>
          <div
            class="text-caption text-grey"
            v-if="/^http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(item.summClear)"
          >
            <q-img class="rounded-borders" :src="item.summClear"></q-img>
          </div>
          <div class="text-caption text-grey" v-else>{{item.summClear}}</div>
        </q-card-section>

        <q-card-section v-if="item.img.length">
          <q-img v-for="(img,index) in item.img" :key="index" class="rounded-borders" :src="img"></q-img>
        </q-card-section>
        <q-card-section class="q-pt-xs column items-end">{{item.upTime | getTime}}</q-card-section>
      </q-card>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";

export default Vue.extend({
  name: "PageNews",
  components: {},
  data() {
    return {
      number: 0,

      newList: [],
      allNews: [],

      pageIndex: 1,
      everyPage: 6,
      total: 0
    };
  },
  filters: {
    getTime: function(value) {
      var value = new Date(value);
      var time =
        value.getFullYear() +
        "-" +
        (value.getMonth() + 1) +
        "-" +
        value.getDate() +
        " " +
        value.getHours() +
        ":" +
        value.getMinutes() +
        ":" +
        value.getSeconds();
      return time;
    }
  },
  methods: {
    onLoad(index, done) {
      if (this.pageIndex * this.everyPage > this.total) {
        done();
      } else {
        setTimeout(() => {
          this.pageIndex++;
          var temp = this.pageIndex * this.everyPage - 1;
          this.newList = this.allNews.slice(0, temp);
          done();
        }, 500);
      }
    },
    getAllNews: async function() {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .post("https://a.feg.com.tw/oauth2/magazine", {
            action: "feg",
            paperType: "TW",
            device: null
          })
          .then(res => {
            that.allNews = res.data;
            resolve();
          })
          .catch(error => {
            console.log(error);
            that.$Message.error(error);
            reject();
          });
      });
      return p;
    }
  },
  created() {
    this.getAllNews().then(() => {
      this.newList = this.allNews.slice(0, this.everyPage - 1);
      this.total = this.allNews.length;
    });
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    //this.$store.commit("position/getyPos", document.documentElement.scrollTop);
    next();
  },
  activated() {
    // setTimeout(() => {
    //   document.documentElement.scrollTop = this.$store.state.position.yPos;
    // }, 1000);
  }
});
</script>

<style scoped>
.my-card {
  margin-bottom: 20px;
}
</style>

