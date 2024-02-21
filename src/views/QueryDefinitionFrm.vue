<template>
  <div v-show=showLogin> 
    <login-dialog ref="login" title="Login Server" v-on:loggedin="loggedin"></login-dialog>
  </div>
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
          <div class="row mb-1">
            <label for="id" class="col-sm-3 col-form-label">Id</label>
            <div class="col-sm-4">{{form.id}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">QueryName</div>
            <div class="col-sm-4"><input type="text" class="form-control" v-model="form.queryName"></div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">CalculationType</div>
            <div class="col-sm-6"><input type="text" class="form-control" v-model="form.calculationType"/></div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">CalculationCode</div>
            <div class="col-sm-6"><input type="text" class="form-control" v-model="form.calculationCode"></div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">Parameters</div>
            <div class="col-sm-6"><input type="text" class="form-control" v-model="form.parameters"></div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">ActiveFlag</div>
            <div class="col-sm-6"><input type="checkbox" class="form-check-input" v-model="form.activeFlag"></div>
          </div>
        </div>
        

        <div class="card-footer">
    <div class="row mb-2">
      <div class="col-sm-5">
        <button type="button" class="btn btn-outline-primary" v-on:click="saveData();">Bewaar</button>&nbsp;
        <button v-if="(form.id!=='')&&(form.id!==undefined)" type="button" class="btn btn-outline-danger" v-on:click="removeData();">Verwijder</button>&nbsp;
        <button type="button" class="btn btn-outline-secondary" v-on:click="back();">Terug</button>&nbsp;
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
          id : '',
          error : '',
          status : '',
          message : '',
          title : 'QueryDefinition Setting',
          filter: {},
          form : {id : '', 'queryName': '', 'calculationType' : '', 'calculationCode' : '', 'parameters': '',
                  'activeFlag': 0},
      }
  },
computed : {
},
methods: {
    loggedin() {
    },
    saveData() {
      var url = this.$store.getters.serverUrl + "/v1/word/query"
      var method = "POST";
      if ((this.form.id != '')  && (this.form.id !== undefined)) {
        method = "PUT";
        url = url + "/" + this.form.id;
      }
      fetch(url, {
        "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
        "method": method,
        "body" : JSON.stringify(this.form)
      }).then(response => { //returns the full response object (https://www.bezkoder.com/javascript-fetch/)
        return response.json()  //returns only the response body
      }).then(response => {
        this.message = response.message;
        this.error = response.error;
        this.form.id = response.id;
        if ((this.error == undefined) || (this.error == null)) {
          this.$toast.success('Bewaard');
        }
      });
    },    
    getData() {
      var url = this.$store.getters.serverUrl + "/v1/word/query/"+this.form.id;
      fetch(url, {
        "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
        "method": "GET"
      }).then(response => {
        return response.json() 
      }).then(response => {
        this.message = response.message;
        this.error = response.error;
        this.form = response;
      });
    },    
    removeData() {
      var url = this.$store.getters.serverUrl + "/v1/word/query/"+this.form.id;
      fetch(url, {
        "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
        "method": "DELETE"
      }).then(response => { 
        return response.json()
      }).then(response => {
        this.message = response.message;
        this.error = response.error;
        if (response.status=='ok') {
          this.form = {};
          this.$toast.show('Deleted', {type : 'error'});
        }
        this.$router.push('/wordquery');
      });
    },
    back() {
        this.$router.push('/wordquery');
    },
},
created() {
      this.id = this.$route.params.id
      if (this.id=='new') {
          this.if = ''
          this.title = 'Aanmaken Query Definitie'
      } else {
          this.form.id = this.id;
          this.title = 'Wijzigen Query Definitie'
          this.getData()
      }
  }
}
</script>