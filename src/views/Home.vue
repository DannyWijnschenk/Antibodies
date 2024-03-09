<template>
  <div>
    <login-dialog v-if="!this.$store.getters.isLoggedIn" ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>

    <div class="home" v-if="this.$store.getters.isLoggedIn">
      //Welcome, {{ getUser() }}
    </div>

  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue';

export default {
  name: 'HomeView',
  components: {
    LoginDialog,
  },
  data() {
    return {
    };
  },
  methods: {
    loggedin() {},
    getUser() {
      //this.$toast.show(`Hey! I'm here`);
      return this.$store.getters.user;
    },
  },
};
</script>