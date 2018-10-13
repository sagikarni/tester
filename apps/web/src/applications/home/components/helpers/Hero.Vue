<template>
  <v-card flat color="white">
    <v-container pa-5>
      <v-layout
        align-center
        justify-center
      >
        <v-img
          class="shrink mr-5"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          height="216"
          width="216"
        />
        <div>
          <v-display-2 class="mono font-weight-light mb-4">
            Supercharge your <br>development
          </v-display-2>
          <v-layout>
            <v-btn
              color="primary"
              depressed
              large
              round
              to="/quick-start/why-vuetify"
            >
              Why Vuetify?
            </v-btn>
            <v-btn
              color="primary"
              outline
              large
              round
              to="/getting-started/why-vuetify"
            >
              Get Started
            </v-btn>
            <v-btn
              class="grey--text"
              color="grey lighten-3"
              depressed
              large
              href="https://github.com/vuetifyjs/vuetify"
              rel="noopener"
              round
              target="_blank"
            >
              <v-icon
                large
                left
              >
                mdi-github-circle
              </v-icon>
              Github
            </v-btn>
          </v-layout>
        </div>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style lang="stylus" scoped>
  .display-2
    line-height: 1.3
</style>