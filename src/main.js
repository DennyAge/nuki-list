import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    const config = {
      apiKey: "AIzaSyCiXnmJmfl06tlZrwSQypNPGnjCQ_OyVJM",
      authDomain: "nuki-list.firebaseapp.com",
      databaseURL: "https://nuki-list-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "nuki-list",
      storageBucket: "nuki-list.appspot.com",
      messagingSenderId: "398164086291",
      appId: "1:398164086291:web:4538b7e2d26deb887a79e6",
      measurementId: "G-CM1TN7RJ4G"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
            .then(() => {})
      }
    })
    this.$store.dispatch('fetchPromo')
        .then(() => {})
  }
}).$mount('#app')
