<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <q-btn icon="event" round color="primary">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-date v-model="date" mask="YYYY-MM-DD" color="orange">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup></q-btn>
            <q-btn label="OK" color="primary" flat @click="save" v-close-popup></q-btn>
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
    <q-timeline color="orange" layout="loose">
      <q-timeline-entry heading tag="h4">work attendance</q-timeline-entry>
      <q-timeline-entry
        v-for="(item,index) in timeline"
        :key="index"
        :side="(index%2==1)?'left':'right'"
      >
        <template v-slot:title>{{item}}</template>
        <template v-slot:subtitle>check in</template>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";

export default Vue.extend({
  name: "pageLog",
  components: {},
  data() {
    return {
      date: this.getTime(new Date()),
      user: "",
      timeline: []
    };
  },
  methods: {
    getData: async function() {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .post("https://a.feg.com.tw/oauth2/logs", {
            uid: that.user.account,
            date: that.date
          })
          .then(res => {
            //console.log(res);
            resolve(res.data);
          })
          .catch(error => {
            Notify.create({ caption: "error", message: error, html: true });
            //that.$Message.error(error);
            reject();
          });
      });
      return p;
    },
    getTime: function(value) {
      var month =
        value.getMonth() < 9
          ? "0" + (value.getMonth() + 1)
          : value.getMonth() + 1;
      var day = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();

      var time = value.getFullYear() + "-" + month + "-" + day;
      return time;
    },
    save: function() {
      this.getData()
        .then(res => {
          this.timeline = res.logs;
        })
        .catch(error => {
          console.log(error);
          that.$Message.error(error);
          reject();
        });
    }
  },
  created() {
    this.user = this.$store.state.token.userInfo.user;
    console.log(this.user);
    this.$store.commit("token/where", {
      title: this.user.fullname + "--" + this.user.account,
      color: "orange"
    });
    this.getData()
      .then(res => {
        this.timeline = res.logs;
      })
      .catch(error => {
        console.log(error);
        that.$Message.error(error);
        reject();
      });
    console.log(this.date);
  },
  async mounted() {},
  activated() {},
  deactivated() {}
});
</script>

<style scoped>
.my-card {
  margin-bottom: 20px;
}
</style>

