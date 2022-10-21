<template>
  <v-container>
    <h1 class="d-flex justify-center mt-5">My Product</h1>
    <v-row class="justify-center mt-5">
      <v-col xs="12" sm="6">
        <div
            class="elevation-10 mb-10"
            v-for="(product, i) in myPromo"
            :key="i"
        >
          <v-row class="">
            <v-col md="4">
              <v-img :src="product.image" height="250" width="250"/>
            </v-col>
            <v-col md="8" class="d-flex">
              <v-card-text>
                <h2 class="text--primary">{{product.title}}</h2>
                <br>
                <p>{{product.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                    class="info"
                    :to="'/product/' + product.id"
                >Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters(['products', 'myPromo']),
  },
};
</script>

<style scoped>

</style>
