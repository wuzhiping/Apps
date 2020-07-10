<template>
  <q-page class="row items-center justify-evenly" style="background:#f0f0f0;">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="(item, index) in tasks" :key="index" class="caption">
        <q-item-section @click="openTask(item)">
          <p>{{item.subject}}</p>
        </q-item-section>
      </q-item>
    </q-list>
    <q-pagination v-model="pagination.current" :max="pagination.max"></q-pagination>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { applyTaskList } from "../../../../service/agilebpm/bpm/my";

export default Vue.extend({
  name: "applyTaskList",
  components: {},
  data() {
    return {
      query: {
        limit: 10,
        sort: "",
        order: "",
        filter: ""
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
    openTask(task) {
      this.$router
        .push({ name: "taskComplete", params: { id: task.id } })
        .catch(err => {});
    },
    getList: function() {
      applyTaskList(
        (this.pagination.current - 1) * this.query.limit,
        this.query.limit,
        this.query.sort,
        this.query.order,
        this.query.filter
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

