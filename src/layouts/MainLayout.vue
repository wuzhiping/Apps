<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated :style="{ background:$store.state.token.color }">
      <q-toolbar>
        <q-btn
          v-if="!$store.state.token.back"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-btn v-if="$store.state.token.back" flat round dense icon="more" @click="$router.go(-1)" />
        <q-toolbar-title>{{$store.state.token.title}}</q-toolbar-title>
        <div>{{ $q.lang.nativeName }}</div>
        <span></span>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      :width="220"
      :breakpoint="700"
      behavior="desktop"
      bordered
      content-class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-item clickable v-ripple @click="leftDrawerOpen = false;$router.push('/login')">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">R</q-avatar>
          </q-item-section>

          <q-item-section>{{ user.fullname}} {{ user.account}}</q-item-section>
        </q-item>

        <q-separator />
        <template v-for="(menuItem, index) in essentialLinks">
          <q-item-label header :key="index">{{menuItem.title}}</q-item-label>
          <q-list v-for="(menuItem, sindex) in menuItem.essentialLinks" :key="sindex+'|'+index">
            <q-item
              clickable
              @click="leftDrawerOpen = false;$router.push(menuItem.link) "
              active-class="my-menu-link"
              :active="menuItem.link === $route.path"
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                <div class="text">
                  {{ menuItem.title }}
                  <q-badge color="red" align="top"
                            v-if="menuItem.count > 0">{{menuItem.count}}
                  </q-badge>
                </div>
              </q-item-section>
            </q-item>

            <q-separator v-if="menuItem.separator" />
          </q-list>
        </template>
      </q-scroll-area>
      <!--q-list>
        <q-item-label
          header elevated
          class="text-grey-8"
          style="background:#f0f0f0;"
        >
           <strong style="color:blue;"> AgileFlow </strong>v1.0.0
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list-->
    </q-drawer>

    <q-page-container>
      <!-- <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
      <keep-alive>
        <!-- <transition
          v-if="$route.meta.keepAlive"
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >-->
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <!-- </transition> -->
      </keep-alive>
      <!-- </transition> -->
      <!-- <transition
        v-if="!$route.meta.keepAlive"
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import languages from "quasar/lang/index.json";
import axios from "axios";
import { axiosInstance } from "boot/axios";

axios.defaults.baseURL = axiosInstance.defaults.baseURL;

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },
  watch: {
    "$store.state.token.userInfo": function() {
      this.user = this.$store.state.token.userInfo
        ? this.$store.state.token.userInfo.user
        : {};
    }
  },
  data() {
    return {
      user: {},
      leftDrawerOpen: false,
      todoCount: 0,
      essentialLinks: [
        {
          title: "Office",
          essentialLinks: [
            {
              title: "行事日历",
              caption: "Calendar",
              icon: "today",
              link: "/"
            },
            {
              title: "我的抄送",
              caption: "TotoTask",
              icon: "file_copy",
              link: "/agilebpm/bpm/my/carboncopyReceiveList"
            },
            {
              title: "待办事项",
              caption: "TotoTask",
              icon: "inbox",
              link: "/agilebpm/bpm/my/todoTaskList",
              count: 0
            },
            {
              title: "办理历史",
              caption: "approveList",
              icon: "outbox",
              link: "/agilebpm/bpm/my/approveList"
            },
            {
              title: "发起申请",
              caption: "Definition",
              icon: "send",
              link: "/agilebpm/bpm/definition/definitionList"
            },
            {
              title: "申请历史",
              caption: "applyTaskList",
              icon: "history",
              link: "/agilebpm/bpm/my/applyTaskList"
            }
          ]
        },
        {
          title: "Other",
          essentialLinks: [
            {
              title: "Apps",
              icon: "apps",
              link: "/apps"
            },
            {
              title: "eGate",
              caption: "eGate",
              icon: "support_agent",
              separator: true,
              link: "/form/egate"
            },
            {
              title: "QRcode",
              caption: "qrcode",
              icon: "qr_code",
              link: "/qrcode"
            },
            {
              title: "Settings",
              icon: "settings",
              link: "/settings"
            },
            /*
            {
              title: "Health",
              icon: "favorite",
              link: "/health"
            },
            {
              title: "News",
              caption: "News",
              icon: "image",
              link: "/news/list"
            },

            {
              title: "Examination",
              icon: "spellcheck",
              link: "/Exam"
            },
            {
              title: "ECM",
              icon: "plagiarism",
              link: "/ECM/grc"
            }
            */
          ]
        }
      ]
    };
  },
  methods: {
    lang(lang) {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(vi|en-us|zh-hant)\.js$/ */
        `quasar/lang/${lang}`
      ).then(lang => {
        this.$q.lang.set(lang.default);
        this.$i18n.locale = this.$q.lang.isoName;
        console.dir(this.$q.lang.isoName);
      });
    },
    todoTaskList() {
      let formData = new FormData();
      formData.append("offset", 0);
      formData.append("limit", 1);
      formData.append("sort", "");
      formData.append("order", "");
      formData.append("filter$VEQ", "");
      axios
        .post("/bpm/my/todoTaskList", formData)
        .then(response => {
          for (
            var i = 0;
            i < this.essentialLinks[0].essentialLinks.length;
            i++
          ) {
            if (
              this.essentialLinks[0].essentialLinks[i].link ==
              "/agilebpm/bpm/my/todoTaskList"
            ) {
              this.essentialLinks[0].essentialLinks[i].count =
                response.data.total;
            }
          }
          //this.todoCount = response.data.total;
          //state.dispatch('userInfoBpm', data)
        })
        .catch(error => {});
    }
  },
  created() {
    //console.dir( languages );
    //console.dir( this.$q.lang.getLocale() );
    this.lang("zh-hant");
    this.$root.$on("refresh_todo_list", () => {
      this.todoTaskList();
    });
  },
  mounted() {
    this.$root.$emit("refresh_todo_list");
  }
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
