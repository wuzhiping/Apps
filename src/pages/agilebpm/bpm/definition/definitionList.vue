<template>
  <q-page class="row items-center justify-evenly" style="background:#f0f0f0;">
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="(item, index) in definitionList"
        :key="index"
        class="caption"
      >
        <q-item-section @click="openDefinition(item)">
          <p>{{item.name}}</p>
        </q-item-section>
      </q-item>
    </q-list>
    <q-pagination v-model="pagination.current" :max="pagination.max"></q-pagination>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { definitionList } from "../../../../service/agilebpm/bpm/my";

export default Vue.extend({
  name: "definitionList",
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
      definitions: []
    };
  },
  watch: {
    "pagination.current": function(val) {
      this.getList();
    }
  },
  computed: {
    definitionList: function() {
      if (this.definitions)
        return this.definitions.filter(function(value) {
          return value.supportMobile == 1;
        });
      else return [];
    }
  },
  methods: {
    openDefinition(def) {
      this.$router
        .push({ name: "start", params: { defId: def.id } })
        .catch(err => {});
    },
    getList: function() {
      definitionList(
        (this.pagination.current - 1) * this.query.limit,
        this.query.limit,
        this.query.sort,
        this.query.order,
        this.query.filter
      )
        .then(response => {
          // console.dir(response);
          if (response.data.isOk) {
            this.definitions = response.data.rows;
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

