<template>
  <v-container>
      <div>
        <h1 class="d-flex justify-center">Orders</h1>
        <v-divider></v-divider>
      </div>
    <Loader v-if="loading"/>
    <v-row class="justify-center mt-5" v-else-if="!loading && orders.length !== 0">
      <v-col md="8">
        <v-list
            three-line
            width="auto"
        >
          <v-list-item
              class="elevation-6 mt-5"
              v-for="order in orders"
              :key="order.id"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                    color="success"
                    :input-value="order.done"
                    @change="orderDone(order)"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{order.name}}</v-list-item-title>
                <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                    class="primary"
                    :to="'/product/' + order.productId"
                >
                  Open</v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <div v-else>
      <h1>You dont have orders : (</h1>
    </div>
  </v-container>
</template>

<script>
import Loader from '@/components/Loader';
export default {
  components: {Loader},
  data () {
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    orderDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
          .then(() => {
            order.done = true
          })
    }
  },
  created() {
    this.$store.dispatch('fetchOrders')
  }
};
</script>

<style scoped>

.v-list--three-line .v-list-item .v-list-item__avatar,
.v-list--three-line .v-list-item .v-list-item__action, .v-list-item--three-line .v-list-item__avatar,
.v-list-item--three-line .v-list-item__action {
  align-self: center;
}
</style>
