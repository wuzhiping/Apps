<template>
  <q-page class="row items-center justify-evenly" style="min-height:auto;height:100%;">
    <daykeep-calendar-month style="width:100%;height:calc(100% - 0px);"
       :sunday-first-day-of-week="true"
       calendar-locale="en-us"
       :event-array="eventArray"      
       :start-date="new Date()"  
    
       event-ref="agenda"
   
       :allow-editing="false"
       :prevent-event-detail="false"
    />
  </q-page>
</template>

<script lang="javascript">
import Vue from 'vue';
import { Notify } from 'quasar'
import { DaykeepCalendarMonth } from '@daykeep/calendar-quasar'

export default Vue.extend({
  name: 'PageIndex',
  components: { DaykeepCalendarMonth  },
  data() {
    return {
      eventArray: [
        {
          id: 5,
          summary: "summary: All day event",
          description: "description:Some extra info goes here",
          color: "green",
          textColor: "dark",
          start: {
            date: "2020-07-13"
          },
          end: {
            date: "2020-07-14"
          }
        },
        {
          id: 3,
          summary: "Title:Test event 2",
          description: "Memos:Some extra info goes here",
          start: {
            dateTime: "2020-07-16T17:30:00"
          },
          end: {
            dateTime: "2020-07-16T18:30:00"
          }
        }]
     };
  },
  mounted(){
    this.$root.$once("click-day-agenda", function(day) { 
        Notify.create( { caption:"click-day-agenda", message: day.day.year+'-'+day.day.month+'-'+day.day.day  , html:true})
       // this.$router.push({path:'/abc',params:{eventdata:day.day.year+'-'+day.day.month+'-'+day.day.day}});
    });

    // this.$axios.post("/bpm/my/todoTaskList").then(response => {; })

  }
});
</script>

<style lang="sass">
.calendar-tab-panels .q-tab-panel
   padding: 1px
.calendar-tabs
   zoom: 100%
</style>

