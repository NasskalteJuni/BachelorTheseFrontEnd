import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
    path: '/room/:id',
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
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '*',
    component: () => import('../views/SignIn.vue')
  }
];

const router = new VueRouter({
  routes
});

const isAvailableWhenLoggedOut = route => ['SignIn','SignUp','Contact'].indexOf(route.name) >= 0;
const isAvailableWhenLoggedIn = route => ['SignIn', 'SignUp'].indexOf(route.name) === -1;
router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters['isLoggedIn'];
  if (!isLoggedIn && !isAvailableWhenLoggedOut(to)) {
    next({path: '/', replace: true});
  }else if(isLoggedIn && !isAvailableWhenLoggedIn(to)) {
    next({path: '/rooms', replace: true});
  }else if(to.name === 'ConferenceRoom'){
    console.log('entering room', to.params.id);
    await store.dispatch('enter', {id: to.params.id, passwort: to.query.password || ''});
    next();
  }else{
    next();
  }
});

export default router
