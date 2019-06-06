<template>
  <div id="category">
    <v-layout>
      <v-navigation-drawer fixed left clipped app dark>
        <v-list>
          <v-subheader>Category</v-subheader>
          <!-- 
          <v-list-group v-for="item in categories" :key="item._id" no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.items" :key="subItem._id">{{ subItem.name }}</v-list-tile>
          </v-list-group>-->

          <v-treeview
          return-object
            :active.sync="active"
            v-model="tree"
            :items="categories"
            activatable
            active-class="grey lighten-4 indigo--text"
            selected-color="indigo"
            open-on-click
            selectable
            expand-icon="fa-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
          ></v-treeview>

          <v-divider></v-divider>

          <v-subheader>Media</v-subheader>

          <v-checkbox v-model="mediaType" label="Video" value="Video"></v-checkbox>
          <v-checkbox v-model="mediaType" label="Photo" value="Photo"></v-checkbox>

          <v-divider></v-divider>

          <v-checkbox
            v-model="form.printable"
            label="Printable"
            :value="true"
            :false-value="undefined"
          ></v-checkbox>

          <v-divider></v-divider>

          <v-checkbox v-model="form.isolate" label="Isolate" :value="true" :false-value="undefined"></v-checkbox>

          <v-divider></v-divider>

          <v-subheader>Audience</v-subheader>

          <v-checkbox v-model="audience" label="All" value="All"></v-checkbox>
          <v-checkbox v-model="audience" label="Kids" value="Kids"></v-checkbox>
          <v-checkbox v-model="audience" label="Elderly" value="Elderly"></v-checkbox>
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
import { ActivitiesModule } from 'tera-core/src/store/activities.module';
import { CategoriesModule } from 'tera-core/src/store/categories.module';
import { DomainsModule } from 'tera-core/src/store/domains.module';
import { AppModule } from 'tera-core/src/store/app';
import { StripsModule } from 'tera-core/src/store/strips.module';
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

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] === null) {
      delete obj[key];
    }
    if (
      obj[key] &&
      typeof obj[key] === 'object' &&
      Object.keys(obj[key]).length === 0
    ) {
      delete obj[key];
    }
  });
  return obj;
};

@Component({})
export default class Category extends Vue {
  get displayItems() {
    const form = removeEmpty(JSON.parse(JSON.stringify(this.form)));

    console.log({ form });

    if (this.active && this.active.length) {
      const a = this.active[0];
      if (a.type === 'category') {
        form.category = { _id: a.id };
      } else {
        form.subCategory = { _id: a.id };
      }
    }
debugger;
    let filteredActivities = filter(this.items, form);

    if (this.mediaType && this.mediaType.length) {
      filteredActivities = filter(filteredActivities, (aa) =>
        this.mediaType.includes(aa.mediaType)
      );
    }

    if (this.audience && this.audience.length) {
      filteredActivities = filter(filteredActivities, (aa) =>
        this.audience.includes(aa.audience)
      );
    }


    console.log({ filteredActivities });

    return filteredActivities;
  }

  // https://github.com/vuetifyjs/vuetify/issues/7269
  form = {
    printable: null,
    isolate: null,
    category: null,
    audience: null,
  };

  mediaType = [];
  audience = [];
  active = [];

  itemsXY = [
    {
      id: 1,
      name: 'Applications :',
      children: [
        { id: 2, name: 'Calendar : app' },
        { id: 3, name: 'Chrome : app' },
        { id: 4, name: 'Webstorm : app' },
      ],
    },
    {
      id: 5,
      name: 'Documents :',
      children: [
        {
          id: 6,
          name: 'vuetify :',
          children: [
            {
              id: 7,
              name: 'src :',
              children: [
                { id: 8, name: 'index : ts' },
                { id: 9, name: 'bootstrap : ts' },
              ],
            },
          ],
        },
        {
          id: 10,
          name: 'material2 :',
          children: [
            {
              id: 11,
              name: 'src :',
              children: [
                { id: 12, name: 'v-btn : ts' },
                { id: 13, name: 'v-card : ts' },
                { id: 14, name: 'v-window : ts' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 15,
      name: 'Downloads :',
      children: [
        { id: 16, name: 'October : pdf' },
        { id: 17, name: 'November : pdf' },
        { id: 18, name: 'Tutorial : html' },
      ],
    },
    {
      id: 19,
      name: 'Videos :',
      children: [
        {
          id: 20,
          name: 'Tutorials :',
          children: [
            { id: 21, name: 'Basic layouts : mp4' },
            { id: 22, name: 'Advanced techniques : mp4' },
            { id: 23, name: 'All about app : dir' },
          ],
        },
        { id: 24, name: 'Intro : mov' },
        { id: 25, name: 'Conference introduction : avi' },
      ],
    },
  ];

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

  categories = [];

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
    this.name = undasherize(category);

    this.overview = startCase(overview);

    const subs = CategoriesModule.subCategory.all();

    this.categories = CategoriesModule.category.all().map((c: any) => ({
      // id: c._id,
      name: c.name,
      type: 'category',
      children: [{ id: c._id, name: 'All', type: 'category'}, ...subs.filter((s: any) => s.category_id === c._id).map((r: any) => ({ id: r._id, name: r.name, type: 'sub' })) ],
    }));

    // this.categories = CategoriesModule.categories.map((c) => ({
    //   ...c,
    //   sub: CategoryModule.subCategories.filter((a) => a.category._id === c._id),
    // }));

    // console.log({ o: this.categories });

    this.load();
  }

  async load() {
    const activities = ActivitiesModule.activity
      .query()
      .with(['type.domain', 'category', 'subCategory.category'])
      .all();

    console.log({ activities });

const a = activities.filter((aa: any) => aa.type.name.toLocaleLowerCase() === this.name.toLocaleLowerCase());

    this.items = a;

    console.log({ a });
    // .filter((a) => a.type === this.type._id)
    // .map((t) => ({
    //   ...t,
    //   name: t.name.toLocaleLowerCase(),
    //   title: t.name,
    //   _id: t._id,
    // }));
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
