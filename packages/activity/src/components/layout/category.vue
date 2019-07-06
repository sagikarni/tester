<template>
  <core-layout id="category" extension="true" :class="{ 'expand': expand }">
    <core-nav slot="extension" :title="name">
      <v-btn slot="left" flat dark color="black" @click="toggleFilter">
        <v-icon dark>tune</v-icon>Filters
      </v-btn>
      <div slot="right" style="display:flex;" class="col" v-if="!$vuetify.breakpoint.xsOnly">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn small flat v-on="on" dark color="black">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(item, index) in typesUrls" :key="index" :to="item.url">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </core-nav>

    <v-navigation-drawer dark v-model="idrawerX" temporary left fixed>
      <v-list class="pa-3">
        <div
          style="display:flex;justify-content:center;position:sticky;height:48px;top:0;background:#424242;"
        >
          <v-btn flat dark color="white" @click="idrawerX =!idrawerX">Reset</v-btn>
          <v-btn flat dark color="white" @click="idrawerX =!idrawerX">Done</v-btn>
        </div>

        <v-divider></v-divider>

        <h3 class="mb-2">Category</h3>

        <filter-list :items="categories" v-model="selected" style="font-size:16px;"></filter-list>

        <v-divider></v-divider>

        <h3 class="my-2">Media</h3>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="mediaType"
          label="Video"
          value="Video"
        ></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="mediaType"
          label="Photo"
          value="Photo"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          v-model="form.printable"
          label="Printable"
          :value="true"
          :false-value="undefined"
          :hide-details="true"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="form.isolate"
          label="Isolate"
          :value="true"
          :false-value="undefined"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <h3 class="my-2">Audience</h3>

        <v-checkbox class="my-2" :hide-details="true" v-model="audience" label="All" value="All"></v-checkbox>
        <v-checkbox class="my-2" :hide-details="true" v-model="audience" label="Kids" value="Kids"></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="audience"
          label="Elderly"
          value="Elderly"
        ></v-checkbox>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer stateless app clipped left fixed dark v-model="expand">
      <v-list class="pa-3">
        <div
          style="display:flex;justify-content:center;position:sticky;height:48px;top:0;background:#424242;"
        >
          <v-btn flat dark color="white" @click="idrawer =!idrawer">Reset</v-btn>
          <v-btn flat dark color="white" @click="idrawer =!idrawer">Done</v-btn>
        </div>

        <v-divider></v-divider>

        <h3 class="mb-2">Category</h3>

        <filter-list :items="categories" v-model="selected" style="font-size:16px;"></filter-list>

        <v-divider></v-divider>

        <h3 class="my-2">Media</h3>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="mediaType"
          label="Video"
          value="Video"
        ></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="mediaType"
          label="Photo"
          value="Photo"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          v-model="form.printable"
          label="Printable"
          :value="true"
          :false-value="undefined"
          :hide-details="true"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="form.isolate"
          label="Isolate"
          :value="true"
          :false-value="undefined"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <h3 class="my-2">Audience</h3>

        <v-checkbox class="my-2" :hide-details="true" v-model="audience" label="Kids" value="Kids"></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="audience"
          label="Elderly"
          value="Elderly"
        ></v-checkbox>
      </v-list>
    </v-navigation-drawer>

    <v-content class="mb-4">
      <div class="img-grid">
        <activity-preview
          :key="feature._id"
          :activity="feature"
          v-for="(feature, i) in displayItems"
        ></activity-preview>
      </div>
    </v-content>
  </core-layout>
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
  expand = this.$vuetify.breakpoint.mdAndUp;

  @Watch('$vuetify.breakpoint.name') onChange(o, n) {
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.idrawerX = false;
      if (!this.hideFilter) this.expand = true;
    } else {
      this.expand = false;
    }
  }

  hideFilter = false;

  toggleFilter() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.idrawerX = !this.idrawerX;
    } else {
      this.hideFilter = !this.hideFilter;
      this.expand = !this.expand;
    }
  }

  idrawerX = false;

  idrawer = this.$vuetify.breakpoint.mdAndUp;

  selected = null;

  drawer = false;

  goto(item) {
    console.log({ item });
    debugger;
  }

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
  domain = '';

  type;

  categories = [];


  constructor() {
    super();
  }

  get subCategories() {
    return CategoriesModule.subCategory.all();
  }

  get typesUrls() {
    return DomainsModule.types
      .query()
      .with(['domain'])
      .get()
      .map((uu: any) => ({
        name: uu.name,
        url: `/${dasherize(uu.domain.name) + '/' + dasherize(uu.name)}`,
      }));
  }

  mounted() {
    const { domain, category } = this.$route.params;
    this.name = undasherize(category);

    this.domain = startCase(domain);

    const a = { name: 'All', value: null };

    this.categories = [
      a,
      ...CategoriesModule.category.all().map((c: any) => ({
        name: c.name,
        children: [
          { name: 'All', value: c._id },
          ...this.subCategories
            .filter((s: any) => s.category_id === c._id)
            .map((r: any) => ({ value: r._id, name: r.name })),
        ],
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

  public async beforeRouteUpdate(to, from, next) {
    
    const { domain, category } = to.params;
    this.name = undasherize(category);

    this.domain = startCase(domain);

    const a = { name: 'All', value: null };

    this.categories = [
      a,
      ...CategoriesModule.category.all().map((c: any) => ({
        name: c.name,
        children: [
          { name: 'All', value: c._id },
          ...this.subCategories
            .filter((s: any) => s.category_id === c._id)
            .map((r: any) => ({ value: r._id, name: r.name })),
        ],
      })),
    ];

    this.selected = a;
    console.log({ c: this.categories });

    this.load();
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

.t {
  max-width: 332px !important;
}

#category {
  .caption {
    grid-template-columns: 1fr auto auto;
    grid-gap: 10px;
  }

  .caption > :first-child {
    display: none;
  }
  .caption > :nth-child(2) {
    order: 3;
  }
}
</style>

<style lang="scss" scoped>
.img-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2px;
  margin: 0 auto;
}

@media only screen and (min-width: 576px) {
  .img-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 768px) {
  .img-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 1024px) {
  .img-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1400px) {
  .img-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media only screen and (min-width: 3000px) {
  .img-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media only screen and (min-width: 3600px) {
  .img-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

</style>

<style lang="scss">
#category.expand main.v-content,
#category.expand footer.v-footer {
  padding-left: 300px !important;
}
</style>
