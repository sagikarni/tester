import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if `hidden: true`, this route will not show in the sidebar (default is false)
    alwaysShow: true             if set to true, it will always show the root menu
                                 if not set, only show with nested mode if there are more than one route under its children
  }
*/

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    },
    {
      path: '/',
      component: Layout,
      // redirect: '/dashboard',
      name: 'Activities',
      meta: { title: 'Activities', icon: 'nested' },
      children: [
        {
          meta: {
           // title: 'Activities',
            children: false,
            hidden: true,
          },
          name: 'dashboard',
          path: 'dashboard',
          component: () =>
            import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
          // meta: { hidden: true },
          children: [
            {
              path: '',
              name: 'index-activity',
              component: () =>
                import(/* webpackChunkName: "index-activity" */ '@/views/dashboard/components/index.vue'),
            },
            {
              path: 'add',
              name: 'add-activity',
              component: () =>
                import(/* webpackChunkName: "add-activity" */ '@/views/dashboard/components/add.vue'),
            },
            {
              path: ':activity',
              name: 'view-activity',
              component: () =>
                import(/* webpackChunkName: "view-activity" */ '@/views/dashboard/components/detail.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/recommendations',
      component: Layout,
      name: 'Recommendations',
      meta: { title: '', icon: 'nested' },
      children: [
        {
          path: '',
          component: () =>
            import(/* webpackChunkName: "recommendations" */ '@/views/recommendations/index.vue'),
          name: 'Recommendations',
          meta: { title: 'Recommendations' },
        },
      ],
    },
    {
      path: '/categories',
      component: Layout,
      // redirect: '/categories/menu1',
      name: 'Categories',
      meta: { title: '', icon: 'nested' },
      children: [
        {
          path: '',
          component: () =>
            import(/* webpackChunkName: "categories" */ '@/views/categories/index.vue'),
          name: 'Categories',
          meta: { title: 'Categories' },
        },
      ],
    },
    { path: '*', redirect: '/404' },
  ],
});
