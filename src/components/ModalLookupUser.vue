<template>
  <modal-lookup title="title" v-if="isModalVisible" v-on:closemodallookup="closemodal">
    <p>this is my content{{user}}</p>
    <input type="button" class="btn btn-info" v-on:click="getData();" value="search">
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
            isModalVisible : true        }
    },
    methods: {
      getData() {
        this.$refs.grid.getData(JSON.stringify({}),5);
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