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
          <div class="col-sm-3">Ams Code</div>
          <div class="col-sm-3"><input type="text" class="form-control" v-model="form.amsCode"/></div>
          <div class="col-sm-1"><button type="button" class="btn btn-outline-secondary" v-on:click="lookupUser();"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></button></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Access Code</div>
          <div class="col-sm-4">
            <select v-if="userAccessCodes.length>0" class="form-select" v-model="form.accessCode">
              <option v-for="accessCodeObj in userAccessCodes" v-bind:key="accessCodeObj.accessCode" v-bind:value="accessCodeObj.accessCode">{{accessCodeObj.accessCode}}</option>
            </select>
            <div v-else><input type="text" class="form-control" v-model="form.accessCode"/></div>
          </div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Ldap Gebruikersnaam</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.ldapUsername"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">App Type</div>
          <div class="col-sm-4">
          <select class="form-select" v-model="form.appType" v-on:change="getAppCode();">
              <option v-for="data in appTypes" v-bind:key="data.code">{{data.code}}</option>
          </select>
          </div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">App Id</div>
          <div class="col-sm-4">
          <select v-if="form.appType!=='ExternProgramma'" class="form-select" v-model="form.appId">
              <option v-for="data in appCodes" v-bind:key="data.code" v-bind:value="data.code">{{data.code}} ( {{data.description}} )</option>
          </select>
          <input v-if="form.appType=='ExternProgramma'" type="text" class="form-control" v-model="form.appId"/>
          </div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Bevoegdheid Ams Code</div>
          <div class="col-sm-3"><input type="text" class="form-control" v-model="form.authorityAmsCode"/></div>
          <div class="col-sm-1"><button type="button" class="btn btn-outline-secondary" v-on:click="lookupAuthUser();"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></button></div>
      </div>
      <div class="row mb-2">
        <div class="col-sm-3">Bevoegdheid Access Code</div>
        <div class="col-sm-4">
          <select v-if="authUserAccessCodes.length>0" class="form-select" v-model="form.authorityAccessCode">
            <option v-for="accessCodeObj in authUserAccessCodes" v-bind:key="accessCodeObj.accessCode" v-bind:value="accessCodeObj.accessCode">{{accessCodeObj.accessCode}}</option>
          </select>
          <input v-else type="text" class="form-control" v-model="form.authorityAccessCode"/>
        </div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Bevoegdheid Ldap Gebruikersnaam</div>
          <div class="col-sm-4"><input type="text" class="form-control" v-model="form.authorityLdapUsername"/></div>
      </div>
      <div class="row mb-2">
          <div class="col-sm-3">Default Bevoegdheid delegatie </div>
          <div class="col-sm-4"><input type="checkbox" class="form-check-input" v-model="form.authorityIsDefault"/></div>
      </div>
      <div class="row">
          <div class="col-sm-3">Geldig vanaf</div>
          <div class="col-sm-4">
          <vue-Datepicker v-model="form.validFromTs" locale="nld" cancelText="terug" selectText="selecteer" format="dd/MM/yyyy" :enableTimePicker="false" autoApply></vue-Datepicker>&nbsp;&nbsp;
          </div>
      </div>
      <div class="row">
        <div class="col-sm-3">Geldig tot</div>
        <div class="col-sm-4">
          <vue-Datepicker v-model="form.validToTs" locale="nld" cancelText="terug" selectText="selecteer" format="dd/MM/yyyy" :enableTimePicker="false" autoApply></vue-Datepicker>&nbsp;&nbsp;
        </div>
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

<!-- modal 'popup' for search on user & authuser -->
<div>
  <modal-lookup-user title="Zoek gebruiker" :user=user v-if="isModalUserVisible" v-on:closemodaluser="closeModalUser">
  </modal-lookup-user>
</div>
<div>
  <modal-lookup-user title="Zoek bevoegdheidsgebruiker" :user=authuser v-if="isModalAuthUserVisible" v-on:closemodaluser="closeModalAuthUser">
  </modal-lookup-user>
</div>

</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
import { ref } from 'vue';  //for date picker
import ModalLookupUser from '@/components/ModalLookupUser.vue';


export default {
    setup() {
        const date = ref(new Date());
        return { date }
    },
    components: {
      LoginDialog,
      ModalLookupUser
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
            userAccessCodes : [],
            authUserAccessCodes : [],
            filter: {},
            filterUsers : [],
            form : {id : '', 'appType': '', 'amsCode' : '', 'authorityAmsCode' : ''},
            isModalUserVisible : false,
            isModalAuthUserVisible : false
        }
    },
computed : {
  user : function() {
    return this.form.amsCode;
  },
  authuser : function() {
    return this.form.authorityAmsCode;
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
      getLdapUsername(type,amsCode){
        fetch(this.$store.getters.serverUrl + "/v1/users/users/"+amsCode, {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => {
          return response.json()
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          if (response.status=='Not Implemented') {
            if (type=='ams') {
              this.form.ldapUsername = 'unknown'
            } else {
              this.form.authorityLdapUsername = 'unknown'
            }
          } else if ((this.error =='') || (this.error == null)) {
            if (type=='ams') {
              this.form.ldapUsername = response.ldapUserName;
            } else {
              this.form.authorityLdapUsername = response.ldapUserName;
            }
          }
        });
      },
      getAccessCodes(type,amsCode){
        fetch(this.$store.getters.serverUrl + "/v1/users/users/"+amsCode+"/accesscodes", {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => {
          return response.json()
        }).then(response => {
          this.message = response.message;
          this.error = response.error;
          if (response.status=='Not Implemented') {
            if (type=='ams') {
              this.userAccessCodes = [{ 'accessCode': 'unknown_1' }, { 'accessCode': 'unknown_2' }]
            } else {
              this.authUserAccessCodes =  [{ 'accessCode': 'unknown_1' }, { 'accessCode': 'unknown_2' }]
            }
          } else if ((this.error =='') || (this.error == null)) {
            if (type=='ams') {
              this.userAccessCodes = response;
            } else {
              this.authUserAccessCodes = response;
            }
          }
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
          this.form.id = response.id;
          if ((this.error == undefined) || (this.error == null)) {
            this.$toast.success('Bewaard');
          }
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
            this.$toast.show('Deleted', {type : 'error'});
          }
          this.$router.push('/delegates');
        });
      },
      back() {
          this.$router.push('/delegates');
      },
      lookupUser() {
        this.isModalUserVisible = true;
      },
      lookupAuthUser() {
        this.isModalAuthUserVisible = true;
      },
      closeModalUser(buttonName, buttonId) {
        this.isModalUserVisible = false;
        if (buttonId !=='') {
          this.form.amsCode = buttonId;
          this.getAccessCodes('ams',this.form.amsCode);
          this.getLdapUsername('ams',this.form.amsCode);
        }
      },
      closeModalAuthUser(buttonName, buttonId) {
        this.isModalAuthUserVisible = false;
        if (buttonId !=='') {
          this.form.authorityAmsCode = buttonId;
          this.getAccessCodes('authams',this.form.authorityAmsCode);
          this.getLdapUsername('authams',this.form.authorityAmsCode);
        }
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