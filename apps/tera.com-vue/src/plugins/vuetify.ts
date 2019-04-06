import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  theme: {
    themes: {
      light: {
        primary: '#1867c0',
        secondary: '#5CBBF6',
        tertiary: '#E57373',
        accent: '#005CAF',
      },
    },
  },
});
