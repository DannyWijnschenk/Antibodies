<template>
<login-dialog v-if='!this.$store.getters.isLoggedIn' ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>
  <div class="home" v-if='this.$store.getters.isLoggedIn'>
   <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    Welkom, {{getUser()}}
  </div>
  <button type="button" class="btn" @click="showModal"> Open Modal! </button>
  <modal-lookup title="TheTitle" v-if="isModalVisible" v-on:closemodallookup="closemodal">
    <p>this is my content</p>
    <p>this is my content</p>
    <p>this is my content</p>
    <p>this is my content</p>
  </modal-lookup>
</template>

<script>
// @ is an alias to /src
import LoginDialog from '@/components/LoginDialog.vue'
import ModalLookup from '@/components/ModalLookup.vue';
export default {
  name: 'HomeView',
  components: {
    LoginDialog,
    ModalLookup
  },
  data() {
    return {
      isModalVisible: false
    }
  },
  methods: {
    loggedin()
    {},
    getUser() {
      this.$toast.show(`Hey! I'm here`);
      return this.$store.getters.user
    },
    showModal() {
      this.isModalVisible = true;
      console.log("open modal",this.isModalVisible)
    },
    closemodal() {
      console.log('parent closemodal',this.isModalVisible)
      this.isModalVisible = false;
      console.log("close modal",this.isModalVisible)
    }
  }
}
</script>
