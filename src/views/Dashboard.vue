<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col md="10">
<!--          <v-carousel :show-arrows="false">-->
<!--            <v-carousel-item-->
<!--              v-for="product in stockProducts"-->
<!--              :key="product.id"-->
<!--              :src="product.image"-->
<!--            ></v-carousel-item>-->
<!--          </v-carousel>-->
          <div class="search_form d-flex justify-center align-center">
            <v-text-field
                prepend-icon="mdi-magnify"
                v-model="search"
                label="Search"
                class="mx-4"
            ></v-text-field>
            <v-btn >
              Search
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="justify-center">
          <v-col cols="12" md="1" class="category" v-for="(category, i) in categories" :key="i">
             <v-img
                 :src="category.img"
                 aspect-ratio="1"
                 class="grey lighten-2 img"
             />
            <h3>{{category.name}}</h3>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="mt-5">
        <v-col
            lg="3"
            cols="12"
            v-for="product in products"
            :key="product.id"
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
  data () {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters(['stockProducts', 'products', 'categories']),
    loading () {
      return this.$store.getters.loading
    }
  },
  created() {
    this.$store.dispatch('fetchCategorise')
  }
};
</script>

<style scoped>
  .category {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
 .img {
   width: 88px;
   height: 88px;
   border-radius: 50%;
 }
</style>
