import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    lobby: {},
    lobbies: [],
    tokens: {
      csrf: "",
    }
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
    setLobbies(state, lobbies){
      state.lobbies = lobbies;
    },
    setCurrentLobby(state, lobby){
      state.lobby = lobby;
    },
    setCSRFToken(state, token){
      state.token = token;
    }
  },
  actions: {
    login(username, password){
      return {username, password};
    }
  },
  modules: {
  }
})
