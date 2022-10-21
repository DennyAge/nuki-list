<template>
  <v-container>
    <section class="product mt-3 elevation-10" v-if="!loading">
      <v-row class="flex-wrap">
        <v-col xs="12" lg="5">
          <v-img :src="product.image" class="product_img" />
        </v-col>
        <v-col xs="12" lg="7">
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{product.title}}</h5>
            <p class="product_category title">
              <span class="product_title">Brand: </span>{{product.brand}}
            </p>
            <p class="product_category title">
              <span class="product_title">Price: </span>{{product.price}}
            </p>
            <p class="product_color title">
              <span class="product_title">Color: </span>
              <span
                  :title="product.color"
                  :style="{backgroundColor: product.color}"
                  class="product_color_bg"
              ></span>
            </p>
            <p class=" title">
              <span class="product_title">Description: </span>{{product.description}}
            </p>
             <div class="mt-15">
               <EditProduct :product="product" v-if="isOwner"/>
<!--               <v-btn color="error" class="ml-3">Delete</v-btn>-->
               <BuyProduct :product="product"/>
             </div>
          </div>
        </v-col>
      </v-row>
    </section>
    <Loader v-else/>
  </v-container>
</template>

<script>
import EditProduct from '@/components/EditProduct';
import Loader from '@/components/Loader';
import BuyProduct from '@/components/BuyProduct';
export default {
  components: {BuyProduct, Loader, EditProduct},
  props: ['id'],
  computed: {
    product () {
      const id = this.id
      return this.$store.getters.productById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.product.ownerId === this.$store.getters.user.id
    }
  }

};
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 30px;
    margin-bottom: 100px;
  }
  .product_img {
    height: 100%;
    width: 550px;
  }
  .product_info {
    margin-left: 50px;
  }
  .product_title {
    font-size: 1.6rem;
    font-weight: 700;
  }
  .product_color {
    display: flex;
    align-items: center;
  }
  .product_color_bg {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid grey;
    border-radius: 50%;
    margin-left: 10px;
  }
</style>
