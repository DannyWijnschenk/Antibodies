<template>
  <div class="col-md-12">
    <div class="panel panel-default">
      <div class="panel-header">
        <div v-if="((title!='') && (title != null) && (title !== undefined))" class="alert alert-info">
          <b>{{title}}</b>
          &nbsp;<button v-if="exportCsv==true" v-on:click="exportToCsv()"> Export CSV </button>
       </div>
        <div v-if="((error!='') && (error != null) && (error !== undefined))" class="alert alert-danger">
          <b>{{error}}</b>
        </div>
        <button v-if="(pagination!==null) && pagination.currentPage!==undefined" :disabled="pagination.previousPageLink==undefined" v-on:click="prevPage()"> &lt; </button>
        <span v-if="(pagination!==null) && pagination.currentPage!==undefined">&nbsp; pag. {{pagination.currentPage}}/{{pagination.totalPages}}</span>&nbsp;
        <button v-if="(pagination!==null) && pagination.currentPage!==undefined" :disabled="pagination.nextPageLink==undefined" v-on:click="nextPage()"> &gt; </button>
        <span v-if="(pagination!==null) && pagination.sortLabels!==undefined">
          Sort:<select v-model="sortKey" v-on:change="sort();">
              <option v-for="label in pagination.sortLabels" :key="label" v-bind:value="label">
                {{label}}
              </option>
            </select>
            aflopend&nbsp;<input type="checkbox" v-model="sortDescendingChecked" v-on:click="toggleDirection();" />
       </span>
      </div>
      <div class="panel-body" v-show="access">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th v-for="column in header" :key="column">{{column}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in results" :key="row">
              <td v-for="value of row" :key="value">{{value}}</td>
            </tr>
          </tbody>
        </table>
      </div> <!--panel body -->
    </div>  <!--panel default -->
  </div>  <!--col-md-12-->    
</template>

<script>
export default {
  props: [
	'table'
  ],
  data() {
    return {
      results: [ { name:'Waiting for the result from the server ...' } ],
      pagination : { resultKey:"", sortKey:"", sortDirection:""},
      resultKey : '',
      sortKey : '',
      sortDirection : 1,
      sortDescendingChecked : false,
      title:"",
      error : '',
      showSelection : true,
      exportCsv : false,
      access : true
    }
  },  
 methods : {
    getData(selection) {
        var url = ""
        if (selection===undefined) {
          url = this.$store.getters.serverUrl+"/v1/grid/"+this.table+ "?selection="
        } else {
          url = this.$store.getters.serverUrl + "/v1/grid/" + this.table + "?selection=" + selection
          if (selection != this.selection) {
            //new selection : we need a new query !
            this.resultKey = '';  //todo : purge the old results, or we need a param to invalidate the results and run the query again
          }
        }
        if (this.sortKey !='') {
          url = url + "&sortKey=" + this.sortKey + "&sortDirection=" + this.sortDirection;
        }
        if (this.resultKey != '') {
          url = url + "&resultKey=" + this.resultKey;
        }
        this.selection = selection;
        this.baseUrl=this.server + "/v1/grid/" + this.table 
        this.doFetch(url)
    },
    doFetch(url) {
      console.log('fetch',url);
      this.results = [];
      this.header = [];
      this.title = "Ophalen Gegevens ...";
      fetch(url, {
        "headers" : { "Authorization": 'Bearer ' + this.$store.getters.serverAccessToken },
        "method": "GET"
        }).then(response => { 
          console.log('header',response.headers.get('x-pagination'));
          this.pagination = JSON.parse(response.headers.get('x-pagination'));
          if (this.pagination !== null) {
            this.resultKey = this.pagination.resultKey;
            this.sortKey = this.pagination.sortKey;
            this.sortDirection = this.pagination.sortDirection;
            this.sortDescendingChecked = (this.sortDirection == -1);
         }
          return response.json()  //returns only the response body
        }).then(response => {
          this.results = response.results;
          this.header = response.header;
          this.title = response.title;
          this.showSelection = response.showSelection;
          this.error = response.error;
          if (response.options !== undefined) {
            if (response.options.exportCsv) {
              this.exportCsv = true;
            }
          }
          if (response.access == false) {
            this.access = false;
          }
          this.$emit('datafetched', this.access);
        });
    },
    nextPage() {
      var url = this.baseUrl + this.pagination.nextPageLink;
      this.doFetch(url);
    },
    prevPage() {
      var url = this.baseUrl + this.pagination.previousPageLink;
      this.doFetch(url);
    },
    sort() {
      console.log('sort on ',this.sortKey);
      this.getData(this.selection) 
    },
    toggleDirection() {
      if (this.sortDescendingChecked) {
        this.sortDescendingChecked = false;
        this.sortDirection = 1
      } else {
        this.sortDescendingChecked = true;
        this.sortDirection = -1
      }
      this.sort();
    },


    exportToCsv() {
      var filename = 'export.csv';
      var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? '' : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
            result = '"' + result + '"';
          if (j > 0)
            finalVal += ',';
          finalVal += result;
        }
        return finalVal + '\n';
      };
 
      var csvFile = '';
      for (var i = 0; i < this.results.length; i++) {
        csvFile += processRow(this.results[i]);
      }
 
      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
 }

}
</script>