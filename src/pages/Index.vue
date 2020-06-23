<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

import ExampleComponent from 'components/CompositionComponent.vue';
import { Todo, Meta } from 'components/models';

export default Vue.extend({
  name: 'PageIndex',
  components: { ExampleComponent },
  data() {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      }
    ];
    const meta: Meta = {
      totalCount: 1200
    };
    return { todos, meta };
  }
});
</script>
