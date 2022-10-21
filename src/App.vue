<template>
  <v-app>
   <Navbar/>
    <template v-if="error">
      <v-snackbar
          :multi-line="true"
          :timeout="5000"
          color="error"
          @input="closeError"
          :value="true"
      >
        <div class="d-flex align-center">
                <span>
                {{ error }}
              </span>
          <v-btn
              color="black"
              text
              @click.native="closeError"
          >
            Close
          </v-btn>
        </div>
      </v-snackbar>
    </template>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar';
export default {
  name: 'App',
  components: {Navbar},
  data: () => ({
    //
  }),
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  }
};
</script>
