<template>
  <div id="about">
    <v-content>
      <v-container fluid pa-0>
        about
        <div v-for="(feature, i) in features" :key="i">
          <h2>{{feature.header}}</h2>
          <p>{{feature.content}}</p>
        </div>
      </v-container>
    </v-content>

    <home-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class About extends Vue {
  get features() {
    // const { category, id } = this.$route.params;


    return this.$t('Vuetify.AboutUs');
  }
}
</script>

<style lang="scss" scoped>
#home {
  background: #f2f2f2;
}
</style>
