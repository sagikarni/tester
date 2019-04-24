<template>
  <div id="content-page">
    <v-content>
      <v-container fluid :class="pageTitle">
        <h1>{{pageTitle}}</h1>
        <div v-for="(feature, i) in features" :key="i">
          <h2>{{feature.header}}</h2>
          <div v-html="feature.content"></div>
        </div>
      </v-container>
    </v-content>

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {
      HomeFooter: () => import('./home/Footer.vue'),
  },
})
export default class About extends Vue {

  maps = { about: 'AboutUs', 
  faq: 'Faq', 
  team: 'Team',
  tips: 'Tips',
  contactus: 'ContactUs',
  privacy: 'Privacy'
  };
  name = '';

  mounted() {
    this.name = this.maps[this.$route.name];
  }

get pageTitle() {
    return this.$t(`Vuetify.${this.name}.pageTitle`);
  }

  get features() {
    return this.$t(`Vuetify.${this.name}.features`);
  }
}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
