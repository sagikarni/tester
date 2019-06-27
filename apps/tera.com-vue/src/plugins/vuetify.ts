import Vue from 'vue';
import Vuetify from 'vuetify';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';

// import 'vuetify/dist/vuetify.min.css';
// import 'vuetify/src/stylus/app.styl';

import '../style-x.styl';

Vue.use(Vuetify, {
  // iconfont: 'mdi',

  breakpoint: {
    thresholds: {
      xs: 576,
      sm: 768,
      md: 1024 + 16,
      lg: 1400 + 16,
    },
    scrollbarWidth: 16,
  },
  theme: {
    primary: '#363636',
    // secondary: '#29B6F6',
    // anyColor: '#0000',
  },
});
