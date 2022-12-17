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
          <label for="id" class="col-sm-3 col-form-label">Id</label>
          <div class="col-sm-4">{{form.id}}</div>
      </div>
      <div class="row mb-2">
          <label for="amsCode" class="col-sm-3 col-form-label">Ams Code</label>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.amsCode" id="amsCode"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Access Code</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.accessCode"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Ldap Username</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.ldapUsername"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">App Type</div>
          <div class="col-sm-4">
          <select class="form-select form-select-sm" v-model="form.appType" v-on:change="getAppCode();">
              <option v-for="data in appTypes" v-bind:key="data.code">{{data.code}}</option>
          </select>
          </div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">App Id</div>
          <div class="col-sm-4">
          <select v-if="form.appType!=='ExternProgramma'" class="form-select form-select-sm" v-model="form.appId">
              <option v-for="data in appCodes" v-bind:key="data.code">{{data.code}} ( {{data.description}} )</option>
          </select>
          <input v-if="form.appType=='ExternProgramma'" type="text" class="form-control" v-model="form.appId"/>
          </div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Authority Ams Code</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.authorityAmsCode"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Authority Access Code</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.authorityAccessCode"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Authority Ldap Username</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.authorityLdapUsername"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Authority Is Default</div>
          <div class="col-sm-4"><input type="checkbox" class="form-check-input" v-model="form.authorityIsDefault"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Valid From Ts</div>
          <div class="col-sm-4">
          <vue-Datepicker v-model="form.validFromTs" locale="nld" cancelText="terug" selectText="selecteer" format="dd/MM/yyyy" :enableTimePicker="false" autoApply></vue-Datepicker>&nbsp;&nbsp;
          </div>
      </div>
      <div class="row mb-2">
        <div class="col-sm-3">Valid To Ts</div>
        <div class="col-sm-4">
          <vue-Datepicker v-model="form.validToTs" locale="nld" cancelText="terug" selectText="selecteer" format="dd/MM/yyyy" :enableTimePicker="false" autoApply></vue-Datepicker>&nbsp;&nbsp;
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="row mb-2">
        <div class="col-sm-5">
          <button type="button" class="btn btn-primary" v-on:click="saveData();">Bewaar</button>&nbsp;
          <button v-if="(form.id!=='')&&(form.id!==undefined)" type="button" class="btn btn-danger" v-on:click="removeData();">Verwijder</button>&nbsp;
          <button type="button" class="btn btn-warning" v-on:click="back();">Terug</button>&nbsp;
        </div>
      </div>
    </div>
  </div>
</form>
</div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
import { ref } from 'vue';  //for date picker

export default {
    setup() {
        const date = ref(new Date());
        return { date }
    },
    components: {
      LoginDialog
    },
    data() {
        return {
            delegateId : '',
            error : '',
            status : '',
            message : '',
            title : 'Aanmaken Bevoegdheidsdelegatie',
            appTypes : [],
            appCodes : [],
            filter: {},
            filterUsers : [],
            form : {id : '', 'appType': ''}
        }
    },
    methods: {
      loggedin() {
      },
      getAppType() {
        fetch(this.$store.getters.serverUrl + "/v1/users/apptypes", {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => { //returns the full response object (https://www.bezkoder.com/javascript-fetch/)
          return response.json()  //returns only the response body
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          this.appTypes = response;
        });
      }, 
      getAppCode() {
        fetch(this.$store.getters.serverUrl + "/v1/users/appcodes/"+this.form.appType, {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => { //returns the full response object (https://www.bezkoder.com/javascript-fetch/)
          return response.json()  //returns only the response body
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          this.appCodes = response;
        });
      }, 
      saveData() {
        var url = this.$store.getters.serverUrl + "/v1/users/delegates"
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
          this.form.id = response.id
        });
      },    
      getData() {
        var url = this.$store.getters.serverUrl + "/v1/users/delegates/"+this.form.id;
        fetch(url, {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => {
          return response.json() 
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          this.form = response;
          this.getAppCode(this.form.appType);
        });
      },    
      removeData() {
        var url = this.$store.getters.serverUrl + "/v1/users/delegates/"+this.form.id;
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
          }
          this.$router.push('/delegates');
        });
      },
      back() {
          this.$router.push('/delegates');
      },
    },
    created() {
        this.getAppType();
        this.delegateId = this.$route.params.delegateId
        if (this.delegateId=='new') {
            this.delegateId = ''
            this.title = 'Aanmaken bevoegdheidsdelegatie'
        } else {
            this.form.id = this.delegateId;
            this.title = 'Wijzigen bevoegdheidsdelegatie'
            this.getData()
        }
    }
}
</script>