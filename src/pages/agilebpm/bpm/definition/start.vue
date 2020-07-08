<template>
  <div style="background:#f0f0f0;">
    <img :src="flowImage" />
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
      flowImage: null
    };
  },
  methods: {
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
              message: action.alias + " ok",
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
    }
  },
  mounted() {
    this.getInstance();
    this.getFlowImage();
  }
});
</script>

<style lang="sass">

</style>

