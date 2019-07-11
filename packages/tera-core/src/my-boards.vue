<template>
  <div id="boards" extension="true">
    <core-layout>
      <core-nav slot="extension" title="My Boards">
        <v-btn slot="right" @click="newBoardDialog = true">Add Board</v-btn>
      </core-nav>
      <v-content>
        <v-container>
          <v-layout>
            <v-flex>
              <v-list v-if="boards.length">
                <template v-for="(board, index) in boards">
                  <v-list-tile :key="board.name" :to="`/boards/${board._id}`">
                    <v-list-tile-content>
                      <v-list-tile-title style="display:flex;justify-content:space-between">
                        <span>{{board.name}}</span>
                        <span>{{board.items.length}}</span>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider :key="index"></v-divider>
                </template>
              </v-list>
              <div v-else>No board to present</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </core-layout>

    <v-dialog v-model="newBoardDialog" max-width="300px">
      <v-card>
        <v-card-title>Add Board</v-card-title>
        <v-card-text>
          <v-text-field v-model="newBoard"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" dark @click="addBoard">Add Board</v-btn>
          <v-btn color="primary" flat @click="newBoardDialog=false">Cancel</v-btn>
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

@Component({})
export default class MyBoards extends Vue {
  newBoard = '';
  newBoardDialog = false;
  snackbar = false;
  text = '';

  get boards() {
    return BoardsModule.board
      .query()
      .with('items')
      .get();
  }

  async addBoard() {
    await BoardsModule.boardCreateOne({ name: this.newBoard });
 
    this.text = `${this.newBoard} board create!.`;
    this.snackbar = true;

    console.log({ board: this.newBoard });
    this.newBoard = '';
    this.newBoardDialog = false;
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
  }
}
</script>

<style lang="scss" scoped>
</style>
