<template>
  <div id="category">
    <v-layout>
      <v-navigation-drawer fixed left clipped app dark>
        <v-list>
          <v-subheader>Category</v-subheader>

          <v-list-group v-for="item in categories" :key="item._id" no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.sub" :key="subItem._id" @click>
              {{ subItem.name }}
            </v-list-tile>
          </v-list-group>

          <v-subheader>Media</v-subheader>

          <v-radio-group v-model="form.mediaType" :mandatory="false">
            <v-radio label="All" :value="null"></v-radio>
            <v-radio label="Photo" value="Photo"></v-radio>
            <v-radio label="Video" value="Video"></v-radio>
          </v-radio-group>

          <v-divider></v-divider>

          <v-checkbox v-model="form.printable" label="Printable" :value="true" :false-value="undefined"></v-checkbox>

          <v-divider></v-divider>

          <v-checkbox v-model="form.isolate" label="Isolate" :value="true" :false-value="undefined"></v-checkbox>

          <v-divider></v-divider>

          <v-subheader>Audience</v-subheader>

          <v-radio-group v-model="form.audience" :mandatory="false">
            <v-radio label="All" :value="null"></v-radio>
            <v-radio label="Kids" value="Kids"></v-radio>
            <v-radio label="Elderly" value="Elderly"></v-radio>
          </v-radio-group>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

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
      </v-container>-->

      <v-container grid-list-xl="grid-list-xl">
        <v-layout wrap>
          <v-flex v-for="(feature, i) in displayItems" :key="i" xs6 md6 lg3 d-flex>
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
import { filter } from 'lodash';

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

// https://github.com/vuetifyjs/vuetify/issues/7269
const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') { removeEmpty(obj[key]); }
    else if (obj[key] === null) { delete obj[key]; }
  });
  return obj;
};

@Component({})
export default class Category extends Vue {

  get displayItems() {
    // let x = this.items;

    console.log({ x: this.items });

    console.log({ oldForm: this.form });
    // const x = filter(this.items, this.form);

    const form = removeEmpty({ ...this.form });

    console.log({ form });

    // if (this.form.printable) {
    //   x = x.filter((xx) => xx.printable === this.form.printable);
    // }
    // if (this.form.isolate) {
    //   x = x.filter((xx) => xx.isolate === this.form.isolate);
    // }
    // if (this.form.mediaType && this.form.mediaType.length) {
    //   x = x.filter((xx) => this.form.mediaType.includes(xx.mediaType));
    // }
    // if (this.form.category && this.form.category.length) {
    //   x = x.filter((xx) => this.form.category.includes(xx.category));
    // }

    return filter(this.items, form);
  }
// https://github.com/vuetifyjs/vuetify/issues/7269
  form = {
    printable: null,
    isolate: null,
    mediaType: null,
    category: null,
    audience: null
  };

  drawer = null;
  itemsx = [
    { title: 'Home', icon: 'dashboard' },
    { title: 'About', icon: 'question_answer' },
  ];
  mini = false;
  right = null;

  items = [];
  name = '';
  overview = '';

  type;

  categories;

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

  itemsy = [
    {
      action: 'local_activity',
      title: 'Attractions',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'restaurant',
      title: 'Dining',
      active: true,
      items: [
        { title: 'Breakfast & brunch' },
        { title: 'New American' },
        { title: 'Sushi' },
      ],
    },
    {
      action: 'school',
      title: 'Education',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'directions_run',
      title: 'Family',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'healing',
      title: 'Health',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'content_cut',
      title: 'Office',
      items: [{ title: 'List Item' }],
    },
    {
      action: 'local_offer',
      title: 'Promotions',
      items: [{ title: 'List Item' }],
    },
  ];

  constructor() {
    super();
  }

  mounted() {
    const { overview, category } = this.$route.params;

    this.overview = startCase(overview);
    this.name = undasherize(category); // startCase(category);

    this.type = DomainModule.types.find(
      (t) => t.name.toLocaleLowerCase() === this.name.toLocaleLowerCase()
    );

    this.categories = CategoryModule.categories.map((c) => ({
      ...c,
      sub: CategoryModule.subCategories.filter((a) => a.category._id === c._id),
    }));

    console.log({ o: this.categories });

    this.load();
  }

  async load() {
    this.items = ActivitiesModule.activities
      .filter((a) => a.type === this.type._id)
      .map((t) => ({
        ...t,
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
      StripsModule.loadStrips(),
    ]);

    next();
  }
}
</script>
