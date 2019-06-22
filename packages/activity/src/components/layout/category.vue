<template>
  <div id="category">
    <core-layout>
      <template slot="extension">
        <v-btn flat dark large color="black">
          <v-icon dark>keyboard_backspace</v-icon>
        </v-btn>

        <v-btn flat dark large color="black" @click="idrawer =!idrawer">
          <v-icon dark>tune</v-icon>Filters
        </v-btn>

        <h2 class="text-xs-center display-1 black--text" style="text-transform:capitalize;">
          <span>{{ name }}</span>
        </h2>
      </template>

      <v-navigation-drawer
        dark
        v-model="idrawer"
        :app="$vuetify.breakpoint.mdAndUp"
        :clipped="$vuetify.breakpoint.mdAndUp"
        :permanent="idrawer"
        :temporary="$vuetify.breakpoint.smAndDown"
        stateless
        left
        fixed
      >
        <v-list class="pa-3">
          <div style="display:flex;justify-content:center;">
            <v-btn flat dark color="white" @click="drawer =!drawer">Reset</v-btn>
            <v-btn flat dark color="white" @click="idrawer =!idrawer">Done</v-btn>
          </div>

          <v-divider class="mb-2"></v-divider>

          <h3 class="mb-2">Category</h3>

          <filter-list :items="categories" v-model="selected" style="font-size:16px;"></filter-list>

          <v-divider class="mt-2"></v-divider>

          <h3 class="my-2">Media</h3>

          <v-checkbox :hide-details="true" v-model="mediaType" label="Video" value="Video"></v-checkbox>
          <v-checkbox :hide-details="true" v-model="mediaType" label="Photo" value="Photo"></v-checkbox>

          <v-divider class="mt-2"></v-divider>

          <v-checkbox
            v-model="form.printable"
            label="Printable"
            :value="true"
            :false-value="undefined"
            :hide-details="true"
          ></v-checkbox>

          <v-divider class="mt-2"></v-divider>

          <v-checkbox
            :hide-details="true"
            v-model="form.isolate"
            label="Isolate"
            :value="true"
            :false-value="undefined"
          ></v-checkbox>

          <v-divider class="mt-2"></v-divider>

          <h3 class="my-2">Audience</h3>

          <v-checkbox :hide-details="true" v-model="audience" label="All" value="All"></v-checkbox>
          <v-checkbox :hide-details="true" v-model="audience" label="Kids" value="Kids"></v-checkbox>
          <v-checkbox :hide-details="true" v-model="audience" label="Elderly" value="Elderly"></v-checkbox>
        </v-list>
      </v-navigation-drawer>

      <v-content :class="{ 'p': idrawer && $vuetify.breakpoint.mdAndUp }">
        <v-container fluid>
          <v-layout row wrap>
            <activity-preview
              v-for="(feature, i) in displayItems.slice(0, 10)"
              :key="i"
              style="flex:0 0 auto;margin:0 5px 5px 0;"
              :activity="feature"
              width="260"
              height="205"
            ></activity-preview>
          </v-layout>
        </v-container>
      </v-content>
    </core-layout>
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

@Component({
  components: {
    ActivityPreview: () => import('tera-core/src/home/activity-preview.vue'),
    FilterList: () => import('./filter-list.vue'),
  },
})
export default class Category extends Vue {
  idrawer = this.$vuetify.breakpoint.mdAndUp;
  lorm = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  selected = null;

  drawer = false;

  scrollToTop() {
    this.scrollToY(0, 1500, 'easeInOutQuint');
  }

  // main function
  scrollToY(scrollTargetY = 0, speed = 2000, easing = 'easeOutSine') {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    let scrollY = window.scrollY || document.documentElement.scrollTop;
    let currentTime = 0;

    // min time .1, max time .8 seconds
    let time = Math.max(
      0.1,
      Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)
    );

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    let easingEquations = {
      easeOutSine: function(pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function(pos) {
        return -0.5 * (Math.cos(Math.PI * pos) - 1);
      },
      easeInOutQuint: function(pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow(pos - 2, 5) + 2);
      },
    };

    // add animation loop
    function tick() {
      currentTime += 1 / 60;

      var p = currentTime / time;
      var t = easingEquations[easing](p);

      if (p < 1) {
        window.requestAnimationFrame(tick);

        window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
      } else {
        console.log('scroll done');
        window.scrollTo(0, scrollTargetY);
      }
    }

    // call it once to get started
    tick();
  }

  get displayItems() {
    const form = removeEmpty(JSON.parse(JSON.stringify(this.form)));

    console.log({ form });

    if (this.active && this.active.length) {
      const a = this.active[0];
      if (a.type) {
        if (a.type === 'category') {
          form.category = { _id: a.id };
        } else {
          form.subCategory = { _id: a.id };
        }
      }
    }

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

    const a = { name: 'All', value: null };

    this.categories = [
      a,
      ...CategoriesModule.category.all().map((c: any) => ({
        name: c.name,
        children: [
          { name: 'All', value: c._id },
          ...subs
            .filter((s: any) => s.category_id === c._id)
            .map((r: any) => ({ value: r._id, name: r.name })),
        ],
        // type: 'category',
        // children: [
        //   { id: c._id, name: 'All', type: 'category' },
        //   ...subs
        //     .filter((s: any) => s.category_id === c._id)
        //     .map((r: any) => ({ id: r._id, name: r.name, type: 'sub' })),
        // ],
      })),
    ];

    this.selected = a;
    console.log({ c: this.categories });

    this.load();
  }

  async load() {
    const activities = ActivitiesModule.activity
      .query()
      .with(['type.domain', 'category', 'subCategory.category'])
      .all();

    const a = activities.filter(
      (aa: any) =>
        aa.type.name.toLocaleLowerCase() === this.name.toLocaleLowerCase()
    );

    this.items = a;
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
.tree-category.v-treeview > .v-treeview-node--leaf {
  margin-left: 0 !important;
}

.v-treeview-node--leaf {
  margin-left: 20px !important;
}

.v-treeview-node__label:hover {
  color: #fff;
  font-weight: bold;
}

.p {
  padding-left: 300px !important;
}

.v-toolbar__extension {
  background:#eee;
}
</style>
