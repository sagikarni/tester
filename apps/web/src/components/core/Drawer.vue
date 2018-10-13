<template>
    <v-navigation-drawer app v-model="inputValue" :stateless="isFullscreen">
        <v-list dense expand>
            <template v-for="item in items">
                <v-list-group v-if="item.items" :group="item.group" :prepend-icon="item.icon" no-action>
                    <v-list-tile slot="activator" ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <template v-for="(subItem, i) in item.items">
                        <!--sub group-->
                        <v-list-group v-if="subItem.items" :group="subItem.group" sub-group>
                            <v-list-tile slot="activator" ripple="ripple">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile v-for="(grand, i) in subItem.items" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-chip class="white--text pa-0 v-chip--x-small" v-if="grand.badge" :color="grand.color || 'primary'" disabled>{{ grand.badge }}</v-chip>
                            </v-list-tile>
                        </v-list-group>
                        <!--child item-->
                        <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple>
                            <v-list-tile-content>
                                <v-list-tile-title><span>{{ subItem.title }}</span></v-list-tile-title>
                            </v-list-tile-content>
                            <v-chip class="white--text pa-0 v-chip--x-small" v-if="subItem.badge" :color="subItem.color || 'primary'">{{ subItem.badge }}</v-chip>
                            <v-list-tile-action v-if="subItem.action">
                                <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-list-group>
                <v-subheader class="grey--text" v-else-if="item.header">{{ item.header }}</v-subheader>
                <v-divider v-else-if="item.divider"></v-divider>
                <!--top-level link-->
                <v-list-tile v-else :to="!item.href ? { name: item.name } : null" :href="item.href" ripple :disabled="item.disabled" :target="item.target" rel="noopener">
                    <v-list-tile-action v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-chip class="white--text pa-0 v-chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled>{{ item.badge }}</v-chip>
                    <v-list-tile-action v-if="item.subAction">
                        <v-icon class="success--text">{{ item.subAction }}</v-icon>
                    </v-list-tile-action>
                    <v-chip class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label small>{{ item.chip }}</v-chip>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Auth } from '@libs/vue-auth';
import { TweenMax, Expo } from 'gsap';
import { App, DRAWER } from '@libs/tera-store';
import appDrawerItems from '@/data/layout/app-drawer-items';
import { camel } from '@/util/helpers';

@Component({})
export default class Toolbar extends Vue {
  @App.Getter('isFullscreen')
  isFullscreen: any;
  @App.Getter('appDrawer')
  appDrawer: any;

@App.Action(DRAWER) drawer: any;

  items = appDrawerItems;

  get inputValue() {
    console.log('in input get');
    return this.appDrawer && !this.isFullscreen;
  }

  set inputValue(val: any) {
      console.log({ val });
      this.$store.dispatch('app/DRAWER', val);
      //this.drawer(val);
  }

  //   set inputValue(val) {
  //     console.log('in input set');
  //     // this.drawer(val);
  //   }

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
    document.cookie = `currentLanguage=${lang};path=/;max-age=${60 *
      60 *
      24 *
      7}`; // expires in 7 days
  }

  @Auth.Getter('isAuthenticated')
  isAuthenticated: any;
  genChildTarget(item: any, subItem: any) {
    if (subItem.href) return;
    if (
      item.component &&
      // Quick and dirty fix
      subItem.name !== 'api-explorer'
    ) {
      return {
        name: item.component,
        params: {
          section: item.group,
          component: subItem.name
        }
      };
    }
    return { name: `${item.group}/${camel(subItem.name)}` };
  }

  //   public items: any = [
  //     {
  //       title: 'Collections',
  //       data: [
  //         {
  //           title: 'Premium Collection'
  //         },
  //         {
  //           title: 'Point of View'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Communication',
  //       data: [
  //         {
  //           title: 'Good Story'
  //         },
  //         {
  //           title: 'WH Questions'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Cognition',
  //       data: [
  //         {
  //           title: 'Puzzle'
  //         },
  //         {
  //           title: 'Zoom'
  //         },
  //         {
  //           title: 'Categorization'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Speech',
  //       data: [
  //         {
  //           title: 'Articulation'
  //         }
  //       ]
  //     }
  //   ];

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
