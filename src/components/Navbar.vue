<template>
<div>

    <v-app-bar
        color="green"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <router-link to="/" class="d-flex align-center ml-5 logo">
        <v-img src="../assets/logo.png" height="40" width="40"></v-img>
        <v-toolbar-title class="ml-3">Nuki Shop</v-toolbar-title>
      </router-link>
      <v-spacer/>
     <div v-for="(link, i) in links" :key="i">
       <v-btn
           color="deep-purple accent-2"
           :to="link.path"
           class="mr-3"
       >
         <v-icon>{{link.icon}}</v-icon>
         {{link.title}}</v-btn>
     </div>
      <div v-if="isAuth">
        <v-btn
            color="deep-purple accent-2"
            class="mr-3"
            @click="onLogout"
        >
          <v-icon>mdi-logout-variant</v-icon>
          Logout</v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="light-green lighten-5"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(link, i) in links" :key="i" :to="link.path">
            <v-list-item-icon>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onLogout" v-if="isAuth">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
          .then(() => {
            this.$router.push('/')
          })
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    },
    links () {
      if (this.isAuth) {
        return [
          {title: 'My Promo', icon: 'mdi-shopping-search-outline', path: '/shop'},
          {title: 'New Promo', icon: 'mdi-list-box-outline', path: '/promo'},
          {title: 'Basket', icon: 'mdi-cart-outline', path: '/basket'},
          {title: 'Orders', icon: 'mdi-list-box-outline', path: '/orders'}
        ]
      }
      return [
        {title: 'Sign Up', icon: 'mdi-account-plus-outline', path: '/registration'},
        {title: 'Sign In', icon: 'mdi-login-variant', path: '/login'},
      ]
    }
  }
};
</script>

<style scoped>
.logo {
  text-decoration: none;
  color: white;
}

</style>
