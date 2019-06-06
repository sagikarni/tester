<template>
  <div>
    <strip v-for="group in groups" :key="group._id" :items="group.items" :title="group.name">
      <v-card width="260" class="card" slot-scope="slotProps">
        <v-img
          :src="slotProps.item.picture"
          class="white--text"
          height="205px"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3), rgba(0,0,0,.7)"
        >
          <v-card-title class="fill-height">
            <div
              style="background: rgba(0,0,0,.3);flex:1;text-align:left;padding:5px 8px 5px 15px;position:relative;"
            >
              <div
                class="left-border"
                :class="slotProps.item.domain"
                style="position: absolute;height: 64px;width: 7px;left: 0px;    top: 0;"
              ></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="font-size:14px;">{{slotProps.item.type}}</div>
                <v-icon color="white">{{slotProps.item.mediaType}}</v-icon>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="font-size:18px;font-weight:bold;">{{slotProps.item.name}}</div>
                <div style="font-size:14px;">{{slotProps.item.audience}}</div>
              </div>
            </div>
          </v-card-title>
        </v-img>
      </v-card>
    </strip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { StripsModule } from '../store/strips.module';
import { ActivitiesModule } from '../store/activities.module';

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
        .get()
        .map((a: any) => ({
          picture: `/storage/${a.type.domain.name}/${a.type.name}/${
            a._id
          }/cover-l.jpg`,
          type: a.type.name,
          domain: a.type.domain.name.toLocaleLowerCase(),
          name: a.name,
          audience: a.audience,
          mediaType: a.mediaType === 'Video' ? 'videocam' : 'photo',
        })),
    }));
  }
}
</script>


<style lang="scss" scoped>
.card {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.15);
  // box-shadow:0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 5px;
  &:hover {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: scale(1.01);
    //  box-shadow:0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
  }
}

.v-card__title {
  padding: 0;
  box-sizing: border-box;
  align-items: flex-end;
}
</style>
