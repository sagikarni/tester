<template>
  <core-layout id="activity-details">
    <v-content>
      <v-container class="pa-0" style="max-width:1024px;">
        <v-card flat class="pa-0 mb-4">
          <preview :activity="activity"></preview>

          <div class="nav-container">
            <v-flex order-xs3 order-sm1 d-flex>
              <div class="item item--1">
                <span>Category</span>
                <span>{{category}}</span>
              </div>
              <div class="item item--2">
                <span>Sub Category</span>
                <span>{{subCategory}}</span>
              </div>
              <div class="item item--3">
                <span>Slides</span>
                <span>{{slidesCount}}</span>
              </div>
            </v-flex>
            <div v-if="$vuetify.breakpoint.mdAndUp" style="flex-grow: 1;order:2;"></div>
            <v-flex order-xs1 order-sm3 d-flex>
              <a @click.prevent="pinDialog = true" class="item item--4">
                <v-icon>favorite</v-icon>
                <span>Pin</span>
              </a>
              <a @click.prevent="shareDialog = true" class="item item--5">
                <v-icon>print</v-icon>
                <span>Print</span>
              </a>
              <a @click.prevent="shareDialog = true" class="item item--6">
                <v-icon>share</v-icon>
                <span>Share</span>
              </a>
            </v-flex>
          </div>
        </v-card>

        <h3 class="mx-2 title mb-3">What's Inside?</h3>

        <div class="img-grid mb-4">
          <v-card flat tile class="d-flex" v-for="(thumbnail, i) in thumbnails" :key="i">
            <v-img :src="thumbnail" aspect-ratio="1.6"></v-img>
          </v-card>
        </div>
      </v-container>
    </v-content>
    <v-dialog
      v-model="pinDialog"
      :width="pinDialogWidth"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-toolbar-title>Select a board</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat v-if="!$vuetify.breakpoint.smAndDown" @click="newBoardDialog = true">
              <v-icon>add</v-icon>Add Board
            </v-btn>
            <v-btn icon dark @click="pinDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-list v-if="boards.length">
            <template v-for="(board, index) in boards">
              <v-list-tile :key="board" @click="addToBoard(board)">
                <v-list-tile-content>
                  <v-list-tile-title>{{board}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="index"></v-divider>
            </template>
          </v-list>
          <div v-else>No board to present</div>
        </v-card-text>
        <v-card-text style="height: 100px; position: relative" v-if="$vuetify.breakpoint.smAndDown">
          <v-btn absolute dark fab top right color="pink" @click="newBoardDialog = true">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="shareDialog" width="300">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Share this activity</v-card-title>

        <v-card-text>
          <v-layout align-center>
            <v-btn fab dark color="blue darken-4" @click="shareOnFacebook" href="/" target="_blank">
              <v-icon left dark>fab fa-facebook-f</v-icon>
            </v-btn>
            <v-btn fab dark color="blue lighten-3" @click="shareOnTwitter" href="/" target="_blank">
              <v-icon left dark>fab fa-twitter</v-icon>
            </v-btn>
            <v-btn fab dark color="blue darken-1" @click="shareOnLinkedin" href="/" target="_blank">
              <v-icon left dark>fab fa-linkedin-in</v-icon>
            </v-btn>
          </v-layout>
          <v-layout>
            <h4>Link:</h4>
            <input id="testing-code" readonly style="border:1px solid #000;" v-model="url" />
          </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-3" @click="copyTestingCode" dark>Copy Link</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogLogin" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Pin Activity</v-card-title>
        <v-card-text>In order to pin an activity you need to login first.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialogLogin = false" to="/login">Login</v-btn>
          <v-btn color="green darken-1" flat @click="dialogLogin = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </core-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
    Preview: () => import('./preview.vue'),
  },
})
export default class ActivityDetails extends Vue {
  @Prop() activity;
  snackbar = false;
  text = '';
  dialogLogin = false;
  newBoard = '';
  newBoardDialog = false;

  addBoard() {
    console.log({ board: this.newBoard });
    this.newBoard = '';
    this.newBoardDialog = false;
  }

  addToBoard(board) {
    this.text = 'add !!';
    this.pinDialog = false;
    this.snackbar = true;
  }

  get pinDialogWidth() {
    return this.$vuetify.breakpoint.mdAndUp ? 500 : 1000;
  }
  boards = ['My board1', 'My board2', 'My board3'];

  shareOnTwitter(e) {
    const url = `https://twitter.com/intent/tweet?text=Onboarding%20CMP%20-%20ShareThis&url=https%3A%2F%2Fwww.sharethis.com%2F`;
    e.currentTarget.setAttribute('href', url);
  }

  shareOnFacebook(e) {
    const url = `https://www.facebook.com/sharer.php?t=Onboarding%20CMP%20-%20ShareThis&u=https%3A%2F%2Fwww.sharethis.com%2F`;
    e.currentTarget.setAttribute('href', url);
  }

  shareOnLinkedin(e) {
    const url = `https://www.facebook.com/sharer.php?t=Onboarding%20CMP%20-%20ShareThis&u=https%3A%2F%2Fwww.sharethis.com%2F`;
    e.currentTarget.setAttribute('href', url);
  }

  url = window.location.href;

  shareDialog = false;
  pinDialog = false;

  get thumbnails() {
    return this.activity.metadata.slides
      .map((s) =>
        s.media.map(
          (ss) =>
            `/storage/${this.activity.type.domain.name}/${this.activity.type.name}/${this.activity._id}/thumbnails/${ss.name}`
        )
      )
      .flat();
  }

  get category() {
    return this.activity.category.name;
  }

  get subCategory() {
    return this.activity.subCategory.name;
  }

  get slidesCount() {
    return this.activity.metadata.slides.length;
  }

  copyTestingCode() {
    let testingCodeToCopy = document.querySelector('#testing-code');
    // testingCodeToCopy.setAttribute('type', 'text');
    (testingCodeToCopy as any).select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert('Testing code was copied ' + msg);
    } catch (err) {
      alert('Oops, unable to copy');
    }

    /* unselect the range */
    // testingCodeToCopy.setAttribute('type', 'hidden');
    window.getSelection().removeAllRanges();
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  text-align: center;

  .item {
    flex: 1;
    width: 100px;

    > span:first-child {
      color: #888;
    }
  }
  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .item {
    padding: 10px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

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
</style>
