<template>
  <div class="home">

    {{ currentUser }}

    <div v-if="!isAuthenticated">
      <router-link to="/login" class="btn btn-link">Login</router-link>
    </div>

    <br><br>
    <router-link to="/register" class="btn btn-link">Register</router-link>

    <v-btn @click="secure">Secure</v-btn>

    <br><br><br><br>

    <v-card  v-for="(activity, index) in activities" :key="index">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="orange" :to="`/activity/${activity.name}`">Start</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Auth } from '@libs/vue-auth';

@Component({})
export default class Home extends Vue {
  @Auth.Getter('isAuthenticated')
  isAuthenticated: any;
  @Auth.Getter('currentUser')
  currentUser: any;

  public activities = [
    { name: 'single-photo' }
  ]

  public secure() {
    this.$http.get('/api/v1/secure').then(
      (response: any) => {
        console.log('res: ', response);
      },
      (err: any) => {
        console.log('err: ', err);
      }
    );
  }
}
</script>
