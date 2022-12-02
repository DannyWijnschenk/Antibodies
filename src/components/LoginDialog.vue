<template>
  <div class="col-md-12 d-flex justify-content-center">
    <div class="card">
      <div class="card-header">
        <h5>{{title}} {{ott}}</h5>
      </div>
      <div class="card-body"  v-if="(ott===undefined)||(ott=='')">
        <div class="form-group row" >
          <label for="user" class="col-md-4">Gebruiker</label>
          <div class="col-md-8">
            <input v-if="step!=='access'" class="form-control" v-model="user"/>
            <input v-if="step=='access'" class="form-control" v-model="user" readonly/>
          </div>
        </div>
        <div class="form-group row" v-if="step!=='access'">
          <label for="password" class="col-md-4">Paswoord</label>
            <div class="col-md-8">
              <input type="password" class="form-control" v-model="password" @keyup.enter="login()">
            </div>
        </div>
        <div class="form-group row" v-if="step=='access'">
          <label for="access" class="col-md-4">Toegang</label>
          <div class="col-md-8">
            <select class="form-select form-select-sm" v-model="userAccessCode" v-on:change="selectAccess();">
              <option v-for="acc in accesses" v-bind:value="acc.userAccessCode" :key="acc.userAccessCode">
                {{acc.environmentDescription}} {{acc.userAccessCode}}
              </option>
            </select>
          </div>
        </div>
        <div v-if="(error!=='')&&(error!==undefined)"><span class="alert alert-danger">{{error}}</span></div>
      </div> <!-- card body -->
      <div class="card-footer" v-if="step!=='access'">
        <button class="btn btn-outline-primary" type="button" v-on:click="login();">Login</button>
      </div>
    </div>  <!--card -->
  </div>
</template>

<script>
export default {
  props: [
	'title',
	'ott'
  ],
  data() {
      return {
        status: { message:'Waiting for the result from the server ...', token:'' },
		application : 'null',
		user : '',
		password: '',
		error:'',
		step: '',
		accessToken:'',
		refreshToken:'',
		accessTokenExpDate:'',
		refreshTokenExpDate:'',
		accesses: [],
		context: {}
      }
  },
  methods : {
	login() {  //login on the server
		var url = this.$store.getters.serverUrl + "/v1/login";
		if (this.ott!==undefined) {  //If a ott is present, we will use this instead of asking user/pw
			url = url + '?ott='+this.ott;  //should already be base64Encoded when used in the url parameter!
		}
		fetch(url, {
				"method": "POST",			  
				"headers" : { "authorization": 'basic ' + btoa(this.user+':'+this.password), "app":this.app }
				//"body" : JSON.stringify({"application" : this.application})
			})
			.then(response => { 
				return response.json()
			})
			.then(response => {
				if ((response.accessToken!=='')&&(response.accessToken!==undefined)) {
					console.log('response', response);
					this.accessToken = response.accessToken;
					this.refreshToken = response.refreshToken;
					this.accessTokenExpDate = response.accessTokenExpiresAt;
					this.refreshTokenExpDate = response.refreshTokenExpiresAt;
					this.context = response.context;
					if (this.ott != undefined) {
						this.access = response.userAccessCode;
						this.selectAccess();
					} else {
						this.accesses = response.userAccessCodes;
						this.userAccessCode = '';
						this.step = 'access';
						this.error = '';
					}
				} else {
					if (this.ott!=undefined) {
						//this.ott = undefined;  //will display the login again to let the user login 'manually'
					} else {
						if (response.errors!==undefined) {
							this.error = 'server fout'
						} else {
							this.error = response.error; //'gebruiker/wachtwoord combinatie is onbekend';
						}
					}
				}
			});
	},
    selectAccess() {
		var url = this.$store.getters.serverUrl + "/v1/login/uac";
		fetch(url, {
			"method": "POST",			  
			"headers" : { "authorization": 'Bearer ' + this.accessToken, "app":this.app },
            "body"    : JSON.stringify({"userAccessCode" : this.userAccessCode})
		})
		.then(response => { 
			return response.json()
		})
		.then(response => {
			console.log("uac",response);
		});
		this.$store.dispatch('saveToken', {
			user: this.user,
			accessToken: this.accessToken,
			refreshToken: this.refreshToken
		})
        this.$emit('loggedin');
	},
    selectRefresh() {
		this.$emit('loggedin');
	},

	refresh(accessToken, refreshToken, accessTokenExpDate, callBack) {
		var now = new Date();
		var expireDate = new Date(accessTokenExpDate);
		console.log("check refresh",accessTokenExpDate,expireDate.getTime(),"<",now.getTime()+(3*60*1000))
		if ((accessTokenExpDate !== '') && (expireDate.getTime() < (now.getTime()+(3*60*1000)))) {  //if it is about to expire in 3 minutes
			console.log('refresh access token');
			fetch(this.$store.getters.serverUrl + "/v1/refresh", {
				"headers": { "authorization": 'Bearer ' + accessToken },
				"body": JSON.stringify({ "refreshToken": refreshToken }),
				"method": "POST"
			})
			.then(response => {
				return response.json()
			})
			.then(response => {
				this.accessToken = response.accessToken;
				this.accessTokenExpDate = response.accessTokenExpiresAt;
				this.selectRefresh();
				//now call the callback
				if (callBack !== undefined) { callBack(); }
			})
		} else {
			if (callBack !== undefined) {
				callBack();
			}
		}
	}
  },  
  mounted() {
	if (this.ott!==undefined) {  //If a ott is present, we will use this instead of asking user/pw
		this.login();
    }
  }
}
</script>