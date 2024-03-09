<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary"> <!--testxxxxxx-->
      <a class="navbar-brand" href="#"><img src="./assets/BioStrandLogo.svg" width="200"/></a>
        <div class="navbar-nav mr-auto">
            <!--<router-link to="/" class="nav-item nav-link">Home</router-link> -->
            <router-link to="/similarity" class="nav-item nav-link">Similar Antibodies</router-link>
        </div>
        <div class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-item nav-link">{{getUser()}}<font-awesome-icon icon="fa-solid fa-user" /></router-link>
            </li>
        </div>
    </nav>
  </div>
  <router-view/>
</template>

<script>
export default {
  methods: {
    getUser() {
      return this.$store.getters.user
    }
  },
  mounted() {
    console.log("app is mounted"); //was : http://localhost:57772/api/clinicom/dvp4 
    var namespace = 'user';
    var port = '80';
    var domain = 'iris-demo.biostrand.cloud';
    var url = location.protocol+"//"+domain+":"+port+"/api/"+namespace
    console.log("environment",process.env.NODE_ENV)
    this.$store.dispatch('setServer',url);
    console.log("server is set to ",url)
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-active {
    color: #42b983;
    background: rgb(34, 79, 239);
    border-radius: .5rem;
}
</style>
