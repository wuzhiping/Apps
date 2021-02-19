<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <div class="row justify-center" style="margin-top:15px;">
      <h5 class="bold">Notification Master</h5>
    </div>
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
        v-for="(item, index) in dataList"
        :key="index"
        @click="showDetail(item)"
      >
        <q-card-section>
          <h5 class="bold">{{item.title}}</h5>
          <h6>ticket#{{item.number}}</h6>
          <p>所有者:{{item.owner_id}}</p>
          <p>优先级:{{item.priority_id}}</p>
          <p>状态:{{item.state_id}}</p>
          <p>系统:{{item.sys}}</p>
          <p style="color:#ccc;">
            <span>created:id:{{item.created_by_id}}</span>
            <span style="float:right;">time:{{item.created_at | getTime}}</span>
          </p>
          <p v-if="item.updated_by_id && item.updated_at" style="color:#ccc;">
            <span>updated:id:{{item.updated_by_id}}</span>
            <span style="float:right;">time:{{item.updated_at | getTime}}</span>
          </p>
        </q-card-section>
        <q-card-section></q-card-section>
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
    <q-dialog v-model="inputDetailShow" full-width persistent>
      <q-card>
        <q-card-section>
          <q-timeline color="secondary" style="word-wrap: break-word;word-break: normal;">
            <q-timeline-entry heading>Ticket#{{number}}</q-timeline-entry>
            <q-timeline-entry
              :title="item.subject"
              v-for="(item, index) in inputdetailList"
              :key="index"
              :subtitle="item.updated_at | getTime"
            >
              <p>主题:{{item.subject}}</p>
              <p>内容:</p>
              <p v-html="item.body"></p>
              <p class="att">附件(请在电脑端查看)：</p>
              <p class="att" v-for="(a, index) in item.attachments" :key="index">{{a.filename}}</p>
              <p style="font-weight:bold;">from:{{item.from}}</p>
              <p style="font-weight:bold;">to:{{item.to}}</p>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
        <q-card-actions>
          <q-btn label="OK" @click="inputDetailShow=false" color="primary"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";
export default Vue.extend({
  name: "pageZammad",
  components: {},
  filters: {
    getTime: function(value) {
      var value = new Date(value);
      var hour =
        value.getHours() < 10 ? "0" + value.getHours() : value.getHours();
      var minutes =
        value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
      var seconds =
        value.getSeconds() < 10 ? "0" + value.getSeconds() : value.getSeconds();
      var months =
        value.getMonth() < 9 ? "0" + value.getMonth() : value.getMonth();
      var days = value.getDate() < 9 ? "0" + value.getDate() : value.getDate();

      var time =
        value.getFullYear() +
        "-" +
        (months + 1) +
        "-" +
        days +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds;
      return time;
    }
  },
  data() {
    return {
      sticky: false,

      index: 1,
      pageSize: 6,
      disable: true,
      allList: [],
      dataList: [],
      hasMoreItems: false,

      dense: false,
      inputDetailShow: false,
      inputdetailList: [],

      number: "",
      id: ""

    };
  },
  watch: {},
  methods: {
    showDetail(item) {
      this.inputDetailShow = true;
      this.getDetail(item).then(res => {
        this.inputdetailList = JSON.parse(res.data.body);
      });
    },
    toTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    onLoad(index, done) {
      console.log("onLoad");
      console.log(index);
      if (this.hasMoreItems) {
        if (index == 1) {
          done();
        } else {
          setTimeout(() => {
            this.index = index;
            this.dataList = this.allList.slice(0, this.index * this.pageSize);
            if (this.index * this.pageSize >= this.allList.length)
              this.hasMoreItems = false;
            done();
          }, 500);
        }
      } else {
        this.disable = true;
        this.$refs.scorll.reset();
        done();
      }
    },
    handlerScroll() {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) > 800
      ) {
        this.sticky = true;
      } else this.sticky = false;
    },
    getData: async function() {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .post("https://a.feg.com.tw/BDD/API/bpm/zammad/comm/ticket", {
            email: that.$store.state.token.userInfo.user.email
          })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            that.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: error
            });
            reject();
          });
      });
      return p;
    },
    getDetail: async function(item) {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .post(
            "https://a.feg.com.tw/BDD/API/bpm/zammad/comm/ticket?id=" + item.id,
            {
              email:that.email
            }
          )
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            that.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: error
            });
            reject();
          });
      });
      return p;
    }
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handlerScroll);
    this.getData().then(res => {
      this.allList = JSON.parse(res.data.body);
      if (this.allList.length <= this.pageSize) {
        this.dataList = this.allList.slice(0, this.allList.length);
        this.disable = true;
      } else {
        this.dataList = this.allList.slice(0, this.index * this.pageSize);
        this.hasMoreItems = true;
        this.disable = false;
      }
      console.log(this.allList);
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "getData success"
      });
    });
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
.bold {
  font-weight: bold;
  color: #1976d2;
}
.att {
  color: orangered;
  font-weight: bold;
}

</style>


