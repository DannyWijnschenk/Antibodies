<template>
  <modal-lookup title="title" v-if="isModalVisible" v-on:closemodallookup="closemodal">
    <div class="row mb-2">
      <div class="col-md-2">Naam Gebruiker</div>
      <div class="col-md-3">
        <input type="text" v-model="filter.userName">
      </div>
      <div class="col-md-1">
        <input type="button" class="btn btn-info" v-on:click="getData();" value="zoeken" />
      </div>
    </div>
    <div class="row">
      <grid-data ref="grid" title="" table="User" v-on:gridClickRow="gridClickRow"></grid-data>
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
    name: 'ModalLookupUser',
    props: ["title", "user"],
    emits: ["closemodaluser"],
    data() {
        return {
          isModalVisible: true,
          filter: {'userName' : ''}
        }
    },
    methods: {
      getData() {
        console.log("getdata",this.filter.userName)
        console.log("getdata",{'userName' : this.filter.userName})
        console.log("getdata",JSON.stringify({'userName' : this.filter.userName}))
        this.$refs.grid.getData(JSON.stringify({'userName' : this.filter.userName}),5);
      },
      closemodal() {
        console.log("modallookupuser:close")
        this.$emit('closemodaluser', '', '');
      },
      gridClickRow(buttonName, buttonId) {
        this.$emit('closemodaluser', buttonName, buttonId)
      }
    },
  };
</script>