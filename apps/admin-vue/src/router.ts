import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      children: [
        {
          path: 'recommendations',
          name: 'recommendations',
          component: () =>
            import(
              /* webpackChunkName: "recommendations" */ './views/Recommendations.vue'
            ),
        },
        {
          path: 'categories',
          name: 'categories',
          component: () =>
            import(
              /* webpackChunkName: "categories" */ './views/Categories.vue'
            ),
        },
        {
          path: 'articulations',
          name: 'articulations',
          component: () =>
            import(
              /* webpackChunkName: "articulation" */ './views/Articulation.vue'
            ),
          children: [
            {
              path: '',
              name: 'index-articulation',
              component: () =>
                import(
                  /* webpackChunkName: "index-articulation" */ './views/articulation/components/index.vue'
                ),
            },
            {
              path: ':articulation',
              name: 'view-articulation',
              component: () =>
                import(
                  /* webpackChunkName: "view-articulation" */ './views/articulation/components/detail.vue'
                ),
            },
          ],
        },
        {
          path: 'activities',
          name: 'activities',
          component: () =>
            import(
              /* webpackChunkName: "activities" */ './views/Activities.vue'
            ),
          children: [
            {
              path: '',
              name: 'index-activity',
              component: () =>
                import(
                  /* webpackChunkName: "index-activity" */ './views/dashboard/components/index.vue'
                ),
            },
            {
              path: 'add',
              name: 'add-activity',
              component: () =>
                import(
                  /* webpackChunkName: "add-activity" */ './views/dashboard/components/add.vue'
                ),
            },
            {
              path: ':activity',
              name: 'view-activity',
              component: () =>
                import(
                  /* webpackChunkName: "view-activity" */ './views/dashboard/components/detail.vue'
                ),
            },
          ],
        },
      ],
    },
  ],
});
