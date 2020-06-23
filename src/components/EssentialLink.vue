<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import languages from 'quasar/lang/index.json'

export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
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
