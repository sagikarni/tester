<template>
    <div>
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
                        <router-link to="/activity/1">
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
        <v-toolbar app fixed clipped-right dark height="58" color="primary">

            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

            <v-btn flat icon color="dark" class="ml-0">
                <v-icon dark>fa fa-chevron-left</v-icon>
            </v-btn>

            <v-menu offset-y content-class="ex-header-menu">
                <v-toolbar-title slot="activator" class="toolbarTitle">locale.general.menuActivities</v-toolbar-title>

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

            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu bottom offset-y left attach>
                    <v-btn slot="activator" flat style="min-width: 48px">
                        <img :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`" width="26px">
                    </v-btn>
                    <v-list light>
                        <v-list-tile avatar v-for="language in languages" :key="language.locale" @click="translateI18n(language.locale)">
                            <v-list-tile-avatar tile size="24px">
                                <img :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`" width="24px" />

                            </v-list-tile-avatar>
                            <v-list-tile-title>{{language.name}}</v-list-tile-title>
                        </v-list-tile>

                    </v-list>
                </v-menu>

                <template v-if="!isAuthenticated">
                    <v-btn v-if="!isAuthenticated" flat to="/login">Login</v-btn>
                    <v-btn v-if="!isAuthenticated" flat to="/register">Register</v-btn>
                </template>

                <v-menu v-else :close-on-content-click="false" :nudge-width="200" offset-y>
                    <v-avatar slot="activator" class="ml-4" size="40">

                        <img v-if="currentUser.picture" :src="currentUser.picture">
                        <img v-else src="http://www.gravatar.com/avatar/?d=identicon">
                    </v-avatar>
                    <v-card>
                        <img v-if="currentUser.picture" :src="currentUser.picture" height="250px" aspect-ratio="2.5">
                        <img v-else height="250px" aspect-ratio="2.5" src="http://www.gravatar.com/avatar/?d=identicon">

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
            </v-toolbar-items>

        </v-toolbar>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Auth } from '@libs/vue-auth';
import { TweenMax, Expo } from 'gsap';

@Component({})
export default class Toolbar extends Vue {
  public languages = [
    {
      name: 'English',
      locale: 'en',
      country: 'us'
    },
    {
      name: 'Español',
      locale: 'es-MX',
      country: 'mx'
    },
    {
      name: 'Português',
      locale: 'pt-BR',
      country: 'br'
    },
    {
      name: 'Русский',
      locale: 'ru',
      country: 'ru'
    },
    {
      name: '简体中文',
      locale: 'zh-Hans',
      country: 'cn'
    },
    {
      name: '한국어',
      locale: 'ko',
      country: 'kr'
    },
    {
      name: '日本語',
      locale: 'ja',
      country: 'jp'
    }
  ];

get currentLanguage() {
    return this.languages.find(l => l.locale === this.$i18n.locale);
}
//    currentLanguage () {
        // return this.languages.find(l => l.locale === this.$i18n.locale)
    //   },

  translateI18n(lang: any) {
    this.$router.replace({ params: { lang } });
    document.cookie = `currentLanguage=${lang};path=/;max-age=${60 * 60 * 24 * 7}` // expires in 7 days
  }

  public drawer: boolean = false;

  @Auth.Getter('isAuthenticated')
  isAuthenticated: any;

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

  constructor() {
    super();
  }
}
</script>
