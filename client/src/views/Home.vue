<template>
  <div>
    <v-flex>

      {{ currentUser }}

      <div v-if="!isAuthenticated">
        <router-link to="/login" class="btn btn-link">Login</router-link>
      </div>

      <br><br>
      <router-link to="/register" class="btn btn-link">Register</router-link>

      <v-switch :label="`Highest Quality`" v-model="quality"></v-switch>
      <v-switch :label="`Open Activity in Full Screen`" v-model="isFullScreen"></v-switch>

      <v-btn @click="secure">Secure</v-btn>

      <v-btn @click="$router.push('activity-details/1')">Premium - single photo</v-btn>
      <v-btn @click="$router.push('activity-details/2')">Premium - 2 horizontal photos</v-btn>
      <v-btn @click="$router.push('activity-details/3')">Premium - 2 vertical photo</v-btn>
      <v-btn @click="$router.push('activity-details/4')">Premium - Four photos</v-btn>
      <v-btn @click="$router.push('activity-details/10')">Premium - Video</v-btn>
      <v-btn @click="$router.push('activity-details/11')">Meaning - Photo</v-btn>
      <v-btn @click="$router.push('activity-details/12')">What in The Picture</v-btn>

      <v-btn @click="$router.push('activity-details/13')">Categorization</v-btn>
      <v-btn @click="$router.push('activity-details/14')">Puzzle</v-btn>
      <v-btn @click="$router.push('activity-details/15')">Zoom</v-btn>
      <v-btn @click="$router.push('activity-details/16')">Memory</v-btn>
      <v-btn @click="$router.push('activity-details/17')">Wh question photo</v-btn>

      <v-btn @click="$router.push('activity-details/100')">Premium - Server Error</v-btn>
      <v-btn @click="$router.push('activity-details/101')">Premium - Not Found</v-btn>

      <v-btn @click="$router.push('activity-details/101')">shlomi</v-btn>
      <v-btn @click="$router.push('activity-details/19')">Sounds and Photos</v-btn>
      <v-btn @click="$router.push('activity-details/18')">Wh-Video</v-btn>
      <v-btn @click="$router.push('activity-details/22')">What in The Video</v-btn>

      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
      <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>

      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
      <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>

      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
      <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
      <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>

      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 sm5 d-flex>

          </v-flex>
          <v-flex xs12 sm2 d-flex style="font-size:18px">
            Puzzle
          </v-flex>
          <v-flex xs12 sm2 d-flex>

          </v-flex>
          <v-flex xs12 sm3 d-flex>
            ____ Sort By: Popularity
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
          <v-flex xs12 sm2 d-flex>
            <v-select label="Activity" :items="['Puzzle' , 'Memory' , 'Categorization']"></v-select>
          </v-flex>

          <v-flex xs12 sm2 d-flex>
            <v-select label="Media" :items="['All' , 'Photos' , 'Videos']"></v-select>
          </v-flex>

          <v-flex xs12 sm2 d-flex>
            <v-select box label="Ages" :items="['All' , 'Children']"></v-select>
          </v-flex>

          <v-flex xs12 sm3 d-flex>
            <v-select label="Category" :items="['All' , 'Category 1' ,  'Category 2',  'Category 4']" outline></v-select>
          </v-flex>

          <v-flex xs12 sm3 d-flex>
            <v-select label="Sub Category" :items="['All' , 'Sub Category 1' ,  'Sub Category 2',  'Sub Category 4']" outline></v-select>
          </v-flex>

        </v-layout>
      </v-container>

    </v-flex>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>
    <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    <video src="  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>  <br>"></video>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace, Action } from 'vuex-class';

const auth = namespace('auth');

@Component
export default class Home extends Vue {
  @auth.Getter('isAuthenticated')
  isAuthenticated: any;
  @auth.Getter('currentUser')
  currentUser: any;

  @Action('changeMediaQuality')
  public changeMediaQuality?: any;
  @Action('changeFullScreen')
  public changeFullScreen?: any;

  public quality?: boolean = false;
  public isFullScreen?: boolean = false;

  @Watch('quality')
  public onPropertyChanged(value: boolean, oldValue: boolean) {
    this.changeMediaQuality({ isHDMedia: value });
  }

  @Watch('isFullScreen')
  public onPropertyChanged1(value: boolean, oldValue: boolean) {
    this.changeFullScreen({ isFullScreen: value });
  }

  public secure() {
    (this.$http as any)
      .get('/api/v1/secure')
      .then((response: any) => {
        console.log('res: ', response);
      })
      .catch((err: any) => {
        console.log('err: ', err);
      });
  }
}
</script>
<style scoped lang="scss">
.object-fit_contain {
  object-fit: contain;
}
.full-height {
  height: 100%;
  background: #f8f8f8;
}

.table {
  display: table;
  width: 100%;

  background: transparent !important;
}
.cell {
  display: table-cell;
  vertical-align: top;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>