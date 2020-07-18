<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6" v-if="ups[0]">{{ups[0].subject}}</div>
        <div class="text-subtitle2" v-if="ups[0]">user:{{ups[0].uid}}</div>
        <div class="text-subtitle2" v-if="ups[0]">tags:{{ups[0].tags}}</div>
        <div class="text-subtitle2" v-if="ups[0]">start:{{ups[0].stamp | getTime}}</div>
      </q-card-section>
      <q-card-section class="text-h6 q-pt-none" @click="alert=true">show detail</q-card-section>
    </q-card>

    <q-dialog v-model="alert" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Detail</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <img
            style="height:100%;display:block;margin:0 auto;"
            :src="'https://a.feg.com.tw/qrcode/'+id"
          />
        </q-card-section>
        <q-card-section>
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="(item,index) in ups"
              :key="index"
              :title="item.key"
              :subtitle="item.notice"
            >
              <p v-if="item.userName">{{item.userName}}</p>
              <p v-if="item.phone">{{item.phone}}</p>
              <p v-if="item.stamp">{{item.stamp | getTime}}</p>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";
import { Loading, QSpinnerHourglass } from "quasar";
export default Vue.extend({
  name: "pageETag",
  components: {},
  data() {
    return {
      ups: [],
      id: "Bk1KBBB1D",
      alert: false
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
    getData: async function() {
      var that = this;
      var p = new Promise(function(resolve, reject) {
        that.$axios
          .get("https://a.feg.com.tw/oauth2/ups?_id=" + that.id)
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
    }
  },
  async created() {
    this.$q.loading.show({spinner: QSpinnerHourglass});
    this.getData().then(res => {
      this.ups = res;
      this.$q.loading.hide();
      console.log(this.ups);
    });
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

