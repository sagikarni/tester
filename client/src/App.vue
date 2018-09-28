<template>
    <div id="app">
        <loading ref="loading"></loading>
        <v-app id="inspire" class="theme-dark">

            <v-navigation-drawer clipped temporary v-model="drawer" app color="red" @transitionend="menuStateChanged">
                <v-list dense>
                    <v-list-tile class="hidden menuItem">
                        <v-list-tile-action>
                            <v-icon>dashboard</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link to="/">
                                <v-list-tile-title>Home</v-list-tile-title>
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile class="hidden menuItem">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link to="/activity-details/1">
                                <v-list-tile-title>Activity Details</v-list-tile-title>
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile class="hidden menuItem">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link to="/about">
                                <v-list-tile-title>About</v-list-tile-title>
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile class="hidden menuItem">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link to="/Search">
                                <v-list-tile-title>Search</v-list-tile-title>
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile class="hidden menuItem">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <router-link to="/slideshow">
                                <v-list-tile-title>SlideShow</v-list-tile-title>
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile class="hidden menuItem" v-for="(item, i) in items" :key="i" v-if="$vuetify.breakpoint.xsOnly">
                        <v-list-tile-action>
                            <v-icon>local_activity</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left color="primary">

                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-menu offset-y content-class="ex-header-menu" v-if="!$vuetify.breakpoint.xsOnly">
                    <v-toolbar-title slot="activator" class="toolbarTitle">{{ $locale.general.menuActivities }}</v-toolbar-title>

                    <v-list v-for="(item, i) in items" :key="i">
                        <v-list-tile>
                            <v-list-tile-title class="bottomColor">
                                <strong>{{ item.title }}</strong>
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile class="activitiesList" v-for="(item1, i) in item.data" :key="i">
                            <v-list-tile-title>{{ item1.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>

                </v-menu>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down" v-if="!isAuthenticated">
                    <v-btn v-if="!isAuthenticated" flat to="/login">Login</v-btn>
                    <v-btn v-if="!isAuthenticated" flat to="/register">Register</v-btn>
                </v-toolbar-items>

                <v-menu v-else :close-on-content-click="false" :nudge-width="200" offset-y>
                    <v-avatar slot="activator" class="ml-4" size=40>

                        <img v-if="currentUser.picture" :src="currentUser.picture">
                        <img v-else src="http://www.gravatar.com/avatar/?d=identicon">
</v-avatar>
                        <v-card>
                            <img v-if="currentUser.picture" :src="currentUser.picture" height="250px"  aspect-ratio="2.5">
                            <img v-else height="250px"  aspect-ratio="2.5" src="http://www.gravatar.com/avatar/?d=identicon">

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">{{currentUser.name}}</h3>
                                    <div v-if="currentUser && currentUser.verified">verified</div>
                                    <div v-else>not verified</div>
                                </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-btn flat color="orange" to="/profile">Profile</v-btn>
                                <v-btn flat color="orange" @click="logout">Log out</v-btn>
                            </v-card-actions>
                        </v-card>
                </v-menu>

            </v-toolbar>

            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
            <error-modal :dialog="showDialog" :message="errorMessage" ref="errorModal"></error-modal>
        </v-app>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import Loading from '@/modules/common/components/loading.vue';
import ErrorModal from '@/modules/common/components/errorModal.vue';
import OrientationUtil from '@/modules/common/utils/orientationUtil';
import { State, Action, namespace } from 'vuex-class';
import { bus, busConstants } from '@/modules/utils/eventBus';
import BaseComponent from '@/modules/common/components/baseComponent.vue';
import TimelineMax from 'gsap';
import { LOGOUT_ACCOUNT } from '@/modules/auth';

const auth = namespace('auth');

@Component({
  components: {
    Loading,
    ErrorModal
  }
})
export default class App extends BaseComponent {
  @auth.Getter('isAuthenticated')
  isAuthenticated: any;
  @auth.Getter('currentUser')
  currentUser: any;

  @auth.Action(LOGOUT_ACCOUNT)
  logoutAccount: any;

  private showDialog = false;
  private errorMessage = '';

  public drawer: boolean = false;

  // TODO Data will come from Mocks/ServerSide
  public items: any = [
    {
      title: 'Collections',
      data: [
        {
          title: 'Premium Collection'
        },
        {
          title: 'Point of View'
        }
      ]
    },
    {
      title: 'Communication',
      data: [
        {
          title: 'Good Story'
        },
        {
          title: 'WH Questions'
        }
      ]
    },
    {
      title: 'Cognition',
      data: [
        {
          title: 'Puzzle'
        },
        {
          title: 'Zoom'
        },
        {
          title: 'Categorization'
        }
      ]
    },
    {
      title: 'Speech',
      data: [
        {
          title: 'Articulation'
        }
      ]
    }
  ];
  @Prop()
  public source!: string;

  public menuStateChanged($event: any) {
    if ($event.propertyName === 'transform') {
      if (this.drawer) {
        TweenMax.staggerFromTo(
          '.hidden',
          1,
          {
            x: '-200px',
            opacity: 0,
            ease: Expo.easeOut,
            scale: '0.8'
          },
          { opacity: 1, x: '0', ease: Expo.easeOut, scale: '1' },
          0.1
        );
      } else {
        TweenMax.set('.hidden', { opacity: 0 });
      }
    }
  }

  @State(state => state.generalGerror)
  public generalGerror?: any;
  @Action('changeReloadActivityDetails')
  public changeReloadActivityDetails?: any;

  public orientationUtil?: any;

  constructor() {
    super();
    this.orientationUtil = new OrientationUtil();
    bus.$on(busConstants.ENTER_FULL_SCREEN, () => {
      this.enterFullScreen();
    });
    bus.$on(busConstants.EXIT_FULL_SCREEN, () => {
      this.exitFullScreen();
    });
  }

  @Watch('generalGerror')
  public onGeneralGerrorChanged(value: any, oldValue: any) {
    const el: any = this.$refs.errorModal;
    this.showDialog = true;
    this.errorMessage = value.message;
    console.log('value', value);
    console.log('errror here?');
    // el.showError(value);
  }

  logout() {

      this.logoutAccount().then(() => this.$router.push('/'));
  }

  @Watch('$route')
  public onPropertyChanged2(value: any, oldValue: any) {
    //   console.log('dddddddddddd');
    // if (
    //   oldValue &&
    //   oldValue.params &&
    //   oldValue.params.activityId &&
    //   (oldValue.path === `/premium-collection/${oldValue.params.activityId}` ||
    //     oldValue.path ===
    //       `/categorization-activity/${oldValue.params.activityId}` ||
    //     oldValue.path === `/memory-activity/${oldValue.params.activityId}` ||
    //     oldValue.path === `/photo-sound/${oldValue.params.activityId}` ||
    //     oldValue.path === `/puzzle-activity/${oldValue.params.activityId}`)
    // ) {
    //   (TimelineMax as any).to('.application--wrap', 0, {
    //     backgroundColor: 'white'
    //   });
    //   this.changeReloadActivityDetails({ status: false }); // No need to reload activities if they are exist
    // }
    // const el: any = this.$refs.loading;
    // el.show();
    // setTimeout(() => {
    //   el.close();
    // }, 1000);
  }
}
</script>

<style lang="scss">
@import './assets/css/styles.scss';
</style>
