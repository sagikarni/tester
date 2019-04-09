<template>
  <v-footer id="footer" class="py-4" color="primary" dark height="auto">
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 md5>
          <v-card dark color="transparent" class="elevation-0">
            <v-card-title primary class="title">{{$t('Vuetify.Footer.header')}}</v-card-title>
            <v-card-text>{{$t('Vuetify.Footer.headerText')}}</v-card-text>
          </v-card>
        </v-flex>

        <v-spacer/>

        <v-layout d-flex wrap :column="$vuetify.breakpoint.xs">
          <v-flex v-for="(col, i) in links" :key="i" xs12>
            <v-card dark color="transparent" class="elevation-0">
              <v-card-title primary class="title" v-text="col.header"/>
              <v-card-text>
                <div v-for="(child, i) in col.children" :key="i" class="mb-3">
                  <div v-if="!child.url" v-text="child.text"/>
                  <a v-else v-text="child.text" :to="child.url" class="white--text"/>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-flex d-flex xs12>
          <v-layout row wrap :justify-end="$vuetify.breakpoint.mdAndUp" class="mb-4">
            <v-btn
              fab
              flat
              color="white"
              v-for="social in socials"
              :key="social.icon"
              icon
              class="white--text"
            >
              <v-icon size="24px">{{ social.icon }}</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <v-flex d-flex xs12>
          <v-layout row wrap class="mb-4">
            <v-flex xs12 sm5>
              <div class="mr-2 my-2">Copyright &copy; {{ (new Date()).getFullYear() }} via-cards.com</div>
            </v-flex>

            <v-spacer/>

            <v-layout :justify-end="$vuetify.breakpoint.smAndUp" :column="$vuetify.breakpoint.xs">
              <a href="/" class="white--text text-right mr-3 my-2">Privacy Policy</a>
              <a href="/" class="white--text text-right mr-3 my-2">Teams of Use</a>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  computed: {
    links() {
      return this.$t('Vuetify.Footer.links');
    },
  },
  data: () => ({
    email: '',
    socials: [
      {
        icon: 'fab fa-linkedin',
        href: 'https://github.com/vuetifyjs/vuetify',
        title: 'Github',
      },
      {
        icon: 'fab fa-twitter',
        href: 'https://twitter.com/vuetifyjs',
        title: 'Twitter',
      },
      {
        icon: 'fab fa-facebook',
        href: 'https://www.facebook.com/vuetifyjs',
        title: 'Facebook',
      },
      {
        icon: 'fab fa-google',
        href: 'https://community.vuetifyjs.com',
        title: 'Discord Community',
      },
    ],
  }),
};
</script>

<style lang="scss">
.links {
  display: flex;
  > div:last-child {
    flex-grow: 1;
  }
}
</style>
<style lang="sass">

#footer
  a
    opacity: .8
    text-decoration: none
    &:hover
      color: #FFF
      opacity: 1
  .v-text-field--rounded
    margin-bottom: 16px
    .v-input__slot
      border-radius: 28px
    .v-text-field__slot,
    .v-label
      padding-left: 8px
    .v-btn
      margin: 0
      border-top-right-radius: 28px
      border-bottom-right-radius: 28px
      box-shadow: none
      height: 48px
      margin-right: -12px
      padding-top: 2px
</style>