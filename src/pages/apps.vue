<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="page">
    <div class="row justify-center">
      <div class="col-10" style="margin:12px 0 0;">
        <q-input dense v-model="search" outlined type="search" @input="searchItem">
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <!-- <div>
      <div class="row" style="margin-top:20px;">
        <div class="col-10 offset-1">常用:</div>
      </div>
      <div class="row">
        <div class="col-4" v-for="i in 6" :key="i" style="margin:20px 0;">
          <q-avatar style="margin:0 auto;display:block;" size="56px">
            <q-avatar
              style="margin:0 auto;display:block;"
              size="56px"
              color="red"
              text-color="white"
              icon="3d_rotation"
            ></q-avatar>
          </q-avatar>
          <p class="description">项目描述</p>
        </div>
      </div>
    </div>
    <hr /> -->
    <div>
      <!--div class="row" style="margin-top:10px;">
        <div class="col-10 offset-1">全部/结果:</div>
      </div-->
      <div class="row">
        <div class="col-4" v-for="(obj,index) in filterObj" :key="index" style="margin:20px 0;" @click="goto(obj)">
          <q-avatar
            style="margin:0 auto;display:block;"
            size="56px"
            :color="obj.color"
            :text-color="obj.textcolor"
            :icon="obj.icon"
          ></q-avatar>
          <p class="description">{{obj.name}}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="javascript">
import Vue from "vue";
import { Notify } from "quasar";
export default Vue.extend({
  name: "PageOther2",
  components: {},
  data() {
    return {
      search: "",
      mockObj: [
         {
          icon: "inbox",
          link: "/agilebpm/bpm/my/todoTaskList",
          color: "white",
          keywords: ["task"],
          textcolor: "blue",
          name: "Todos"
         },
         {
          icon: "today",
          link: "/",
          color: "white",
          keywords: ["calendar"],
          textcolor: "orange",
          name: "Calendar"
        },
        {
          icon: "favorite",
          link: "/form/2BDL5JCG73D",
          color: "gray",
          keywords: ["Health"],
          textcolor: "red",
          name: "Health"
        },
        {
          icon: "article",
          link: "/news/list",
          color: "white",
          keywords: ["News"],
          textcolor: "red",
          name: "News"
        },

        {
          icon: "spellcheck",
          link: "/Exam",
          color: "white",
          keywords: ["Examination"],
          textcolor: "red",
          name: "Examination"
        },
        {
          icon: "plagiarism",
          link: "/ecm/grc",
          color: "white",
          keywords: ["ECM"],
          textcolor: "pink",
          name: "ECM"
        },
        {
          icon: "support_agent",
          link: "/form/egate",
          color: "gray",
          keywords: ["help"],
          textcolor: "green",
          name: "egate"
        },
        {
          icon: "multiple_stop",
          link: "/mro/phx",
          color: "white",
          keywords: ["mro"],
          textcolor: "red",
          name: "MRO"
        },
        {
          icon: "fact_check",
          link: "/logs",
          color: "white",
          keywords: ["log"],
          textcolor: "yellow",
          name: "Records"
        },
        {
          icon: "qr_code",
          link: "/qrcode",
          color: "white",
          keywords: ["qr"],
          textcolor: "black",
          name: "QR Code"
        },
        {
          icon: "bookmark",
          link: "/etag",
          color: "white",
          keywords: ["tag"],
          textcolor: "red",
          name: "eTag"
        },
        // ,
        // {
        //   icon: "3d_rotation",
        //   color: "red",
        //   textcolor: "white",
        //   keywords: ["bcd", "hello", "use"],
        //   name: "项目描述1"
        // },
        // {
        //   icon: "commute",
        //   color: "pink",
        //   textcolor: "white",
        //   keywords: ["abc", "hello", "name"],
        //   name: "项目描述2"
        // },
        // {
        //   icon: "bug_report",
        //   color: "yellow",
        //   textcolor: "white",
        //   keywords: ["bcd", "yes", "use"],
        //   name: "项目描述3"
        // },
        // {
        //   icon: "backup",
        //   color: "grey",
        //   textcolor: "white",
        //   keywords: ["bcd", "yes", "name"],
        //   name: "项目描述4"
        // },
        // {
        //   icon: "android",
        //   color: "pink",
        //   textcolor: "white",
        //   keywords: ["abc", "hello", "name"],
        //   name: "项目描述5"
        // },
        // {
        //   icon: "add_shopping_cart",
        //   color: "green",
        //   textcolor: "white",
        //   keywords: ["abc", "hello", "name"],
        //   name: "项目描述6"
        // },
        // {
        //   icon: "delete_outline",
        //   color: "blue",
        //   textcolor: "white",
        //   keywords: ["abc", "yes", "name"],
        //   name: "项目描述7"
        // },
        // {
        //   icon: "account_balance",
        //   color: "blue",
        //   textcolor: "white",
        //   keywords: ["edf", "hello", "name"],
        //   name: "项目描述8"
        // },
        // {
        //   icon: "hourglass_full",
        //   color: "orange",
        //   textcolor: "white",
        //   keywords: ["abc", "hello", "age"],
        //   name: "项目描述9"
        // },
        // {
        //   icon: "face",
        //   color: "purple",
        //   textcolor: "white",
        //   keywords: ["edf", "yes", "name"],
        //   name: "项目描述a"
        // },
        // {
        //   icon: "favorite",
        //   color: "pink",
        //   textcolor: "white",
        //   keywords: ["abc", "hello", "age"],
        //   name: "项目描述b"
        // },
        // {
        //   icon: "highlight_off",
        //   color: "green",
        //   textcolor: "white",
        //   keywords: ["edf", "hello", "age"],
        //   name: "项目描述c"
        // },
        // {
        //   icon: "invert_colors",
        //   color: "red",
        //   textcolor: "white",
        //   keywords: ["abc", "hello", "name"],
        //   name: "项目描述d"
        // }
      ]
    };
  },
  computed: {
    filterObj: function() {
      var that = this;
      if (this.search) {
        var arr = this.mockObj.filter(function(val) {
          var str = val.keywords.join();
          return str.indexOf(that.search) >= 0;
        });
        return arr;
      } else {
        return this.mockObj;
      }
    }
  },
  methods: {
    searchItem() {},
    goto(app){
        this.$router.push(app.link).catch(err => {});
    }
  },
  created() {
    //console.log("othercreated");
  },
  mounted() {
    //console.log("othermounted");
  },

  activated() {
    //console.log("otheractivated");
  }
});
</script>

<style scoped>
.my-card {
  margin-bottom: 20px;
}
.description {
    text-align: center;
  width: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
}
</style>

