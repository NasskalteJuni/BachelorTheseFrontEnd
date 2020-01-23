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


router.beforeEach(async(to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if(to.query.password && to.fullPath.indexOf('room/') >= 0) store.commit('setJoining', {id: to.params.id, password: to.query.password});
  if (to.name && ['SignIn','SignUp','Contact'].indexOf(to.name) === -1 && !isLoggedIn) {
    // while not logged in, trying to access other route than the login, contact and register ones
    return next('/');
  }else if(to.name && ['SignIn','SignUp'].indexOf(to.name) >= 0 && isLoggedIn) {
    // while being logged in, trying to get to the login and register routes
    return next('/rooms');
  }else if(isLoggedIn && to.name === 'ConferenceRoomList' && store.state.joining.id){
    return next('/room/'+store.state.joining.id+'?password='+store.state.joining.password);
  }else if(to.name === 'ConferenceRoom') {
    try {
      //await store.dispatch('enter', to.params.id)
    } catch (err) {
      return next('/rooms');
    }
  }

  // go the given given route target
  next();
});

export default router
