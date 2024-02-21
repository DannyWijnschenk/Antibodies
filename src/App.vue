<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary"> <!--testxxxxxx-->
      <a class="navbar-brand" href="#">&nbsp;Users</a>
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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ordervalidatie</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/caregivers/ordervalidation" class="dropdown-item">Beheer Zorgverleners</router-link>
                <router-link v-if="false" to="/ordervalidatie" class="dropdown-item">Ordervalidatie</router-link>
              </ul>
           </li>
            <router-link to="/about" class="nav-item nav-link">About</router-link>
            <router-link to="/wordmergefield" class="nav-item nav-link">MergeField</router-link>
            <router-link to="/wordquery" class="nav-item nav-link">QueryDefinition</router-link>
            <router-link to="/wordabbreviation" class="nav-item nav-link">Abbreviation</router-link>


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

//TODO : Instellingen : use pagesize in grids
//TODO : button in grid search user : btn-outline
//TODO : menu depending of access rights logged in user
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
    var namespace = 'winfo';
    for (var i=0;i<pathArray.length;i++) {
      if (pathArray[i].substring(0,8)=='dsa-cla-') {
        namespace = pathArray[i].substring(8);
        break;
      }
      if (pathArray[i].substring(0,6)=='uzgent') {  //development local server Ivan
        namespace = pathArray[i].substring(0,6);
        break;
      }
      if (pathArray[i].substring(0,5)=='winfo') {  //development local server Danny
        namespace = pathArray[i].substring(0,5);
        break;
      }
    }

    var port = '';
    var domain = document.domain;
    if ((namespace == 'dvp4') || (namespace == 'td4')) {
      domain = 'vepddvp4t.internal.uzgent.be'
    } else if ((namespace == 'tso') || (namespace == 'trn')) {
      domain = 'clinitest.internal.uzgent.be'
    } else if(namespace == 'prd') {
      domain = 'clinicom.internal.uzgent.be'
    } else if ((namespace == 'uzgent') || (namespace == 'winfo')) {  //connect to localhost for local development server
      port = 57772;
    }
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
