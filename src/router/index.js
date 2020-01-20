import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/room',
    name: 'ConferenceRoom',
    component: () => import('../views/ConferenceRoom.vue')
  },
  {
    path: '/create',
    name: 'ConferenceRoomCreation',
    component: () => import('../views/ConferenceRoomCreation.vue')
  },
  {
    path: '/rooms',
    name: 'ConferenceRoomList',
    component: () => import('../views/ConferenceRoomList.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router
