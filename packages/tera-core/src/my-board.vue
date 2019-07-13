<template>
  <div id="boards" extension="true">
    <core-layout>
      <core-nav slot="extension" :title="board.name">
        <div slot="right" style="display:flex;" class="col">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn small flat v-on="on" dark color="black">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile @click="renameBoardDialog = true">
                <v-list-tile-title>Rename Board</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="deleteBoardDialog = true">
                <v-list-tile-title>Delete Board</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </core-nav>
      <v-content class="mb-4">
        <div class="img-grid">
          <div style="position:relative;" v-for="(feature, i) in activities" :key="feature._id">
            <v-menu offset-y absolute>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  icon
                  v-on="on"
                  dark
                  color="black"
                  style="position:absolute;top:0;right:0;z-index:1;"
                >
                  <v-icon dark>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-tile @click="unpin(feature)">
                  <v-list-tile-title>Unpin</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <activity-preview :activity="feature"></activity-preview>
          </div>
        </div>
      </v-content>
    </core-layout>

    <v-dialog v-model="renameBoardDialog" max-width="300px">
      <v-card>
        <v-card-title>Rename Board</v-card-title>
        <v-card-text>
          <v-text-field v-model="newBoardName"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" dark @click="renameBoard">Rename Board</v-btn>
          <v-btn color="primary" flat @click="renameBoardDialog=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteBoardDialog" max-width="300px">
      <v-card>
        <v-card-title>Delete Board</v-card-title>
        <v-card-text>
          <!-- {{board.name}} contains {{board.items.length}} activities. -->
          <br />Are you sure you want to delete this board?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" dark @click="deleteBoard">Delete Board</v-btn>
          <v-btn color="primary" flat @click="deleteBoardDialog=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="5000" :top="true">
      {{ text }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
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

@Component({
  components: {
    ActivityPreview: () => import('tera-core/src/home/activity-preview.vue'),
  },
})
export default class MyBoard extends Vue {
  newBoardName = '';
  renameBoardDialog = false;
  deleteBoardDialog = false;
  snackbar = false;
  get board() {
    return BoardsModule.board.find(this.$route.params.id) as any;
  }
  text = '';

  get boards() {
    return BoardsModule.board.all();
  }

  async unpin(a) {
    await BoardsModule.boardRemoveItemOne({
      id: this.board._id,
      item: a._id,
    });
  }

  get activities() {
    return ActivitiesModule.activity
      .query()
      .whereIdIn(this.board.items)
      .with(['type.domain', 'category', 'subCategory.category'])
      .get();
  }

  async renameBoard() {
    await BoardsModule.boardRenameOne({
      id: this.board._id,
      name: this.newBoardName,
    });

    console.log({ board: this.newBoardName });
    this.newBoardName = '';
    this.renameBoardDialog = false;
  }

  async deleteBoard() {
    await BoardsModule.boardRemove({ id: this.board._id });

    console.log({ board: this.newBoardName });
    this.newBoardName = '';
    this.renameBoardDialog = false;

    this.$router.push('/boards');
  }

  public async beforeRouteEnter(to, from, next) {
    await Promise.all([
      ArticulationsModule.load(),
      ActivitiesModule.load(),
      CategoriesModule.load(),
      DomainsModule.load(),
      StripsModule.load(),
      BoardsModule.load(),
    ]);

    next();
    // next((vm) => {
    //   // const y = BoardsModule.board.find(to.params.id);
    //   //   .query()
    //   //   .where('_id', to.params.id)
    //   //   .first();
    //   // console.log({ y });

    //   vm.board = BoardsModule.board.find(to.params.id);
    //   debugger;
    // });
  }
}
</script>

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
