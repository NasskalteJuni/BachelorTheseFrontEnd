<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <router-link to="/login">Log In</router-link> |
      <router-link to="/register">Sign Up</router-link>
      <router-link to="/">Sign out</router-link>
      <router-link to="/">Account</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
