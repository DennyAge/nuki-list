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
        <v-menu
            top
            :close-on-click="closeOnClick"
            min-width="200"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
                v-bind="attrs"
                v-on="on">
              <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
              >
            </v-avatar>
          </template>

          <v-list>
            <v-list-item
                v-for="accountLink in accountLink" :key="accountLink.id" :to="accountLink.path"
            >
              <v-icon>{{accountLink.icon}}</v-icon>
              <v-list-item-title class="ml-3">{{ accountLink.title }}</v-list-item-title>
            </v-list-item>
            <v-btn
                outlined
                class="mr-3"
                @click="onLogout"
                style="border: none; margin-top: 30px"
            >
              <v-icon>mdi-logout-variant</v-icon>
              Logout</v-btn>
          </v-list>
        </v-menu>
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
        <div>
          <v-avatar>
            <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
            >
          </v-avatar>
            User Name
        </div>

          <v-list-item v-for="(link, i) in links" :key="i" :to="link.path">
            <v-list-item-icon>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="accountLink in accountLink" :key="accountLink.id" :to="accountLink.path">
            <v-list-item-icon>
              <v-icon>{{accountLink.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{accountLink.title}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onLogout" v-if="isAuth" class="mt-15">
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
    closeOnClick: true,
    accountLink: [
      {id: 'orders', title: 'My Orders', icon: 'mdi-list-box-outline', path: '/orders'},
      {id: 'promo', title: 'My Promo', icon: 'mdi-shopping-search-outline', path: '/shop'},
      {id: 'newPromo', title: 'New Promo', icon: 'mdi-list-box-outline', path: '/promo'},
      {id: 'settings', title: 'Settings', icon: 'mdi-list-box-outline', path: '/settings'},
    ]
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
          {title: 'Shop', icon: 'mdi-shopping-search-outline', path: '/'},
          {title: 'Massage', icon: 'mdi-email-outline', path: '/massage'},
          {title: 'Basket', icon: 'mdi-cart-outline', path: '/basket'},
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
