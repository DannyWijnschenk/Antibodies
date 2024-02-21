<template>
  <br>
  <div class="ps-2 pe-2">  <!-- padding start and padding end of 2 pixels -->
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
        <div class="row">
          <grid-data ref="grid" titleHeading="QueryDefinition" table="QueryDefinition" v-on:gridClickRow="gridclickrow"></grid-data>
        </div>
      </div>
    </div>
  </div>  <!--card -->
</template>

<script>

import GridData from '@/components/GridData.vue'
export default {
  components: {
    GridData
  },
  data() {
    return {
      title : 'QueryDefinition Settings',
      error : '',
      status : '',
      filter: {  },
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
        this.editParameter(id)
      } else if (button == 'add') {
        this.addParameter()
      } else if(button=='refresh') {
      this.$refs.grid.getData(JSON.stringify({}),10,true);
      }
    },
    editParameter(id) {
      this.$router.push('/wordquery/'+id);
    },
    addParameter() {
      this.$router.push('/wordquery/new');
    },
    getParameters(refresh = false) {
      this.$refs.grid.getData(JSON.stringify(this.filter),null,refresh);
    },
  },
mounted() {
  this.getParameters();
  }
}
</script>