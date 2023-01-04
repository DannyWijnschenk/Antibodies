<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="navbar-brand" href="#"><img src="./assets/logoUZGent.png" width="126" height="40"/></div>
        <div class="navbar-nav mr-auto">
            <!--<router-link to="/" class="nav-item nav-link">Home</router-link> -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Bevoegdheidsdelegatie</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/delegates" class="dropdown-item">Beheer</router-link>
                <router-link to="/delegateslog" class="dropdown-item">Log</router-link>
                <!--
                <li><hr class="dropdown-divider"></li>
                <router-link to="/mypreferences" class="dropdown-item">Mijn Voorkeuren</router-link>
                -->
              </ul>
           </li>
           <!-- <router-link to="/about" class="nav-item nav-link">Over</router-link> -->
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
    var path = location.pathname;  //e.g. /csp/demo/page.csp
    var pathArray = path.split('/');
    var namespace = 'dvp4';
    for (var i=0;i<pathArray.length;i++) {
      if (pathArray[i].substring(0,8)=='dsa-cla-') {
        namespace = pathArray[i].substring(8);
        break;
      }
      if (pathArray[i].substring(0,6)=='uzgent') {
        namespace = 'uzgent';
        break;
      }
    }

    var protocol = 'https'; ///vepddvp4t.internal.uzgent.be/api/clinicom/dvp4/v1/login
    var port = '';
    var domain = document.domain;
    if ((namespace == 'dvp4') || (namespace == 'td4')) {
      domain = 'vepddvp4t.internal.uzgent.be'
    } else if ((namespace == 'tso') || (namespace == 'trn')) {
      domain = 'clinitest'
    } else if(namespace == 'prd') {
      domain = 'clinicom'
    } else if ((namespace == 'uzgent') || (namespace == 'winfo')) {
      protocol = 'http';
      port = 57772;
      domain = 'localhost';
    }
    ///var url = location.protocol+"//"+document.domain+":"+port+"/api/clinicom/"+namespace
    var url = protocol + '://' + domain + ":" + port + "/api/clinicom/" + namespace
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
