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
          <div class="row mb-1">
            <label for="id" class="col-sm-3 col-form-label">Id Nummer</label>
            <div class="col-sm-4">{{form.idNumber}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">Familienaam</div>
            <div class="col-sm-4"><input type="text" class="form-control" v-model="form.familyName" disabled/></div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">Voornaam</div>
            <div class="col-sm-2"><input type="text" class="form-control" v-model="form.foreName" disabled/></div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-3">Ordervalidatie dienst</div>
            <div class="col-sm-3">
              <select class="form-select" v-model="form.orderValidation">
                <option v-for="orderValidationObj in orderValidations" v-bind:key="orderValidationObj.code" v-bind:value="orderValidationObj.code">{{orderValidation.code}} ({{orderValidationObj.description}})</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row mb-2">
            <div class="col-sm-5">
              <button type="button" class="btn btn-outline-primary" v-on:click="saveData();">Bewaar</button>&nbsp;
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
    setup() {
    },
    components: {
      LoginDialog
    },
    data() {
        return {
            error : '',
            status : '',
            message : '',
            title : 'Beheer zorgverlener ordervalidatie',
            ordervalidations : [],
            filter: {},
            form : {id : '', 'idNumber': '', 'familyName' : '', 'foreName' : '', 'orderValidation' : ''},
        }
    },
computed : {
},
methods: {
      loggedin() {
      },
      getOrderValidations() {  //service for orderValidation
        fetch(this.$store.getters.serverUrl + "/v1/patients/caregivers/ordervalidations", {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => {
          return response.json()
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          this.ordervalidations = response;
        });
      }, 
      saveData() {
        var url = this.$store.getters.serverUrl + "/v1/patients/caregivers/"+this.form.id;
        var method = "PATCH";
        fetch(url, {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": method,
          "body" : JSON.stringify(this.form)
        }).then(response => {
          return response.json()
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
           if ((this.error == undefined) || (this.error == null)) {
            this.$toast.success('Bewaard');
          }
        });
      },    
      getData() {
        var url = this.$store.getters.serverUrl + "/v1/patients/caregivers/"+this.form.id;
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
      back() {
          this.$router.push('/caregivers/ordervalidation');
      },
  },
  created() {
    this.getOrderValidations();
    this.form.id = this.$route.params.caregiverId
    this.getData()
  }
}
</script>