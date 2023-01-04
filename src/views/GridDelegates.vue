<template>
  <login-dialog v-if='!this.$store.getters.isLoggedIn' ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>
  <br>
  <div class="ps-2 pe-2">  <!-- padding start and padding end of 2 pixels -->
  <div class="container-fluid card ps-2" v-show='this.$store.getters.isLoggedIn'>  <!-- inner padding of 2 pixels -->
    <div class="card-header">
      <div>
        <b>{{title}}</b>
      </div>
    </div>
    <div class="card-body">
      <grid-data ref="grid" title="Bevoegdheidsdelegatie" table="Delegate" v-on:gridClickRow="gridclickrow"></grid-data>
    </div>
  </div>
</div>
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
      title : 'Bevoegdheidsdelegatie',
      gridData : [],
      error : '',
      status : '',
    }
  },
  methods: {
    loggedin() {
      this.$refs.grid.getData(JSON.stringify({}));
    },
    gridclickrow(button,id) {
      if (button=='add') {
        this.addRow()
      } else if (button=='edit') {
        this.editRow(id)
      } else if(button=='refresh') {
        this.$refs.grid.getData(JSON.stringify({}));
      }
    },
    addRow() {
      this.$router.push('/delegates/new');
    },
    editRow(id) {
      this.$router.push('/delegates/'+id);
    },
  },
  mounted() {
    console.log("griddelegates mounted")
    if (this.$store.getters.isLoggedIn) {
      this.$refs.grid.getData(JSON.stringify({}));
    }
  }
}
</script>