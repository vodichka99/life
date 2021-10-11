<template>
  <div id="nav">
    <router-link to="/">LIFE</router-link>
    <!-- <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>

<style lang="scss">
body{
  background: rgb(19, 19, 19);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

#nav {
  padding: 30px;

  a {
    font-weight: 300;
    color: white;
    font-size: 25px;
    text-decoration: none;
    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
