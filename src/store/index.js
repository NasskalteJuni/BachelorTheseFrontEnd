import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import router from '../router/'
import http from '../plugins/axios'
import state from './state.js';
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex);


const options = {
  state,
  getters,
  mutations,
  actions,
  modules: {},
  plugins: [new VuexPersistence({storage: window.sessionStorage}).plugin]
};

const store = new Vuex.Store(options);

// fetch logic -> change view or state on not authenticated
http.interceptors.response.use(res => res.data, error => {
  console.error(error);
  if(error && !error.response){
    error.message = 'Verbindung gescheitert';
    return Promise.reject(error);
  }else if(error.response.status === 403){
    store.commit('setCurrentUser', {});
    return router.push('/');
  }else{
    error.message = error.response.statusText;
    return Promise.reject(error);
  }
});

export default store;
