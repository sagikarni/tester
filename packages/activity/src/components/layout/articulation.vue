<template>
  <div id="articulation">
    <core-layout :extension="idrawer && $vuetify.breakpoint.mdAndUp">
      <template slot="extension" style="flex-direction:column;">
        <div style="background:#eee;" class="pa-3 elevation-4 mb-3">
          <h2 class="text-xs-center display-1 black--text" style="text-transform:capitalize;">
            <span>Articulation</span>
          </h2>
        </div>
      </template>

      <v-content class="mb-4" :class="{ 'p': idrawer && $vuetify.breakpoint.mdAndUp }">
        <v-container grid-list-sm fluid style="max-width:768px;">
          <v-layout row wrap>
            <template v-for="(group, index) in groups">
              <v-flex
                xs12
                
                :md6="group.name.toLocaleLowerCase() === 'liquids' || group.name.toLocaleLowerCase() === 'nasals'"
                :md4="group.name.toLocaleLowerCase() === 'affricates'"
                :md8="group.name.toLocaleLowerCase() === 'gildes'"

                :key="index"
                :class="group.name.toLocaleLowerCase()"
              >
                <h2 class="my-2">{{group.name}}</h2>
                <v-layout row wrap>
                  <v-flex
                    xs6
                    sm4
                    md2
                    :md4="group.name.toLocaleLowerCase() === 'liquids' || group.name.toLocaleLowerCase() === 'nasals'"
                    :md6="group.name.toLocaleLowerCase() === 'affricates'"
                    :md3="group.name.toLocaleLowerCase() === 'gildes'"
                    v-for="(articulation, i) in group.articulations"
                    :key="i"
                  >
                    <articulation-preview :articulation="articulation"></articulation-preview>
                  </v-flex>
                </v-layout>
              </v-flex>
              <!-- <v-flex
                v-if="['fricatives', 'explosive', 'nasals'].includes(group.name.toLocaleLowerCase())"
                :class="group.name.toLocaleLowerCase()"
                xs12
              ></v-flex> -->
            </template>
          </v-layout>
        </v-container>

        <!-- <div > -->

        <!-- <v-container :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }" grid-list-sm fluid>
            <v-layout>
              <v-flex>
                <h2 class="ma-2 headline">{{group.name}}</h2>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              
            </v-layout>
        </v-container>-->

        <!-- </div> -->
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

@Component({
  components: {
    ArticulationPreview: () =>
      import('tera-core/src/home/articulation-preview.vue'),
  },
})
export default class Articulation extends Vue {
  some = {
    liquids: 3,
  };
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
  // height:200px;
}

.fricatives {
  order: 1;
}
.explosive {
  order: 2;
}
.affricates {
  order: 5;
}
.liquids {
  order: 3;
}
.gildes {
  order: 6;
}
.nasals {
  order: 4;
}
</style>
