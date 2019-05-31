<template>
  <div id="overview">
    <v-content>
      <v-container fluid class="pa-0">
        <div style="background:gray;">
          <h2 class="text-xs-center headline mb-5 white--text">
            <span>{{ name }}</span>
          </h2>
        </div>
      </v-container>
      <v-container grid-list-xl="grid-list-xl">
        <v-layout wrap>
          <v-flex v-for="(feature, i) in items" :key="i" xs6 md6 lg3 d-flex>
            <v-card class="pa-0" fill-height :to="{ name: 'category', params: { category: feature.name.toLocaleLowerCase() } }">
              <v-img
                width="100%"
                height="100%"
                :alt="feature"
                :aspect-ratio="1.3"
                :src="`https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100) + 1}`"
              >
                <v-layout
                  fill-height
                  class="ma-0 pa-2 lightbox white--text"
                  style="background-color:rgba(0,0,0,.55) !important;mask-image:linear-gradient(0deg,#000,#000 15%,transparent)"
                >
                  <v-flex d-flex xs12 align-end flexbox style="padding:0 0 15px 15px;">
                    <div>
                      <div class="display-1" style="font-weight:600!important">{{feature.name}}</div>
                      <div class="title">{{feature.title}}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <strip-group value="homepage" />
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';
import { ActivitiesModule } from 'tera-core/src/store/activities.module';
import { CategoriesModule } from 'tera-core/src/store/categories.module';
import { DomainsModule } from 'tera-core/src/store/domains.module';
import { AppModule } from 'tera-core/src/store/app';
import { StripsModule } from 'tera-core/src/store/strips.module';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    StripGroup: () => import('../../../../tera-core/src/home/StripGroup.vue'),
  },
})
export default class Overview extends Vue {
  items = [];
  name = '';

  constructor() {
    super();
  }

  mounted() {
    const { overview } = this.$route.params;
    this.name = overview;

    this.load();
  }

  async load() {

    // const res = await this.axios.get(`/activity/types/${this.name}`);

    // this.items = DomainModule.types.map((t) => ({
    //   name: dasherize(t.name).toLocaleLowerCase(),
    //   title: t.name,
    // }));
  }


 public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.load(),
      CategoriesModule.load(),
      DomainsModule.load(),
      StripsModule.load()
    ]);

    next();
  }
}
</script>
