<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <div class="row justify-center" style="margin-top:15px;">
      <div class="col-12">
        <q-input dense v-model="search" outlined type="search">
          <template v-slot:append>
            <q-icon name="search" @click="searchItem"></q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <h6 style="text-align:center;">total:{{filterList.length}}</h6>
    <q-infinite-scroll
      @load="onLoad"
      :offset="250"
      :disable="disable"
      style="margin-top:20px;"
      ref="scorll"
    >
      <q-card
        class="my-card"
        flat
        bordered
        v-for="(item, index) in filterList"
        :key="index"
        @click="showQRcode(item._id)"
      >
        <q-card-section>BIN LOCATION:{{item['BIN LOCATION']}}</q-card-section>
        <q-card-section>UNIT OF MEASURE:{{item['UNIT OF MEASURE']}}</q-card-section>
        <q-card-section>PRICE:{{item['PRICE']}}</q-card-section>
      </q-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-sticky position="bottom-left" :offset="[18, 18]" v-show="sticky">
      <q-btn round color="c" icon="arrow_back" class="rotate-90" @click="toTop"></q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";

import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";

PouchDB.plugin(PouchdbFind);

export default Vue.extend({
  name: "pageMro",
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
      hasMoreItems: false,

      sticky: false,

      db: new PouchDB("_MRO")
    };
  },
  computed: {
    filterList: function() {
      if (this.search) {
        var arr = this.dataList.filter(val => {
          var str = val.PRICE;
          if (str != undefined) return str.indexOf(this.search) >= 0;
        });
        return arr;
      } else {
        return this.dataList;
      }
    }
  },
  watch: {
    // search: function(val) {
    //   if (!val) {
    //     this.dataList = this.newList;
    //     this.$refs.scorll.reset();
    //     this.hasMoreItems = false;
    //   }
    // }
  },
  methods: {
    onLoad(index, done) {},
    searchItem() {},
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
    },
    ansycDb() {
      this.db
        .createIndex({
          index: {
            fields: ["action", "STOCK"],
            name: "indexAction"
          }
        })
        .then(function(res) {
          Notify.create({
            caption: "createIndex",
            message: res.result,
            html: true
          });
        });

      this.db
        .sync(
          new PouchDB("https://a.feg.com.tw/_MRO", {
            fetch: function(url, opts) {
              // opts.headers.set('Access-Control-Allow-Credentials', 'true');
              // opts.headers.set('Access-Control-Allow-Origin', '*');
              // opts.mode = 'cors'; // no-cors
              // opts.credentials = true;
              return PouchDB.fetch(url, opts);
            }
          }),
          {
            batch_size: 500,
            live: true,
            retry: true
          }
        )
        .on("change", function(info) {
          // handle change
          Notify.create({ caption: "sync change", message: info, html: true });
        })
        .on("paused", function(err) {
          // replication paused (e.g. replication up to date, user went offline)
          //Notify.create({ caption: "sync paused", message: err, html: true });
        })
        .on("active", function() {
          // replicate resumed (e.g. new changes replicating, user went back online)
          Notify.create({ caption: "sync active", message: "", html: true });
        })
        .on("denied", function(err) {
          // a document failed to replicate (e.g. due to permissions)
          Notify.create({ caption: "sync denied", message: err, html: true });
        })
        .on("complete", function(info) {
          // handle complete
          Notify.create({
            caption: "sync complete",
            message: info,
            html: true
          });
        })
        .on("error", function(err) {
          // handle error
          Notify.create({ caption: "sync error", message: err, html: true });
        });
    },
    findDate() {
      var that = this;
      this.db
        .find({
          selector: {
            action: "GetCtlg",
            STOCK: "Y"
          },
          limit: 100
        })
        .then(function(data) {
          //   console.dir(new Date());
          //   var result = Enumerable.from(data.docs)
          //     .select((val, i) => ({ value: val._id, index: i }))
          //     .toArray();
          //   console.dir(result);
          //   console.dir(new Date());
          that.dataList = data.docs;
        });
    },
    showQRcode(_id) {
      console.log(_id);
      var msg =
        '<div style="text-align:center;">' +
        '<img style="height:100%;" src="https://a.feg.com.tw/qrcode/' +
        _id +
        '"></div>';
      console.log(msg);
      this.$q.dialog({
        title: "QRcode",
        message: msg,
        html: true
      });
    }
  },
  created() {
    this.ansycDb();
  },
  async mounted() {
    this.$store.commit("token/where", {
      title: "MRO-"+this.site.toLowerCase(),
      color: "purple"
    });
    this.findDate();
    // window.addEventListener("scroll", this.handlerScroll);
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

