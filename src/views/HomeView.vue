<template>
<login-dialog v-if='!this.$store.getters.isLoggedIn' ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>
  <div class="home" v-if='this.$store.getters.isLoggedIn'>
   <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    Welkom, {{getUser()}}
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import LoginDialog from '@/components/LoginDialog.vue'
export default {
  name: 'HomeView',
  components: {
    LoginDialog,
   // HelloWorld
  },
  methods: {
    getUser() {
      return this.$store.getters.user
    }
  }
}
</script>
