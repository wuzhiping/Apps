<template>
  <q-page v-scroll="scrolled" class="row items-center justify-evenly" style="background:#f0f0f0;">
       <q-btn-toggle style="width: 100%;"
        v-model="type"
        spread
        no-caps
        toggle-color="purple"
        color="white"
        text-color="black"
        :options="types"
      />
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="(item, index) in tasks" :key="index" class="caption">
        <q-item-section @click="openTask(item)">
          <H1 style="color:red;">{{item.subject}}</H1>
          <div v-for="(v,o) in item">{{o}}: {{v}}</div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-pagination v-model="pagination.current" :max="pagination.max"></q-pagination>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { todoTaskList } from "../../../../service/agilebpm/bpm/my";
import { getNodes } from "../../../../service/agilebpm/sys/sysTreeNode";

export default Vue.extend({
  name: "todoTaskList",
  components: {},
  data() {
    return {
      query: {
        limit: 3,
        sort: "",
        order: "",
        filter: ""
      },
      pagination: {
        max: 0,
        current: 1
      },
      tasks: [],
      type:null,
      types:[]
    };
  },
  watch: {
    "pagination.current": function (val) {
        this.getList()
    }
  },
  deactivated(){
      console.dir("deactivated..");
  },
  activated(){
      console.dir("activated..");
  },
  methods: {
    scrolled (position) {
       // console.dir(position);
    },
    openTask(task) {
      this.$router
        .push({ name: "taskComplete", params: { id: task.id } })
        .catch(err => {});
    },
    getList: function() {
      todoTaskList(
        (this.pagination.current - 1) * this.query.limit,
        this.query.limit,
        this.query.sort,
        this.query.order,
        this.query.filter
      )
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.$root.$emit("refresh_todo_list");
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
    },getTree: function() {
      getNodes("flow")
        .then(response => {
          console.dir(response);
          for(var i=0;i<response.data.length;i++){
            this.types.push({label: response.data[i].name, value:  response.data[i].id});
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
    this.getTree();
  }
});
</script>

<style lang="sass">

</style>

