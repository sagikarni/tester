<template>
  <div>
    <strip v-for="group in groups" :key="group._id" :items="group.items" :title="group.name">
      <activity-preview :width="'270px'" :height="'180px'" :activity="slotProps.item" slot-scope="slotProps"></activity-preview>
    </strip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { StripsModule } from '../store/strips.module';
import { ActivitiesModule } from '../store/activities.module';

@Component({
  components: {
    ActivityPreview: () => import('./activity-preview.vue'),
    Strip: () => import('./Strip.vue'),
  },
})
export default class StripGroup extends Vue {
  @Prop() value;

  public groups = null;

  mounted() {
    this.load();
  }

  async load() {
    const strip = StripsModule.strip
      .query()
      .where('name', this.value)
      .first();

    this.groups = (strip as any).groups.map((g) => ({
      name: g.name,
      items: ActivitiesModule.activity
        .query()
        .whereIdIn(g.items)
        .with(['type.domain', 'category', 'subCategory.category'])
        .get(),
    }));
  }
}
</script>
