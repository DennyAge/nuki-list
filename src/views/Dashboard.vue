<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-row>
        <v-col md="12">
          <v-carousel :show-arrows="false">
            <v-carousel-item
              v-for="(product, i) in stockProducts"
              :key="i"
              :src="product.image"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row >
        <v-col
            lg="3"
            cols="12"
            v-for="(product, i) in products"
            :key="i"
        >
          <v-card
          >
            <router-link
                :aria-label="product.title"
                :to="'/product/' + product.id"
            >
              <v-img
                  :src="product.image"
                  height="400"
              ></v-img>
            </router-link>
            <v-card-title>{{product.title}}</v-card-title>
            <v-card-subtitle class="d-flex">{{product.brand}}
              <v-spacer/>
              <b>{{product.price}} ₴</b>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="deep-purple accent-2"
                  outlined
                  rounded
                  :to="'/product/' + product.id"
              >
                Details
              </v-btn>
              <BuyProduct :product="product"/>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <Loader/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Loader from '@/components/Loader';
import BuyProduct from '@/components/BuyProduct';

export default {
  components: {BuyProduct, Loader},
  computed: {
    ...mapGetters(['stockProducts', 'products']),
    loading () {
      return this.$store.getters.loading
    }
  },
};
</script>

<style scoped>

</style>
