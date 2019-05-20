<template>
  <div id="category">
    <v-content>
      <v-container fluid class="pa-0">
        <div style="background:gray;">
          <h2 class="text-xs-center headline mb-5 white--text">
            <span>{{ name }}</span>
          </h2>
        </div>
      </v-container>
      <!-- <v-container fluid class="pa-0">
        <div>
          <h3>Activity</h3>
          <v-radio-group v-model="radioGroup">
            <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
          </v-radio-group>
          <h3>Media Type</h3>
          <v-radio-group v-model="radioGroup">
            <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
          </v-radio-group>

          <v-checkbox v-model="checkbox" :label="`Checkbox 1: ${checkbox.toString()}`"></v-checkbox>
          <v-checkbox v-model="checkbox" :label="`Checkbox 1: ${checkbox.toString()}`"></v-checkbox>

          <h3>Audience</h3>
          <v-radio-group v-model="radioGroup">
            <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
          </v-radio-group>

          <h3>Category</h3>
          <v-radio-group v-model="radioGroup">
            <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
          </v-radio-group>

          <h3>Sub Category</h3>
          <v-radio-group v-model="radioGroup">
            <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
          </v-radio-group>
        </div>
      </v-container> -->

      <v-container grid-list-xl="grid-list-xl">
        <v-layout wrap>
          <v-flex v-for="(feature, i) in items" :key="i" xs6 md6 lg3 d-flex>
            <v-card
              class="pa-0"
              fill-height
              :to="{ name: 'activity', params: { id: feature._id } }"
            >
              <v-img
                width="100%"
                height="100%"
                :alt="feature"
                aspect-ratio="1.3"
                :src="`/storage/${overview}/${name}/${feature._id}/cover-l.jpg`"
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
    </v-content>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
// import { DrawerItems } from 'tera-core';
import dasherize from 'dasherize';
import { startCase } from 'lodash';
import { ActivitiesModule } from '@/store/modules/activities';
import { CategoryModule } from '@/store/modules/category';
import { DomainModule } from '@/store/modules/domains';
import { AppModule } from '@/store/modules/app';
import { StripsModule } from '@/store/modules/strips';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

const undasherize = (str) => {
  if (str.indexOf('-') === -1) {
    return str;
  }
  return str
    .split('-')
    .map((s) => startCase(s))
    .join('');
};

@Component({})
export default class Category extends Vue {
  items = [];
  name = '';
  overview = '';

  constructor() {
    super();
  }

  type;

  mounted() {
    const { overview, category } = this.$route.params;
    
    this.overview = startCase(overview);
    this.name = undasherize(category); // startCase(category);

this.type = DomainModule.types.find(t =>t.name.toLocaleLowerCase() === this.name.toLocaleLowerCase());

    this.load();
  }

  async load() {
    this.items = ActivitiesModule.activities.filter(a => a.type === this.type._id).map((t) => ({
      name: t.name.toLocaleLowerCase(),
      title: t.name,
      _id: t._id,
    }));
  }
 
 public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ActivitiesModule.loadActivities(),
      ActivitiesModule.LoadArticulations(),
      
      CategoryModule.loadCategory(),
      DomainModule.loadDomains(),
      StripsModule.loadStrips()
    ]);

    next();
  }

  // items = [];
  // name = '';
  // constructor() {
  //   super();
  // }
  // mounted() {
  //   const { overview, category } = this.$route.params;
  //   this.name = category;
  //   const x = DrawerItems.find((d) => d.name === overview);
  //   if (x) {
  //     const d = x.items
  //       .filter((n) => !n.default)
  //       .map((n) => ({ ...n, name: dasherize(n.name) }));
  //     this.items = d
  //       .find((r) => r.name === category)
  //       .items.filter((r) => !r.default)
  //       .map((n) => ({ ...n, name: dasherize(n.name) }));
  //   }
  // }
}
</script>
