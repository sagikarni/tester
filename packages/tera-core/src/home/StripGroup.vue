<template>
  <div>
    <div v-if="groups">
      <strip
        v-for="group in groups"
        :key="group._id"
        :activities="group.items"
        :title="group.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { StripsModule } from '../store/strips.module';
import { ActivitiesModule } from '../store/activities.module';
import { DomainsModule } from '../store/domains.module';

@Component({
  components: {
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
    const strips = StripsModule.strip.all() as any;

    this.groups = strips[0].groups.map((g) => ({
      ...g,
      items: g.items.map((i) => ActivitiesModule.activity.query().whereId(i).with(['type.domain', 'category', 'subCategory.category']).first()),
    }));

  }
}
</script>
