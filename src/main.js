import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
///import bootstrap from 'bootstrap'
import Toaster from '@meforma/vue-toaster';  //https://vuejsexamples.com/vue-js-toast-notification-plugin-for-vue-3/

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { faUpDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faBicycle, faPenToSquare, faPlus, faRotate, faUser, faSort, faSortUp, faSortDown, faUpDown, faAngleLeft, faAngleRight)

const store = createStore({
    state() {
        return {
            userName: '',
            accessToken: '',
            refreshToken: '',
            server: '',
            userAccessCode: '',
            accessTokenExpDate: '',
            refreshTokenExpDate: '',
            appContext: {}
        };
    },
    mutations: {
        connectToServer(state, url) { //call this from any component with this.$store.commit('connectToServer','http://localhost:57772/api/danny')
            state.server = url;
        },
        userName(state, userName) {
          state.userName = userName;
        },
        userAccessCode(state, userAccessCode) {
          state.userAccessCode = userAccessCode;
        },
        accessToken(state, accessToken) {  //call this from any component with this.$store.commit('accessToken')
            state.accessToken = accessToken;
        },
        refreshToken(state, refreshToken) {  //call this from any component with this.$store.commit('refreshToken')
            state.refreshToken = refreshToken;
        }
    },
    actions: {
        saveToken(context, payload) {  //call this with this.$store.dispatch('saveToken')
            context.commit('userName', payload.user);
            context.commit('userAccessCode', payload.userAccessCode);
            context.commit('accessToken', payload.accessToken);
            context.commit('refreshToken', payload.refreshToken);
        },
        logOut(context) {
            context.commit('userName', '');
            context.commit('accessToken', '');
            context.commit('refreshToken', '');
        },
        setServer(context, url) {
            context.commit('connectToServer', url);
        }
    },
    getters: {
        serverUrl(state) {   //this.$store.getters.serverUrl
            return state.server;
        },
        serverAccessToken(state) {
            return state.accessToken
        },
        isLoggedIn(state) {
            return (state.accessToken!=='')
        },
        user(state) {
            return (state.userName)
        },
        userAccessCode(state) {
            return (state.userAccessCode)
        }
    }
});

/// createApp(App).use(router).mount('#app')
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('vue-Datepicker', Datepicker);
app.use(router);
app.use(store);
app.use(Toaster);
app.mount('#app');
