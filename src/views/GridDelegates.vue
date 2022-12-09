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
                <th>Authority Default</th>
                <th>Geldig Van</th>
                <th>Geldig Tot</th>
                <th>
                  <button class="btn btn-primary btn-xs" v-on:click="addRow()"><font-awesome-icon icon="fa-solid fa-plus"/></button>
                  <button class="btn btn-primary btn-xs" v-on:click="getDelegates()"><font-awesome-icon icon="fa-solid fa-rotate"/></button>
                </th>
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
              <td>{{row.authorityIsDefault}}</td>
              <td>{{row.validFromTs}}</td>
              <td>{{row.validToTs}}</td>
              <td><button class="btn btn-primary btn-xs" v-on:click="editRow(row.id);"><font-awesome-icon icon="fa-regular fa-pen-to-square"/></button></td>
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
      title : 'Bevoegdheidsdelegatie',
      gridData : [],
      error : '',
      status : '',
    }
  },
  methods: {
    loggedin() {
      this.getDelegates();
    },
    getDelegates() {
      this.error = '';
      fetch(this.$store.getters.serverUrl+'/v1/users/delegates', {
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
    },
    postDelegates() {
      this.error = '';
      fetch(this.$store.getters.serverUrl+'/v1/users/delegates', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify( {} )
      });
    },
    addRow() {
      this.$router.push('/delegates/new');
    },
    editRow(id) {
      this.$router.push('/delegates/'+id);
    },
  },
  mounted() {
    console.log("griddelegates mounted")
    if (this.$store.getters.isLoggedIn) {
      this.getDelegates();
    }
  }
}
</script>