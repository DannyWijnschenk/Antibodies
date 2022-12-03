<template>
 <login-dialog v-if='!this.$store.getters.isLoggedIn' ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>
 <div class="row" v-if='this.$store.getters.isLoggedIn'>
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-header">
          <div v-if="((title!='') && (title != null) && (title !== undefined))" class="alert">
            <b>{{title}}</b>
          </div>
          <div v-if="((error!='') && (error != null) && (error !== undefined))" class="alert alert-danger">
            <b>{{error}}</b>
          </div>
        </div>
        <div class="panel-body">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>EPD Gebruiker</th>
                <th>Toegangscode</th>
                <th>Ldap Gebruiker</th>
                <th>App Type</th>
                <th>App Id</th>
                <th>Authority EPD Gebruiker</th>
                <th>Authority Toegangscode</th>
                <th>Authority Ldap Gebruiker</th>
                <th>Ingelogd Op</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="row in gridData" :key="row.id">
              <td>{{row.amsCode}}</td>
              <td>{{row.accessCode}}</td>
              <td>{{row.ldapUsername}}</td>
              <td>{{row.appType}}</td>
              <td>{{row.appId}}</td>
              <td>{{row.authorityAmsCode}}</td>
              <td>{{row.authorityAccessCode}}</td>
              <td>{{row.authorityLdapUsername}}</td>
              <td>{{row.usedAtTs}}</td>
            </tr>
            </tbody>
          </table>
        </div> <!--panel body -->
      </div>  <!--panel default -->
    </div> <!--col 12 -->
  </div> <!--row-->
</template>


<script>
import LoginDialog from '@/components/LoginDialog.vue'
export default {
  components: {
    LoginDialog
  },
  data() {
    return {
      title : 'Bevoegdheidsdelegatie Log',
      gridData : [],
      error : '',
      status : '',
    }
  },
  methods: {
    loggedin() {
      this.getDelegatesLog();
    },
    getDelegatesLog() {
      this.error = '';
      fetch(this.$store.getters.serverUrl+'/v1/users/delegateslog', {
        "method": 'GET',
        "headers": { "authorization": 'Bearer ' + this.$store.getters.serverAccessToken, "app":this.app },
       }).then((response) => {  //=> enables the 'this' keyword to be used in the 'then' block
        if (response.ok) {
          return response.json(); //convert the response data to json
        } else {
          console.log(response)
          throw new Error('Status code : ' + response.status + ' ' + response.statusText)
        }
      }).then((data) => {
        this.gridData = data;
      }).catch((error) => {
        this.error = error;
        console.log(error);
      });
    }
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.getDelegatesLog();
    }
  }
}
</script>