<template>
  <v-container fill-height>
   <v-layout align-center justify-center>
     <v-flex xs8 sm6 md4>
       <v-card class="elevation-12"
       >
         <v-toolbar
             color="green"
         >
           <v-toolbar-title class="font-weight-bold">
             Login
           </v-toolbar-title>
         </v-toolbar>
         <v-card-text>
           <v-form ref="form" v-model="valid" lazy-validation>
             <v-text-field
                 v-model="email"
                 prepend-icon="mdi-account"
                 label="Email"
                 :rules="emailRules"
                 type="email"
             ></v-text-field>
             <v-text-field
                 v-model="password"
                 prepend-icon="mdi-lock"
                 label="Password"
                 :rules="passwordRules"
                 type="password"
             ></v-text-field>
           </v-form>
         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn
               color="deep-purple accent-2"
               @click="onSubmit"
               :loading="loading"
               :disabled="!valid || loading"
               width="120"
               class="mb-3 mr-2"
               outlined
           >
             Login
           </v-btn>
         </v-card-actions>
       </v-card>
     </v-flex>
   </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 10 characters',
      ],
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate())  {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$router.push('/')
              location.reload() // fix later
            })
            .catch(() => {})
      }
    },
  },
  created () {
    // if (this.$route.query('loginError')) {
    //   this.$store.dispatch('setError', 'Please login to access this page')
    // }
  }
};
</script>

<style scoped>

</style>
