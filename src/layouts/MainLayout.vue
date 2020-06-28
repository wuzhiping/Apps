<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated style="background:linear-gradient(90deg,#595f69,#2173dc,#696969);">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Risk Management
        </q-toolbar-title>

        <div>{{ $q.lang.nativeName }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      :width="290"
      :breakpoint="700"
      behavior="desktop" 
      bordered
      content-class="bg-grey-1"
    >
      <q-scroll-area class="fit">

        <q-item clickable v-ripple @click="leftDrawerOpen = false;$router.push('/login')">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
             R
            </q-avatar>
          </q-item-section>

          <q-item-section>Letter avatar-type</q-item-section>
        </q-item>

        <q-separator />

          <q-item-label header>Todos </q-item-label>
          <q-list v-for="(menuItem, index) in essentialLinks" :key="index">
            <q-item clickable @click="leftDrawerOpen = false;$router.push(menuItem.link) "  
                    active-class="my-menu-link"
                    :active="menuItem.link === $route.path" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.title }}
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />
          </q-list>
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
      <transition  appear  enter-active-class="animated fadeIn"  leave-active-class="animated fadeOut">
         <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import languages from 'quasar/lang/index.json'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Calendar',
          caption: 'Calendar',
          icon: 'today',
          link: '/'
        },
        {
          title: 'Inbox',
          caption: 'Inbox',
          icon: 'inbox',
          link: '/inbox'
        },
        {
          title: 'Outbox',
          caption: 'Outbox',
          icon: 'outbox',
          separator: true,
          link: '/history'
        },
        {
          title: 'eGate',
          caption: 'eGate',
          icon: 'help',
          separator: true,
          link: '/form/egate'
        },

      ]
    }
  },
  methods:{
    lang (lang) {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(vi|en-us|zh-hant)\.js$/ */
        `quasar/lang/${lang}`
        ).then(lang => {
        this.$q.lang.set(lang.default)
      })
    }
  },
  created(){
     //console.dir( languages );
     //console.dir( this.$q.lang.getLocale() );
     this.lang( "zh-hant" );
  }

}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
