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
          <div class="row">
            <div class="col-md-1">User</div>
              <div class="col-md-11">
                <select v-model="filter.amsCode">
                  <option v-for="user in filterUsers" :key=user v-bind:value="user.amsCode">{{user.amsCode}}</option>
                </select>
              </div>
            </div>
            <div class="row">
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
            <div class="row">
              <grid-data ref="grid" title="demo grid" table="DelegateLog"></grid-data>
            </div>
        </div>
      </div>  <!--panel default -->
    </div> <!--col 12 -->
  </div> <!--row-->
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
      filter : {'amsCode': ''}
    }
  },
  methods: {
    loggedin() {
      this.getDelegatesLog();
    },
    //getDemoGrid() {
    //  this.refresh(this.getDemoGridNow);  //get refresh token if needed, call actual getGridNow as callback to prevent async lag
    //},
    //refresh(callBack) {
    //  this.$refs.login.refresh(this.accessToken, this.refreshToken, this.accessTokenExpDate, callBack);
    //},
    getDelegatesLog() {
      this.filter = {amsCode:''}
      this.$refs.grid.getData(JSON.stringify(this.filter));
    },
    mounted() {
      if (this.$store.getters.isLoggedIn) {
        this.getDelegatesLog();
       }
    }
  }
}
</script>