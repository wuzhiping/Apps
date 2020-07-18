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
        <div class="row" v-for="(value, name) in task" :key="name">
          <div class="col-6">{{name}}</div>
          <div class="col-6">{{value}}</div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card" style="margin-top: 10px;">
      <q-card-section>
        <div class="row" v-for="(value, name) in vars" :key="name">
          <div class="col-6">{{name}}</div>
          <div class="col-6">{{value}}</div>
        </div>
      </q-card-section>
    </q-card>
<pre>{{JSON.stringify(dispatche,null,1)}}</pre>
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
    <div class="scoped">
      <form-create
        ref="f"
        v-model="form.xxx"
        :rule="form.rule"
        :option="form.option"
        style="margin:0 auto;"
      ></form-create>
    </div>
    <img :src="flowImage" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
        <q-fab-action
          color="primary"
          :label="bl.name"
          @click="doA(bl)"
          v-for="(bl, index) in buttonList"
          :key="index"
        />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script lang="javascript">
import Vue from "vue";
import {
  getBpmTask,
  getVariables,
  getTaskData,
  doAction
} from "../../../../service/agilebpm/bpm/task";
import {
  getOpinion,
  flowImage,
  getFlowImageInfo
} from "../../../../service/agilebpm/bpm/instance";
import { dev } from "../../../../service/BDD/API/bpm/comm/form";
import { axiosInstance } from "boot/axios";
import formCreate from "@form-create/iview";
import { dispatcher } from "../../../../service/BDD/API/bpm/comm/dispatcher";

export default Vue.extend({
  name: "todoTaskList",
  props: ["id"],
  components: {},
  data() {
    return {
      task: {},
      opinion: [],
      vars: {},
      datas: {},
      dispatche:{},
      flowImage: null,
      flowImageInfo: null,
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
          },
          onSubmit: function(formData) {
            vm.onSubmit(formData);
          },
          submitBtn: {
            show: false,
            type: "info",
            long: true,
            innerText: "save",
            loading: false,
            col: { span: 8 }
          },
          resetBtn: false
        }
      }
    };
  },
  computed: {
    buttonList: function() {
      if (this.datas && this.datas.buttonList)
        return this.datas.buttonList.filter(function(value) {
          var act = [
            "agree",
            "reject",
            "reject2Start",
            "oppose",
            "manualEnd",
            "turn"
          ];
          return act.indexOf(value.alias) > -1;
        });
      else return [];
    }
  },
  methods: {
    dep: function() {
      dispatcher("Task", this.task)
        .then(response => {
          this.dispatche = response.data;
          console.dir(response);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    getTask() {
      getBpmTask(this.id)
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.task = response.data.data;
            this.dep();
            this.getOp();
            //this.getVar();
            this.getData();
            this.getFlowImage();
            // this.getFII();
            this.gettask(this.task.defId, this.task.instId, this.task.taskId);
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
    getOp() {
      getOpinion(this.task.instId, this.task.taskId)
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
    getVar() {
      getVariables(this.task.taskId, false)
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.vars = response.data.data;
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
    getData() {
      getTaskData(this.task.taskId, "pc")
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.datas = response.data.data;
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
      flowImage(this.task.instId, this.task.defId, this.task.taskId)
        .then(response => {
          this.flowImage = response;
          // this.$router.go(-1);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    getFII() {
      getFlowImageInfo(this.task.instId, this.task.defId, this.task.taskId)
        .then(response => {
          if (response.data.isOk) {
            this.flowImageInfo = response.data.data;
          } else {
            this.$q.notify({
              caption: response.data.code,
              message: response.data.msg,
              html: true
            });
          }
        })
        .catch(error => {
          console.dir(error);
        });
    },
    gettask(defId, instId, taskId) {
      axiosInstance
        .post("/BDD/API/bpm/comm/form/task", {
          defId: "", //defId,
          id: instId,
          taskId: "" //taskId
        })
        .then(response => {
          //console.dir(response)
          //state.dispatch('userInfoBpm', data)
          console.dir(response);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    doA(action) {
      var form = this.$refs["f"].$f;
      doAction({
        taskId: this.task.taskId,
        nodeId: this.task.nodeId,
        instanceId: this.task.instId,
        data: {
          form: form.formData() || {},
          bizId: "bizId" //this.vars["__BizKey__"],
          //variables: this.vars
        },
        action: action.alias,
        extendConf: {
          nodeId: ""
        },
        opinion: action.name
      })
        .then(response => {
          if (response.data.code == 200) {
            this.$root.$emit("refresh_todo_list");
            this.$q.notify({
              progress: true,
              message: action.alias + " ok " + response.data.msg,
              color: "primary",
              timeout: 2000
            });
            setTimeout(() => {
              this.$router.push({ name: "todoTaskList" }).catch(err => {});
            }, 3000);
          } else {
            this.$q.notify({
              progress: true,
              message: action.alias + " error " + response.data.msg,
              color: "primary",
              timeout: 2000
            });
          }
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
        action: "task"
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
    }
  },
  mounted() {
    this.getTask();
    this.loadForm();
  }
});
</script>

<style lang="stylus" scoped>
.scoped >>> h4 {
  font-size: 100%;
}

.scoped >>> .ivu-form, .scoped >>> .ivu-row {
  max-width: 800px;
}

.scoped >>> .ivu-form {
  .ivu-form-item-label {
    font-weight: bold;
    opacity: 0.9;
    font-size: 14px;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.scoped >>> .ivu-form-item-error-tip {
  padding-top: 0;
  font-size: 8px;
}

.scoped >>> .ivu-input-wrapper-large {
  .ivu-input-icon {
    line-height: 32px;
  }

  .ivu-input-prefix {
    i {
      line-height: 32px;
    }
  }

  .ivu-input-suffix {
    i {
      line-height: 32px;
    }
  }
}

.scoped >>> .ivu-form-item {
  margin-bottom: 14px;
}

.scoped >>> .search-loading {
  margin-top: 30%;
  display: flex;
  justify-content: center;
}
</style>

