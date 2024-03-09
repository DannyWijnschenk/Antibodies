<template>
    <modal-lookup title="title" v-if="isModalVisible" v-on:closemodallookup="closemodal">
      <div class="row mb-2">
        <div class="col-md-2">Antibody</div>
        <div class="col-md-3">
          <input type="text" v-model="filter.antibody">
        </div>
        <div class="col-md-1">
          <input type="button" class="btn btn-outline-primary" v-on:click="getData();" value="search" />
        </div>
      </div>
      <div class="row">
        <grid-data ref="grid" title="" table="AntibodyName" v-on:gridClickRow="gridClickRow"></grid-data>
      </div>
    </modal-lookup>    
  </template>
  
  <script>
    import ModalLookup from '@/components/ModalLookup.vue';
    import GridData from '@/components/GridData.vue'
  
    export default {
      components: {
        ModalLookup,
        GridData
      },
      name: 'ModalLookupAntibody',
      props: ["title", "antibody"],
      emits: ["closemodalantibody"],
      data() {
          return {
            isModalVisible: true,
            filter: {'antibody' : ''}
          }
      },
      methods: {
        getData() {
          this.$refs.grid.getData(JSON.stringify({'antibody' : this.filter.antibody}),10);
        },
        closemodal() {
          console.log("modallookupantibody:close")
          this.$emit('closemodalantibody', '', '');
        },
        gridClickRow(buttonName, buttonId) {
          this.$emit('closemodalantibody', buttonName, buttonId)
        }
      },
    };
  </script>