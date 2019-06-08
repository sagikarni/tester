<template>
  <v-container fluid class="pa-0">
    <v-card flat class="pa-0 mb-4">
      <activity-preview :clickable="false" :width="'100%'" :height="'400px'" :activity="activity"></activity-preview>

      <div class="nav-container">
        <v-flex order-xs3 order-sm1 d-flex>
          <div class="item item--1">
            <span>Category</span>
            <span>{{category}}</span>
          </div>
          <div class="item item--2">
            <span>Sub Category</span>
            <span>{{subCategory}}</span>
          </div>
          <div class="item item--3">
            <span>Slides</span>
            <span>{{slidesCount}}</span>
          </div>
        </v-flex>
        <div v-if="$vuetify.breakpoint.mdAndUp" style="flex-grow: 1;order:2;"></div>
        <v-flex order-xs1 order-sm3 d-flex>
          <router-link to="/" class="item item--4">
            <v-icon>favorite</v-icon>
            <span>Pin</span>
          </router-link>
          <router-link to="/" class="item item--5">
            <v-icon>print</v-icon>
            <span>Print</span>
          </router-link>
          <router-link to="/" class="item item--6">
            <v-icon>share</v-icon>
            <span>Share</span>
          </router-link>
        </v-flex>
      </div>
    </v-card>

    <h2>What's Inside?</h2>

    <v-layout class="pa-0" grid-list-xs>
      <v-layout wrap>
        <v-flex v-for="(thumbnail, i) in thumbnails" :key="i" xs12 md6 lg4 d-flex>
          <v-card class="pa-0" fill-height>
            <v-img width="100%" height="100%" :aspect-ratio="1.6" :src="thumbnail"></v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
    ActivityPreview: () => import('tera-core/src/home/activity-preview.vue'),
  },
})
export default class ActivityDetails extends Vue {
  @Prop() activity;

  get thumbnails() {
    return this.activity.metadata.slides
      .map((s) =>
        s.media.map(
          (ss) =>
            `/storage/${this.activity.type.domain.name}/${
              this.activity.type.name
            }/${this.activity._id}/thumbnails/${ss.name}`
        )
      )
      .flat();
  }

  get category() {
    return this.activity.category.name;
  }

  get subCategory() {
    return this.activity.subCategory.name;
  }

  get slidesCount() {
    return this.activity.metadata.slides.length;
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  text-align: center;

  .item {
    flex: 1;
    width: 100px;

    > span:first-child {
      color: #888;
    }
  }
  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .item {
    padding: 10px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
