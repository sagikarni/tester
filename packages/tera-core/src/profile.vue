<template>
  <div id="profile">
    <core-layout>
      <core-nav title="My Settings"></core-nav>
      <v-content>
        <v-container>
          <v-layout>
            <v-flex>
              <div class="box">
                <h2>Logins</h2>
                <div>
                  <strong>Cognishie Account</strong>
                </div>
              </div>

              <div class="box">
                <h2>Preferences</h2>
                <div>
                  <strong>Cognishie Account</strong>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </core-layout>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { ActivitiesModule } from './store/activities.module';
import { CategoriesModule } from './store/categories.module';
import { DomainsModule } from './store/domains.module';
import { AppModule } from './store/app';
import { StripsModule } from './store/strips.module';
import { ArticulationsModule } from './store/articulations.module';
import { BoardsModule } from './store/boards.module';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({})
export default class Profile extends Vue {
  public async beforeRouteEnter(to, from, next) {
    // await Promise.all([
    //   ArticulationsModule.load(),
    //   ActivitiesModule.load(),
    //   CategoriesModule.load(),
    //   DomainsModule.load(),
    //   StripsModule.load(),
    //   BoardsModule.load(),
    // ]);

    next();
  }
}
</script>

<style lang="scss" scoped>
.box {
  background: #fff;
  h2 {
    padding: 20px;
  }
}
</style>
