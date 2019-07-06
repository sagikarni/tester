<template>
  <core-layout id="domain" extension="true">
    <core-nav slot="extension" :title="name"></core-nav>

    <v-content class="mb-4">
      <div class="img-grid">
        <div v-for="(feature, i) in items" :key="i" style="display:flex;">
          <v-card
            class="pa-0 card"
            fill-height
            :to="{ name: 'category', params: { category: feature.name.toLocaleLowerCase() } }"
          >
            <v-img
              width="100%"
              height="100%"
              :aspect-ratio="1.6"
              :src="`/storage/${feature.domain}/${feature.title.toLocaleLowerCase()}/cover.jpg`"
            >
              <v-layout
                fill-height
                class="ma-0 pa-2 lightbox white--text"
                style="background-color:rgba(0,0,0,.55) !important;mask-image:linear-gradient(0deg,#000,#000 15%,transparent)"
              >
                <v-flex d-flex xs12 align-end flexbox style="padding:0 0 15px 15px;">
                  <div>
                    <div class="display-1 mb-3" style="font-weight:500!important">{{feature.name}}</div>
                    <div class="title">{{feature.title}}_description</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>
        </div>
      </div>

      <v-container
        class="mb-4 tt"
        fluid
        style="max-width:1500px;"
      >
        <strip-group value="homepage" />
      </v-container>
    </v-content>
  </core-layout>
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
export default class Domain extends Vue {
  items = [];
  name = '';

  constructor() {
    super();
  }

  mounted() {
    const { domain } = this.$route.params;
    this.name = domain;

    this.load();
  }

  async load() {
    const types = DomainsModule.types
      .query()
      .with(['domain'])
      .all();

    console.log({ d: types });
    this.items = types
      .filter((t: any) => t.domain.name.toLocaleLowerCase() === this.name)
      .map((t: any) => ({
        name: dasherize(t.name).toLocaleLowerCase(),
        domain: t.domain.name.toLocaleLowerCase(),
        title: t.name,
      }));

    console.log({ items: this.items });
  }

  public async beforeRouteUpdate(to, from, next) {
    const { domain } = to.params;
    this.name = domain;

    await this.load();

    next();
  }

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.load(),
      CategoriesModule.load(),
      DomainsModule.load(),
      StripsModule.load(),
    ]);

    next();
  }
}
</script>

<style lang="scss">
#domain #nav-toolbar .col-l {
  flex: 0;
}
.card {
  border-radius: 0;
  flex: 1;
}
</style>

<style lang="scss" scoped>
.img-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2px;
  max-width: 1500px;
  margin: 0 auto;
}

@media only screen and (min-width: 768px) {
  .img-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 1400px) {
  .img-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1500px) {
  .tt {
    padding-left:0;
    padding-right:0;
  }
}


</style>