<template>
<login-dialog ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>
  <div class="home" v-if='this.$store.getters.isLoggedIn'>
    Welkom, {{getUser()}}
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
export default {
  components: {
    LoginDialog,
  },
  methods: {
    loggedin() {
      //
    },
    getUser() {
      return this.$store.getters.user
    }
  },
  mounted() {
    this.$store.dispatch('logOut');
  }
}
</script>