<template>
  <div style="background:#f0f0f0;">
    <img :src="flowImage" />
    <div class="scoped">
    <form-create ref="f" v-model="xxx" :rule="rule" :option="option" style="margin:0 auto;"></form-create>
    </div>
    <h1 style="color:red;">Footer</h1>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
        <q-fab-action
          color="primary"
          :label="bl.name"
          @click="doA(bl)"
          v-for="(bl, index) in datas.buttonList"
          :key="index"
        />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script lang="javascript">
import Vue from "vue";

import {
  flowImage,
  getInstanceData,
  doAction
} from "../../../../service/agilebpm/bpm/instance";

import { axiosInstance } from "boot/axios";

export default Vue.extend({
  name: "todoTaskList",
  props: ["defId"],
  components: {},
  data() {
    return {
      datas: {},
      flowImage: null,
      loading: true,

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
    };
  },
  methods: {
    API(url,payload) {
      return this.$axios.post('https://a.feg.com.tw/BDD/API/'+url, payload);
    },
    getInstance() {
      getInstanceData(null, null, this.defId, null, null)
        .then(response => {
          if (response.data.isOk) {
            this.datas = response.data.data;
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
    getFlowImage() {
      flowImage(null, this.defId, null)
        .then(response => {
          this.flowImage = response;
          // this.$router.go(-1);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    doA(action) {

      var form = this.$refs["f"].$f;
      console.dir(form);
      form.disabled(false);
      // form.resetFields();
      form.validate((valid)=>{
          if(valid)
             console.dir(form.formData());
          else 
             return;
      });
      
      doAction({
        defId: this.defId,
        instanceId: "",
        data: {
          bizId: "biz",
          variables: {},
          log: {},
          opinion: "",
          opinions: [],
          nodeId: "Start",
          defId: this.defId,
          taskId: "",
          instId: ""
        },
        action: action.alias,
        name: action.name
      })
        .then(response => {
          if (response.data.code == 200) {
            this.$q.notify({
              progress: true,
              message: action.alias + " ok " + response.data.msg,
              color: "primary",
              timeout: 2000
            });
            setTimeout(() => {
              this.$router.push({ name: "definitionList" }).catch(err => {});
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
      var form = await this.API('bpm/comm/form/dev',{
                                                        uid : (this.$store.state.token || { userInfo: { user: {} }}).userInfo.user.account || 'vip05',
                                                        pwd : '',
                                                     formId : this.$route.params.formId || 'egate',
                                                     action : 'start' 
                              }).catch(error => {
        this.$Message.error("Sorry!,Try Again<br>" + error);
      });

      this.$q.loading.hide();

      if (form) {
        this.loading = false;
        this.rule = formCreate.parseJson(JSON.stringify(form.data));
        for (var n = 0; n < this.rule.length; n++) {
          if (this.rule[n].field == "title") {
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
    }
  },
  mounted() {
    this.getInstance();
    this.getFlowImage();
    this.loadForm();
  }
});
</script>


<style lang="stylus" scoped>
.scoped >>> h4
  font-size 100%

.scoped >>> .ivu-form, .scoped >>> .ivu-row
  max-width 800px
.scoped >>> .ivu-form
  .ivu-form-item-label
    font-weight bold
    opacity 0.9
    font-size 14px
    vertical-align middle
    display inline-block
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

.scoped >>> .ivu-form-item-error-tip
  padding-top 0
  font-size 8px
.scoped >>> .ivu-input-wrapper-large
  .ivu-input-icon
    line-height 32px
  .ivu-input-prefix
    i
      line-height 32px
  .ivu-input-suffix
    i
      line-height 32px
.scoped >>> .ivu-form-item
  margin-bottom 14px

.scoped >>> .search-loading
    margin-top 30%
    display flex
    justify-content center

</style>

