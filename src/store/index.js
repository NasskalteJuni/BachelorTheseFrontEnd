import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import router from '../router/'
import http from '../plugins/axios'

export default new Vuex.Store({
  state: {
    user: {},
    room: {},
    rooms: [],
    tokens: {
      csrf: "",
    },
    joining: {},
  },
  getters: {
    isLoggedIn(state){
      return state.user && state.user.id;
    }
  },
  mutations: {
    setCurrentUser(state, user){
      state.user = user;
    },
    setRooms(state, lobbies){
      state.rooms = lobbies;
    },
    setCurrentRoom(state, room){
      state.room = room;
    },
    setCSRFToken(state, token){
      state.token = token;
    },
    setJoining(state, target){
      state.joining = target;
    }
  },
  actions: {
    async login({commit},credentials) {
      // const sessionData = await this.$http.post('/auth/login', credentials);
      const sessionData = {user: {id: 'bar5678', name: credentials.username, lastLogin: new Date().toISOString()}, csrf: '123456'} ;
      commit('setCurrentUser', sessionData.user);
      commit('setCSRFToken', sessionData.csrf);
      await router.push('/rooms')
    },
    async logout({commit}){
      // await http.post('/auth/logout');
      commit('setCSRFToken', null);
      commit('setCurrentUser', null);
      await router.push('/');
    },
    async register(){
      // await http.post('/auth/register', user);
      await router.push('/');
    },
    async unregister(){
      await http.post('/auth/unregister');
      await router.push('/');
    },
    async enter({commit}, {id, password}){
      // const room = await this.$http.post('/room/'+id+'/enter', {password});
      const room = {id, name: 'foobar', password};
      commit('setCurrentRoom', room);
    },
    async leave({commit}){
      //await http.post('/room/'+state.room.id+'/leave');
      commit('setCurrentRoom', null);
      await router.push('/rooms');
    },
    async changePassword({state},{password}){
      await http.put('/user/'+state.user.id, {password});
    },
    async getRooms({commit}){
      // const rooms = await http.get('/rooms)
      const rooms = Array.from({length: 10}, (v,i) => ({name: 'test-room-#'+i, id: i}));
      commit('setRooms', rooms);
    },
  },
  modules: {}
})
