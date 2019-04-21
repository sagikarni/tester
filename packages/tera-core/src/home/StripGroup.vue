<template>
  <div>
    <div v-if="items">
      <strip v-for="item in items" :key="item._id" :activities="item.activities" :title="item.name" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Strip: () => import('./Strip.vue'),
  },
})
export default class StripGroup extends Vue {
  @Prop() value;

  public items = null;

  mounted() {
    this.load();
  }

  async load() {
    const res = await this.axios.get(`/activity/collection/${this.value}`);

    this.items = res.data.activityCollection[0].items;
    //    [0].activities;
  }
}
</script>
