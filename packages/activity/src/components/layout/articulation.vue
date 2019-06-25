<template>
  <div id="overview">
    <core-layout :hasInnerDrawer="idrawer && $vuetify.breakpoint.mdAndUp">
      <template slot="extension" style="flex-direction:column;">
        <div style="background:#eee;" class="pa-3 elevation-4 mb-3">
          <h2 class="text-xs-center display-1 black--text" style="text-transform:capitalize;">
            <span>Articulation</span>
          </h2>
        </div>
      </template>

      <v-content class="mb-4" :class="{ 'p': idrawer && $vuetify.breakpoint.mdAndUp }">
        <div v-for="(group, index) in groups" :key="index">
          <v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" grid-list-sm fluid>
            <v-layout>
              <v-flex>{{group.name}}</v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex
                xs12
                sm6
                lg4
                xl2
                :class="{ 't': $vuetify.breakpoint.xlOnly }"
                v-for="(articulation, i) in group.articulations"
                :key="i"
              >
                <div class="articulation-item display-1">
                  <i>
                    <span>{{articulation.sound}}</span>
                  </i>
                  {{articulation.name}}
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-content>
    </core-layout>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import dasherize from 'dasherize';
import { ActivitiesModule } from 'tera-core/src/store/activities.module';
import { ArticulationsModule } from 'tera-core/src/store/articulations.module';
import { CategoriesModule } from 'tera-core/src/store/categories.module';
import { DomainsModule } from 'tera-core/src/store/domains.module';
import { AppModule } from 'tera-core/src/store/app';
import { StripsModule } from 'tera-core/src/store/strips.module';
import { groupBy, keys } from 'lodash';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({})
export default class Articulation extends Vue {
  get groups() {
    const a = groupBy(ArticulationsModule.articulation.all(), 'category');
    return keys(a).map((r) => ({ name: r, articulations: a[r] }));
  }

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([ArticulationsModule.load()]);

    next();
  }
}
</script>

<style lang="scss" scoped>
.articulation-item {
  background: #07395e;
  color: #fff;
  height: 205px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #000;
  i {
    border-top: 27px solid #fff;
    border-right: 27px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 14px;
  }
}
</style>
