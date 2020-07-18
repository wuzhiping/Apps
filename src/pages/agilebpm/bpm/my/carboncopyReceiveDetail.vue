<template>
  <div style="background:#f0f0f0;">
    <q-card class="my-card">
      <q-card-section>
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar rounded size="48px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-badge floating color="teal">new</q-badge>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Mary</q-item-label>
            <q-item-label caption>2 new messages</q-item-label>
          </q-item-section>
          <q-item-section side>3 min ago</q-item-section>
        </q-item>
        <q-separator spaced />
      </q-card-section>
    </q-card>
    <div v-for="(v,n) in carboncopyReceive">{{n}}: {{v}}</div>
    <pre>{{JSON.stringify(dispatche,null,1)}}</pre>
    <form-create
      ref="f"
      v-model="form.xxx"
      :rule="form.rule"
      :option="form.option"
      style="margin:0 auto;"
    ></form-create>
    <q-card class="my-card" style="margin-top: 10px;">
      <q-card-section>
        <q-timeline color="secondary">
          <q-timeline-entry
            v-for="(op, index) in opinion"
            :key="index"
            :title="op.taskName"
            :subtitle="op.createTime"
            icon="delete"
          >
            <div v-for="(v,n) in op">{{n}}: {{v}}</div>
          </q-timeline-entry>
        </q-timeline>

        <!-- <q-timeline color="secondary">
          <q-timeline-entry
            v-for="(op, index) in opinion"
            :key="index"
            :title="op.taskName"
            :subtitle="op.createTime"
          >
            <div>*************</div>
          </q-timeline-entry>
        </q-timeline>-->
      </q-card-section>
    </q-card>
    <img :src="flowImage" />
  </div>
</template>

<script lang="javascript">
import Vue from "vue";
import {
  getOpinion,
  flowImage,
  getInstanceData
} from "../../../../service/agilebpm/bpm/instance";
import { dev } from "../../../../service/BDD/API/bpm/comm/form";
import { dispatcher } from "../../../../service/BDD/API/bpm/comm/dispatcher";
import { receiveList } from "../../../../service/agilebpm/bpm/carbonCopy";
import { axiosInstance } from "boot/axios";
import formCreate from "@form-create/iview";

export default Vue.extend({
  name: "carboncopyReceiveDetail",
  props: ["id"],
  components: {},
  data() {
    return {
      carboncopyReceive: {},
      opinion: [],
      dispatche:{},
      flowImage: null,
      form: {
        xxx: {},
        rule: [],
        option: {
          form: {
            labelPosition: "top",
            labelWidth: undefined,
            size: "large",
            showMessage: true
          },
          row: {
            gutter: 10
          }
        }
      }
    };
  },
  methods: {
    getInfo() {
        console.log(this.id);
      receiveList(null, 0, 1, null, { "a.id_$VEQ": this.id })
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.carboncopyReceive = response.data.rows[0];
            this.dep();
            this.getFlowImage();
          } else {
            this.$q.notify({
              caption: response.data.code,
              message: response.data.msg,
              html: true
            });
          }
          // this.$router.go(-1);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    dep: function() {
      dispatcher("CarbonCopy", this.carboncopyReceive)
        .then(response => {
          this.dispatche = response.data;
          console.dir(response);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    getInstance() {
      getInstanceData(this.id)
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            // this.instance = response.data.data;
            this.getOp();
          } else {
            this.$q.notify({
              caption: response.data.code,
              message: response.data.msg,
              html: true
            });
          }
          // this.$router.go(-1);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    loadForm: async function() {
      var that = this;
      dev("bpm/comm/form/dev", {
        uid:
          (this.$store.state.token || { userInfo: { user: {} } }).userInfo.user
            .account || "vip05",
        pwd: "",
        formId: this.$route.params.formId || "egate",
        action: "apply"
      })
        .then(response => {
          var form = response;
          this.$q.loading.hide();

          if (form) {
            this.loading = false;
            this.form.rule = formCreate.parseJson(JSON.stringify(form.data));
            for (var n = 0; n < this.form.rule.length; n++) {
              if (this.form.rule[n].field == "title") {
                break;
              }
            }
          } else {
            this.$router.go(-1);
            return;
          }
          this.$q.notify({
            message:
              '<em>I can</em> <span style="color: red">use</span> <strong>HTML</strong>',
            html: true
          });
        })
        .catch(error => {
          this.$Message.error("Sorry!,Try Again<br>" + error);
        });
    },
    getOp() {
      getOpinion(this.id)
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.opinion = response.data.data.reverse();
          } else {
            this.$q.notify({
              caption: response.data.code,
              message: response.data.msg,
              html: true
            });
          }
          // this.$router.go(-1);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    getFlowImage() {
      flowImage(this.carboncopyReceive.instId)
        .then(response => {
          this.flowImage = response;
          // this.$router.go(-1);
        })
        .catch(error => {
          console.dir(error);
        });
    }
  },
  mounted() {
    // this.getInstance();
    // this.getFlowImage();
    this.getInfo();
  }
});
</script>

<style lang="sass">

</style>

