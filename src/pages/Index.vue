<template>
  <q-page class="row items-center justify-evenly" style="min-height:auto;height:100%;">
    <daykeep-calendar-month style="width:100%;height:calc(100% - 0px);"
       :sunday-first-day-of-week="true"
       calendar-locale="en-us"
    />
  </q-page>
</template>

<script lang="javascript">
import Vue from 'vue';

import { DaykeepCalendarMonth } from '@daykeep/calendar-quasar'

export default Vue.extend({
  name: 'PageIndex',
  components: { DaykeepCalendarMonth  },
  data() {
    return { };
  }
});
</script>

<style lang="sass">
.calendar-tab-panels .q-tab-panel
   padding: 1px
.calendar-tabs
   zoom: 100%
</style>

