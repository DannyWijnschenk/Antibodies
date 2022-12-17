<template>
  <login-dialog v-if='!this.$store.getters.isLoggedIn' ref="login" title="Login Server" app="AppLogin" v-on:loggedin="loggedin"></login-dialog>
  <br>
  <div class="px-2">  <!-- padding start and padding end of 2 pixels -->
  <form v-if='this.$store.getters.isLoggedIn'>
  <div class="container-fluid card">
    <div class="card-header">
      <div>
        <b>{{title}}</b>
      </div>
      <div v-if="((message!='') && (message != null) && (message !== undefined))" class="alert">
          <b>{{message}}</b>
      </div>
      <div v-if="((error!='') && (error != null) && (error !== undefined))" class="alert alert-danger">
          <b>{{error}}</b>
      </div>
    </div>
    <div class="card-body">
      <div class="row mb-2">
        <label for="gridPageSize" class="col-sm-3 col-form-label">Pagina grootte Grid Resultaten</label>
        <div class="col-sm-2"><input type="text" class="form-control" v-model="form.gridPageSize" id="gridPageSize"/></div>
      </div>
    </div>
    <div class="card-footer">
      <div class="row mb-2">
        <div class="col-sm-5">
          <button type="button" class="btn btn-primary" v-on:click="saveData();">Bewaar</button>&nbsp;
        </div>
      </div>
    </div>
  </div>
  </form>
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'

export default {
    components: {
      LoginDialog
    },
    data() {
        return {
            error : '',
            status : '',
            message : '',
            title : 'Mijn voorkeuren',
            form : {'gridPageSize':'0'}
        }
    },
    methods: {
      loggedin() {
      },
      saveData() {
        var url = this.$store.getters.serverUrl + "/v1/users/preferences/"+this.$store.getters.user+'/'+this.$store.getters.userAccessCode+'/userApp/myPreferences';
        var method = "PUT";
        console.log('form',this.form);
        fetch(url, {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": method,
          "body" : JSON.stringify({"value" :JSON.stringify(this.form)})
        }).then(response => {
          return response.json()
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
        });
      },    
      getData() {
        var url = this.$store.getters.serverUrl + "/v1/users/preferences/"+this.$store.getters.user+'/'+this.$store.getters.userAccessCode+'/userApp/myPreferences';
        fetch(url, {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => {
          return response.json() 
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          if (response.value != '') {
            this.form = JSON.parse(response.value);
          }
        });
      }
    },
    created() {
        console.log('form',this.form)
        this.getData();
        console.log('form',this.form)
    }
}
</script>