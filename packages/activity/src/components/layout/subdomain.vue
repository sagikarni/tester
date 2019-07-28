<template>
  <core-layout id="subdomain" extension="true" :class="{ 'expand': expand }">
    <section
      slot="extension"
      style="display:flex;flex:1;position:relative;align-items:center;justify-content:space-between;"
    >
      <v-btn dark color="primary" @click="toggleFilter">
        <v-icon dark>tune</v-icon>Filters
      </v-btn>
      <h2
        class="display-1 black--text"
        :class="{ 'subheading': $vuetify.breakpoint.xsOnly, 'display-1': $vuetify.breakpoint.smAndUp }"
        style="text-transform:capitalize;flex:1;text-align:center;display:flex;align-items:center;justify-content:center;transform:translateX(-50%);left:50%;position:absolute;"
      >
        <span>{{subDomain.name}}</span>
      </h2>
      <div style="display:flex;" class="col" v-if="!$vuetify.breakpoint.xsOnly">
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
    </section>

    <v-navigation-drawer dark v-model="idrawerX" temporary left fixed>
      <v-list class="pa-3 filter-activities">
        <div
          style="display:flex;justify-content:center;position:sticky;height:48px;top:0;background:#424242;"
        >
          <v-btn flat dark color="white" @click="() => { resetFilter(); idrawerX =!idrawerX }">Reset</v-btn>
          <v-btn flat dark color="white" @click="idrawerX =!idrawerX">Done</v-btn>
        </div>

        <v-divider></v-divider>

        <h3 class="mb-2">Category</h3>

        <filter-list :items="categories" v-model="filterX.category" style="font-size:16px;"></filter-list>

        <v-divider></v-divider>

        <h3 class="my-2">Media</h3>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.mediaType"
          label="Video"
          value="Video"
        ></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.mediaType"
          label="Photo"
          value="Photo"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          v-model="filterX.printable"
          label="Printable"
          :value="true"
          :false-value="undefined"
          :hide-details="true"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.isolate"
          label="Isolate"
          :value="true"
          :false-value="undefined"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <h3 class="my-2">Audience</h3>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.audience"
          label="All"
          value="All"
        ></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.audience"
          label="Kids"
          value="Kids"
        ></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.audience"
          label="Elderly"
          value="Elderly"
        ></v-checkbox>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer stateless app clipped left fixed dark v-model="expand">
      <v-list class="pa-3 filter-activities">
        <div
          style="display:flex;justify-content:center;position:sticky;height:48px;top:0;background:#424242;"
        >
          <v-btn flat dark color="white" @click="() => { resetFilter(); idrawer =!idrawer }">Reset</v-btn>
          <v-btn flat dark color="white" @click="idrawer =!idrawer">Done</v-btn>
        </div>

        <v-divider></v-divider>

        <h3 class="mb-2">Category</h3>

        <filter-list :items="categories" v-model="filterX.category" style="font-size:16px;"></filter-list>

        <v-divider></v-divider>

        <h3 class="my-2">Media</h3>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.mediaType"
          label="Video"
          value="Video"
        ></v-checkbox>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.mediaType"
          label="Photo"
          value="Photo"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          v-model="filterX.printable"
          label="Printable"
          :value="true"
          :false-value="undefined"
          :hide-details="true"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.isolate"
          label="Isolate"
          :value="true"
          :false-value="undefined"
        ></v-checkbox>

        <v-divider class="mb-0 mt-1"></v-divider>

        <h3 class="my-2">Audience</h3>

        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.audience"
          label="Kids"
          value="Kids"
        ></v-checkbox>
        <v-checkbox
          class="my-2"
          :hide-details="true"
          v-model="filterX.audience"
          label="Elderly"
          value="Elderly"
        ></v-checkbox>
      </v-list>
    </v-navigation-drawer>

    <v-content class="mb-4" style="min-height:700px;">
      <div v-if="act && act.length > 0">
        <div class="img-grid">
          <activity-preview :key="feature._id" :activity="feature" v-for="(feature, i) in act"></activity-preview>
        </div>

        <v-btn
          :loading="loading4"
          :disabled="loading4"
          @click="loadMore"
          style="margin:20px auto;display:block;"
          v-if="pagination.hasNextPage"
        >
          Load More
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <div v-else>
        <div class="not-found-message display-1 pa-5">
          <strong>Sorry, We could not find activities which fit your filter(s) criterias</strong>
          <span class="headline">please refine your filters</span>
        </div>
      </div>
    </v-content>
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';
// import { DrawerItems } from 'tera-core';
import dasherize from 'dasherize';
import { ActivitiesModule } from 'tera-core/src/store/activities.module';
import { CategoriesModule } from 'tera-core/src/store/categories.module';
import { DomainsModule } from 'tera-core/src/store/domains.module';
import { AppModule } from 'tera-core/src/store/app';
import { StripsModule } from 'tera-core/src/store/strips.module';
import { filter, upperFirst, startCase } from 'lodash';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

const undasherize = (str) =>
  str.indexOf('-') === -1
    ? upperFirst(str)
    : str
        .split('-')
        .map((s) => upperFirst(startCase(s)))
        .join('');

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
export default class Subdomain extends Vue {
  expand = this.$vuetify.breakpoint.mdAndUp;

  resetFilter() {
    this.filterX = this.newFilter();
  }

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

  get act() {
    return ActivitiesModule.activity
      .query()
      .with(['type.domain', 'category', 'subCategory.category'])
      .get();
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

  filter = {
    audience: null,
    mediaType: null,
    printable: null,
    isolate: null,
  };

  mediaType = [];
  audience = [];
  active = [];

  mini = false;
  right = null;

  items = [];
  name = '';
  domain = '';

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
      .where('domain_id', this.subDomain.domain_id)
      .with(['domain'])
      .get()
      .map((uu: any) => ({
        name: uu.name,
        url: `/${dasherize(uu.domain.name) + '/' + dasherize(uu.name)}`,
      }));
  }

  // mounted() {
  //   this.load(this.$route.params);
  // }

  pagination = { count: 0, hasNextPage: false, perPage: 30, page: 0 };

  limit = 2;

  // act = [];

  // refreshAct() {
  //   console.log('in act');
  //   const x = ActivitiesModule.activity
  //     .query()
  //     .with(['type.domain', 'category', 'subCategory.category'])
  //     .where('type_id', this.activityType._id)
  //     .limit(this.limit)
  //     .get();

  //     console.log({ x, l: x.length });
  //     this.act = x;
  // }

  // async loadMore() {
  //   console.log({ limit: this.limit });
  //   console.log({ act: this.act.length });
  //   this.limit = this.limit + 2;

  //   this.refreshAct();

  //   if (this.limit > this.act.length) {
  //     this.loadMoreFromApi();
  //     this.refreshAct();
  //   }
  // }

  // async updateSubdomain(subDomain) {
  //   this.subDomain = subDomain;
  //   this.pagination = { count: 0, hasNextPage: true, perPage: 4, page: 1 };

  //   this.refreshAct();

  //   if (!this.act.length) {
  //     this.loadMoreFromApi();
  //   }
  // }

  // async load({ domain, subdomain }) {
  //   console.log('in load', subdomain);
  //   this.name = subdomain;
  // }

  // get act() {
  //   console.log({ actSubdomain: this.subDomain._id });
  //   const x = ActivitiesModule.activity
  //     .query()
  //     .with(['type.domain', 'category', 'subCategory.category'])
  //     .where('type_id', this.subDomain._id)
  //     .limit(this.limit)
  //     .get();

  //   console.log({ x, l: x.length });
  //   return x;
  // }

  // async loadMore() {
  //   this.limit = this.limit + 2;
  //   this.recalc();

  //   console.log({ limit: this.limit });
  //   console.log({ actlength: this.act.length });

  //   if (this.limit > this.act.length) {
  //     await this.fetch();
  //   }
  // }

  // async fetch() {
  //   if (!this.pagination[this.subDomain._id]) {
  //     this.pagination[this.subDomain._id] = {
  //       count: 0,
  //       hasNextPage: false,
  //       perPage: 4,
  //       page: 0,
  //     };
  //   }
  //   const p = this.pagination[this.subDomain._id];

  //   const x = await ActivitiesModule.loadByFilter({
  //     filter: { type: this.subDomain._id },
  //     perPage: p.perPage,
  //     page: p.page + 1,
  //   });

  //   p.count = x.activityPagination.count;
  //   p.hasNextPage = x.activityPagination.pageInfo.hasNextPage;
  //   p.page = x.activityPagination.pageInfo.currentPage;

  //   this.recalc();
  // }

  // load(subDomain) {
  //   console.log('in load', { subDomain });

  //   this.updateSubdomain(subDomain);
  // }

  // recalc() {
  //   const q = ActivitiesModule.activity
  //     .query()
  //     .with(['type.domain', 'category', 'subCategory.category'])
  //     .where('type_id', this.subDomain._id);

  //   this.act = q.limit(this.limit).get();
  // }

  // async updateSubdomain(subDomain) {
  //   console.log('updateSubdomain', subDomain);

  //   this.limit = 2;

  //   this.subDomain = subDomain;

  //   this.recalc();

  //   if (this.act.length === 0) {
  //     await this.fetch();
  //   }
  // }
  subDomain = null;

  filterX = this.newFilter();

  newFilter() {
    return {
      ...{
        category: { name: 'All', value: null },
        printable: null,
        isolate: null,
        mediaType: null,
        audience: null,
      },
    };
  }

  page = {
    limit: 0,
    hasNextPage: false,
  };

  created() {
    console.log('in created');
    const { subDomain } = this.$route.params.componentData as any;

    this.load(subDomain);

    this.$watch(
      'filterX',
      (val, old) => {
        console.log('filterX changed!!');
        if (!val) return;
        console.log('watch filetrx');

        this.pagination = {
          count: 0,
          hasNextPage: false,
          perPage: 30,
          page: 0,
        };

        this.refreshGrid({ append: false });
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  load(subDomain) {
    console.log('in load');
    this.updateSubdomain(subDomain);
  }

  updateSubdomain(subDomain) {
    console.log('in updateSubdomain');
    console.log({ subDomain });
    this.subDomain = subDomain;
    this.pagination = { count: 0, hasNextPage: false, perPage: 30, page: 0 };

    this.categories = CategoriesModule.subCategory
      .query()
      .with('category')
      .where('types', (value) => value.indexOf(subDomain._id) > -1)
      .get()
      .reduce(
        (a, sc: any) => {
          const c = sc.category_id;
          if (!a[c]) {
            a[c] = {
              name: sc.category.name,
              children: [{ name: 'All', value: sc.category_id, type: 1 }],
            };
          }
          a[c].children = a[c].children.concat({
            name: sc.name,
            value: sc._id,
            type: 2,
          });
          return a;
        },
        { ['All']: this.filterX.category } as any
      );
  }

  loader= null;
   loading4= false;

  async loadMore() {
    this.loader = 'loading4';
    this.loading4 = true;
    await this.refreshGrid({ append: true });
    this.loader = null;
    this.loading4 = false;
  }

  async refreshGrid({ append }) {
    console.log('in refreshGrid');
    let filter = {
      type: this.subDomain._id,
    } as any;

    if (this.filterX.category) {
      if ((this.filterX.category as any).type === 1) {
        filter = { ...filter, category: this.filterX.category.value };
      }
      if ((this.filterX.category as any).type === 2) {
        filter = { ...filter, subCategory: this.filterX.category.value };
      }
    }

    if (this.filterX.printable) {
      console.log({ aaa: this.filterX.printable });
      filter = { ...filter, printable: this.filterX.printable };
    }

    if (this.filterX.isolate) {
      console.log({ aaa: this.filterX.isolate });
      filter = { ...filter, isolate: this.filterX.isolate };
    }

    if (this.filterX.audience) {
      console.log({ l: this.filterX.audience });
      filter = { ...filter, audience: this.filterX.audience };
    }

    if (this.filterX.mediaType) {
      console.log({ l: this.filterX.mediaType });
      filter = { ...filter, mediaType: this.filterX.mediaType };
    }

    const x = await ActivitiesModule.loadByFilter({
      filter,
      perPage: this.pagination.perPage,
      page: this.pagination.page + 1,
      append,
    });

    this.pagination.count = x.activityPagination.count;
    this.pagination.hasNextPage = x.activityPagination.pageInfo.hasNextPage;
    this.pagination.page = x.activityPagination.pageInfo.currentPage;
    console.log({ x });

    // console.log('in refreshGrid');
    // let q = ActivitiesModule.activity
    //   .query()
    //   .with(['type.domain', 'category', 'subCategory.category'])
    //   .where('type_id', this.subDomain._id);

    // console.log({ before: q.count() });

    // if (this.filterX.category) {
    //   if ((this.filterX.category as any).type === 1) {
    //     q = q.where('category_id', this.filterX.category.value);
    //   }
    //   if ((this.filterX.category as any).type === 2) {
    //     q = q.where('subCategory_id', this.filterX.category.value);
    //   }
    // }

    // console.log({ after: q.count() });

    // this.page.limit = this.page.limit + 2;

    // this.page.hasNextPage = q.count() > this.page.limit;

    // this.act = q.limit(this.page.limit).get();

    // if (!this.page.hasNextPage) {
    //   console.log('call to api');

    //   // const x = await ActivitiesModule.loadByFilter({
    //   //   filter: { type: this.subDomain._id },
    //   //   perPage: this.pagination.perPage,
    //   //   page: this.pagination.page + 1,
    //   // });

    //   //  this.pagination.count = x.activityPagination.count;
    //   //  this.pagination.hasNextPage = x.activityPagination.pageInfo.hasNextPage;
    //   //  this.pagination.page = x.activityPagination.pageInfo.currentPage;

    //   //  this.refreshGrid();
    // }
  }

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      CategoriesModule.load(),
      DomainsModule.load(),
      // ActivitiesModule.load(),
    ]);
    console.log('in beforeRouteEnter');

    const { domain, subdomain } = to.params;

    const subDomain = DomainsModule.types
      .query()
      .where('name', undasherize(subdomain))
      .first();

    if (!subDomain) this.$router.push('/404');

    // fucking workaround because https://github.com/vuejs/vue-router/issues/1144
    to.params.componentData = { subDomain };
    next();
  }

  public async beforeRouteUpdate(to, from, next) {
    await Promise.all([CategoriesModule.load(), DomainsModule.load()]);

    console.log('in beforeRouteUpdate');

    const { domain, subdomain } = to.params;

    const subDomain = DomainsModule.types
      .query()
      .where('name', undasherize(subdomain))
      .first();

    if (!subDomain) this.$router.push('/404');

    this.load(subDomain);

    this.filterX = this.newFilter();

    console.log({ aaa: this.filterX });
    this.refreshGrid({ append: false });

    next();
  }
}
</script>

<style lang="scss">
.not-found-message {
  text-align: center;

  strong {
    display: block;
    margin-bottom: 30px;
  }
}

.filter-activities.v-list .v-input--checkbox:hover .v-label {
  font-weight: bold !important;
  color: #fff !important;
}

.t {
  max-width: 332px !important;
}

#subdomain {
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
#subdomain.expand main.v-content,
#subdomain.expand footer.v-footer {
  padding-left: 300px !important;
}



 .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
