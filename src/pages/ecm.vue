<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <div class="row justify-center" style="margin-top:15px;">
      <div class="col-12">
        <q-input dense v-model="search" clearable outlined type="search">
          <template v-slot:append>
            <q-icon name="search" @click="searchItem"></q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <q-infinite-scroll
      @load="onLoad"
      :offset="250"
      :disable="disable"
      style="margin-top:20px;"
      ref="scorll"
    >
      <q-card class="my-card" flat bordered v-for="(item, index) in dataList" :key="index">
        <q-card-section class="q-pt-xs"></q-card-section>
        <q-card-section>
          <h6>{{item.entry.name}}</h6>
        </q-card-section>
        <!-- <q-card-section>
          <q-img
            class="rounded-borders"
            :src="'https://a.feg.com.tw/yuedan/alfresco/service/api/node/workspace/SpacesStore/'+item.entry.id+'/content/thumbnails/doclib'"
          ></q-img>
        </q-card-section>-->
        <q-card-section style="float:left;"
          v-if="item.entry.createdByUser&&item.entry.createdByUser.displayName"
          class="q-pt-xs column items-end"
        >{{item.entry.createdByUser.displayName}}</q-card-section>
        <q-card-section
          v-if="item.entry.createdAt"
          class="q-pt-xs column items-end"
        >{{item.entry.createdAt }}</q-card-section>
      </q-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-sticky position="bottom-left" :offset="[18, 18]" v-show="sticky">
      <q-btn round color="orange" icon="arrow_back" class="rotate-90" @click="toTop"></q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";

export default Vue.extend({
  name: "pageEcm",
  props: ["site"],
  components: {},
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
  data() {
    return {
      search: "",

      maxItems: 6,
      pageIndex: 0,

      disable: true,

      dataList: [],
      newList: [],
      hasMoreItems: false,

      sticky: false
    };
  },
  watch: {
    search: function(val) {
      if (!val) {
        this.dataList = this.newList;
        this.$refs.scorll.reset();
        this.hasMoreItems = false;
      }
    }
  },
  methods: {
    onLoad(index, done) {
      console.log("onLoad");
      console.log(index);
      if (this.hasMoreItems) {
        if (index == 1) {
          done();
        } else {
          this.getData().then(res => {
            this.dataList = this.dataList.concat(res.entries);
            this.hasMoreItems = res.pagination.hasMoreItems;
            this.pageIndex++;
            done();
          });
        }
      } else {
        this.disable = true;
        this.$refs.scorll.reset();
        done();
      }
    },
    getData: async function() {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .post(
            "https://a.feg.com.tw/oauth2/yuedan?site=" +
              that.site +
              "&text=" +
              that.search +
              "&action=search&maxItems=" +
              that.maxItems +
              "&skipCount=" +
              that.pageIndex * that.maxItems,
            {}
          )
          .then(res => {
            //console.log(res);
            resolve(res.data.list);
          })
          .catch(error => {
            Notify.create({ caption: "error", message: error, html: true });
            //that.$Message.error(error);
            reject();
          });
      });
      return p;
    },
    newData: async function() {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .post(
            "https://a.feg.com.tw/oauth2/yuedan?site=" +
              that.site +
              "&action=new&maxItems=20&pageIndex=0",
            {}
          )
          .then(res => {
            //console.log(res);
            resolve(res.data.list);
          })
          .catch(error => {
            Notify.create({ caption: "error", message: error, html: true });
            //that.$Message.error(error);
            reject();
          });
      });
      return p;
    },
    searchItem() {
      this.pageIndex = 0;
      this.dataList = [];
      this.disable = true;
      this.getData()
        .then(res => {
          this.dataList = res.entries;
          this.hasMoreItems = res.pagination.hasMoreItems;
          this.disable = false;
          this.pageIndex++;
        })
        .catch(error => {
          Notify.create({ caption: "ereror", message: error, html: true });
          //this.$Message.error(error);
        });
    },
    toTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    handlerScroll() {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) > 800
      ) {
        this.sticky = true;
      } else this.sticky = false;
    }
  },
  created() {},
  async mounted() {
    await this.newData().then(res => {
      this.newList = res.entries;
      this.dataList = this.newList;
    });
    this.$store.commit("token/where", {
      title: this.site.toUpperCase(),
      color: "orange"
    });
    window.addEventListener("scroll", this.handlerScroll);
  },

  activated() {
    this.disable = false;
  },
  deactivated() {
    this.disable = true;
  }
});
</script>

<style scoped>
.my-card {
  margin-bottom: 20px;
}
</style>

