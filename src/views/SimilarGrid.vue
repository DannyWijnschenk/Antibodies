<template>
  <login-dialog v-if="!this.$store.getters.isLoggedIn" ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>

<br>
  <div class="ps-2 pe-2" v-if="this.$store.getters.isLoggedIn">  <!-- padding start and padding end of 2 pixels -->
    <div class="container-fluid card ps-2" >  <!-- inner padding of 2 pixels -->
      <div class="card-header" >
        <div v-if="((title!='') && (title != null) && (title !== undefined))" class="">
          <b>{{title}}</b>
        </div>
        <div v-if="((error!='') && (error != null) && (error !== undefined))" class="alert alert-danger">
          <b>{{error}}</b>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-2">
          <div class="col-md-1">Antibody</div>
          <div class="col-md-2"><input type="text" class="form-control" v-model="filter.name" disabled/></div>
          <div class="col-md-1"><button type="button" class="btn btn-outline-secondary" v-on:click="lookupAntibody();"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></button></div>
        </div>
        <div class="row mb-2">
          <div class="col-md-1">Highest Clinical Trial</div>
          <div class="col-md-3">
            <select class="form-select" v-model="filter.highestClinicalTrial">
              <option value="">--Any--</option>
              <option v-for="list in listHighestClinicalTrial" v-bind:key="list.name" v-bind:value="list.name">{{list.name}}</option>
            </select>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-1">Est.Status</div>
          <div class="col-md-3">
            <select class="form-select" v-model="filter.estStatus">
              <option value="">--Any--</option>
              <option v-for="list in listEstStatus" v-bind:key="list.name" v-bind:value="list.name">{{list.name}}</option>
            </select>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-1">Embedding</div>
          <div class="col-md-3">
            <select class="form-select" v-model="filter.embedding">
              <option value="Ablang">Ablang</option>
              <option value="Antiberty">Antiberty</option>
              <option value="SaProt">SaProt</option>
              <option value="SaProt">protT5</option>
            </select>
          </div>
        </div>

        <div class="row mb-2">
          <div class="col-md-1"></div>
          <div class="col-md-3">
            <div class="col-md-3">
              <input type="button" id="btShow" class="btn btn-outline-primary" v-on:click="getAntibodies();" value="Show Similar Antibodies" :disabled='searchDisabled'>
            </div>
          </div>
        </div>

        <grid-data ref="grid" titleHeading="Similar Antibodies" table="Antibodies" v-on:gridClickRow="gridclickrow"></grid-data>
      </div>
    </div>
  </div>  <!--card -->

<!-- modal 'popup' for search on antibody -->
<div>
  <modal-lookup-antibody title="Search Antibody" :antibody=antibody v-if="isModalAntibodyVisible" v-on:closemodalantibody="closeModalAntibody">
  </modal-lookup-antibody>
</div>

</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue';
import GridData from '@/components/GridData.vue'
import ModalLookupAntibody from '@/components/ModalLookupAntibody.vue'

export default {
  components: {
    LoginDialog,
    GridData,
    ModalLookupAntibody
  },
  data() {
    return {
      title : 'Antibodies',
      error : '',
      status : '',
      filter: { 'name': '', 'id' : '', 'embedding' : 'Ablang' },
      isModalAntibodyVisible: false,
      searchDisabled: true,
      listHighestClinicalTrial: [],
      listEstStatus : []
    }
  },
  computed: {
    showLogin: function () {
      return !this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    loggedin() {
      
    },
    gridclickrow(button, id) {
      if (button=='edit') {
        this.editSimilarity(id)
      } else if(button=='refresh') {
      this.$refs.grid.getData(JSON.stringify({}),10,true);
      }
    },
    editSimilarity(id) {
      this.$router.push('/similarity/'+id);
    },
    lookupAntibody() {
      this.isModalAntibodyVisible = true;
    },
    closeModalAntibody(buttonName, buttonId) {
      this.isModalAntibodyVisible = false;
      if (buttonId !== '') {
        var arrButtonId = buttonId.split('||')
        this.filter.id = arrButtonId[0];
        this.filter.name = arrButtonId[1];
        this.searchDisabled = false;
      }
    },
    getAntibodies() {
      this.$refs.grid.getData(JSON.stringify(this.filter),10,true);
    },
    getHighestClinicalTrial() {
      var url = this.$store.getters.serverUrl + "/v1/highestclinicaltrial";
      fetch(url, {
        "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
        "method": "GET"
      }).then(response => {
        return response.json() 
      }).then(response => {
        this.message = response.message;
        this.error = response.error;
        this.listHighestClinicalTrial = response;
      });
    },    
    getEstStatus() {
      var url = this.$store.getters.serverUrl + "/v1/eststatus";
      fetch(url, {
        "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
        "method": "GET"
      }).then(response => {
        return response.json() 
      }).then(response => {
        this.message = response.message;
        this.error = response.error;
        this.listEstStatus = response;
      });
    },    
  },
mounted() {
  //this.getSimilarity();
  this.getHighestClinicalTrial();
  this.getEstStatus();
  }
}
</script>