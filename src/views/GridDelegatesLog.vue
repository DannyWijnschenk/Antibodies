<template>
  <login-dialog v-if='!this.$store.getters.isLoggedIn' ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>
  <br>
  <div class="ps-2 pe-2">  <!-- padding start and padding end of 2 pixels -->
    <div class="container-fluid card ps-2" v-if='this.$store.getters.isLoggedIn'>  <!-- inner padding of 2 pixels -->
      <div class="card-header" v-if='this.$store.getters.isLoggedIn'>
        <div v-if="((title!='') && (title != null) && (title !== undefined))" class="">
          <b>{{title}}</b>
        </div>
        <div v-if="((error!='') && (error != null) && (error !== undefined))" class="alert alert-danger">
          <b>{{error}}</b>
        </div>
      </div>
      <div class="card-body">
        <form>
        <div class="row mb-2">
          <div class="col-md-1">User</div>
          <div class="col-md-3">
            <select class="form-select form-select-sm" v-model="filter.amsCode">
              <option v-for="user in filterUsers" :key=user v-bind:value="user.amsCode">{{user.amsCode}}</option>
            </select>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-1">From</div>
          <div class="col-md-3">
            <vue-Datepicker v-model="filter.useFromTs" locale="nld" cancelText="terug" selectText="selecteer" format="dd/MM/yyyy" :enableTimePicker="false" autoApply></vue-Datepicker>&nbsp;&nbsp;
          </div>
          <div class="col-md-1">To</div>
          <div class="col-md-3">
            <vue-Datepicker v-model="filter.useToTs" locale="nld" cancelText="terug" selectText="selecteer" format="dd/MM/yyyy" :enableTimePicker="false" autoApply></vue-Datepicker>&nbsp;&nbsp;
          </div>
          <div class="col-md-3">
            <input type="button" class="btn btn-info" v-on:click="getDelegatesLog();" value="search">
          </div>
        </div>
      </form>
        <div class="row">
          <grid-data ref="grid" title="Logging Bevoegdheidsdelegatie" table="DelegateLog" v-on:gridClickRow="gridclickrow"></grid-data>
        </div>
      </div>
    </div>
  </div>  <!--card -->
</template>


<script>
import LoginDialog from '@/components/LoginDialog.vue'
import GridData from '@/components/GridData.vue'
export default {
  components: {
    LoginDialog,
    GridData
  },
  data() {
    return {
      title : 'Bevoegdheidsdelegatie Log',
      error : '',
      status : '',
      filter : {'amsCode': ''},
      filterUsers : []
    }
  },
  methods: {
    loggedin() {
      this.getDelegatesLog();
    },
    gridclickrow(button,id) {
      console.log("parent",button,id)
    },
    getFilterUsers() {
        fetch(this.$store.getters.serverUrl + "/v1/users/delegateslog/users", {
          "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
          "method": "GET"
        }).then(response => { 
          return response.json()  
        }).then(response => {
          this.filterUsers = response;
        });
      }, 
    //getDemoGrid() {
    //  this.refresh(this.getDemoGridNow);  //get refresh token if needed, call actual getGridNow as callback to prevent async lag
    //},
    //refresh(callBack) {
    //  this.$refs.login.refresh(this.accessToken, this.refreshToken, this.accessTokenExpDate, callBack);
    //},
    getDelegatesLog() {
      this.$refs.grid.getData(JSON.stringify(this.filter));
    }
  },
  created() {
    console.log("getdeletagelog created");
    if (this.$store.getters.isLoggedIn) {
      this.getFilterUsers();
    }
  }
}
</script>