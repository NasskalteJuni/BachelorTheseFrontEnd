<template>
  <v-app :style="background">
    <v-app-bar
      app
      color="primary"
      dark
      class="d-flex align-left">
        <v-responsive :aspect-ratio="1" :contain="true" :max-height="60" :max-width="60">
          <v-img src="Icon.png" :max-height="60" :max-width="60"/>
        </v-responsive>
        <v-toolbar-title class="text-uppercase font-weight-regular ml-2 title" id="headline">WebRTC Example Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon v-if="!$store.getters.isLoggedIn" @click="$router.push('/')">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon v-if="!$store.getters.isLoggedIn" @click="$router.push('/signup')">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn icon v-if="$store.getters.isLoggedIn" @click="$router.push('/account')">
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon v-if="$store.getters.isLoggedIn" @click="$store.dispatch('logout')">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-content id="app-content-view">
      <Main/>
    </v-content>
    <v-footer class="transparent v-footer--fixed bottom-aligned font-weight-thin ma-0 pa-1">
        <small>
            <router-link to="/contact" v-if="$route.fullPath !== '/contact'">Impressum</router-link>
        </small>
    </v-footer>
  </v-app>
</template>

<script>
import Main from './components/Main.vue';

export default {
  name: 'App',
  components: {
    Main
  },
  data(){
      return {}
  },
  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    background(){
      return 'background: '+(this.$vuetify.theme.themes[this.theme].background || '#FFF')+';';
    },
    font(){
      return 'font: '+(this.$vuetify.theme.themes[this.theme].font || '#000')+';'
    }
  },
  mounted(){
      window.addEventListener('beforeunload', () => {
          if(this.$store.getters.isLoggedIn) this.$store.dispatch('logout');
          window.localStorage.removeItem('vuex');
      })
  }
};
</script>

<style>
  html, body{
    overflow: hidden !important;
    height: 100%;
    min-height: 100vh;
  }

  #headline{

  }

  #app-content-view{
      background: url("../public/talking.png") repeat;
  }

  .v-toolbar__content{
      width: 100%;
      min-width: 100vw;
  }

  .bottom-aligned{
      position: fixed;
      bottom: 0;
      right: 0;
      font-size: 0.8em;
  }
</style>