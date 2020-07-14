<template>
  <q-page class="row items-center justify-evenly" style="background:#f0f0f0;">
    <q-pagination v-model="pagination.current" :max="pagination.max" style="display:block;width:100%;"></q-pagination>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="(item, index) in tasks" :key="index" class="caption">
        <q-item-section>
          <H1 style="color:red;">{{item.subject}}</H1>
          <div v-for="(v, o) in item">{{o}}: {{v}}</div>

        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { receiveList } from "../../../../service/agilebpm/bpm/carbonCopy";

export default Vue.extend({
  name: "carboncopyReceiveList",
  components: {},
  data() {
    return {
      query: {
        limit: 10,
        subject: "",
        order: "",
        filter: "",
        node_name:"",
        read:""
      },
      pagination: {
        max: 0,
        current: 1
      },
      tasks: []
    };
  },
  watch: {
    "pagination.current": function (val) {
        this.getList()
    }
  },
  methods: {
    openInstance(insitance) {
      this.$router
        .push({ name: "instanceDetail", params: { id: insitance.id } })
        .catch(err => {});
    },
    getList: function() {
      receiveList(
          this.query.order,
        (this.pagination.current - 1) * this.query.limit,
        this.query.limit,
        this.query.subject,
        this.query.node_name,
        this.query.read
      )
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.tasks = response.data.rows;
            this.pagination.max = response.data.page;
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
    }
  },
  mounted() {
    this.getList();
  }
});
</script>

<style lang="sass">

</style>

