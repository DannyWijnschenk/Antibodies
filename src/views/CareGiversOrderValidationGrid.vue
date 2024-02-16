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
          <div class="col-md-1">Id Nummer</div>
          <div class="col-md-3">
            <input type="text" class="form-control" v-model="filter.idNumber"/>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-1">Familienaam</div>
          <div class="col-md-3">
            <input type="text" class="form-control" v-model="filter.familyName" />
          </div>
          <div class="col-md-2">
            <input type="button" class="btn btn-outline-primary" v-on:click="getCareGivers();" value="zoeken">
          </div>
        </div>
      </form>
        <div class="row">
          <grid-data ref="grid" title="Zorgverleners" table="CareGiver" v-on:gridClickRow="gridclickrow"></grid-data>
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
      title : 'Zorgverleners',
      error : '',
      status : '',
      filter : {'idNumber': '', 'familyName':''},
    }
  },
  methods: {
    loggedin() {
      this.getCareGivers();
    },
    gridclickrow(button,id) {
      if (button=='edit') {
        this.editRow(id)
      }
    },
    editRow(id) {
      this.$router.push('/caregivers/ordervalidation/edit/'+id);
    },
    getCareGivers() {
      this.$refs.grid.getData(JSON.stringify(this.filter));
    }
  },
  created() {
  }
}
</script>