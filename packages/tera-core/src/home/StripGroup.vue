<template>
  <div>
    <div v-if="groups">
      <strip
        v-for="group in groups"
        :key="group._id"
        :activities="getActivites(group.items)"
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

  getActivites(items) {
    const activities = ActivitiesModule.activity;
    return null;
    // return items.map((aa) => {
    //   const uu = activities.find((aaa) => aaa._id === aa);
    //   const type = DomainsModule.types.find((pp) => pp._id === uu.type);

    //   return { ...uu, type };
    // });
  }

  async load() {
    // await StripsModule.loadStrips();

    const strips = StripsModule.strip.all();
    this.groups = []; // strips[0].groups;

    // this.items = x.map((aa) => activities.find((aaa) => aaa._id === aa));

    // const res = await this.axios.get(`/activity/collection/${this.value}`);

    // this.items = res.data.strips[0].items;

    // //    [0].activities;
  }
}
</script>
