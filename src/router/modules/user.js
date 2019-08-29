import layout from '@/views/layout/index';

const router = {
  path: '/user',
  component: layout,
  name: 'user',
  redirect: 'profile',
  children: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/registration')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/resetPassword')
    },
    {
      path: 'profile',
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/profile'),
      name: 'userProfile',
      meta: {
        private: true
      }
    }
  ]
};
export default router;
