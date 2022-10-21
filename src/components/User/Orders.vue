<template>
  <v-container>
    <h1 class="d-flex justify-center">Orders</h1>
    <v-divider></v-divider>
    <v-row class="justify-center mt-5">
      <v-list
          three-line
          width="auto"
      >
          <v-list-item
              class="elevation-6"
              v-for="(order, i) in orders"
              :key="i"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox
                    color="success"
                    :input-value="order.done"
                    @change="orderDone"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{order.name}}</v-list-item-title>
                <v-list-item-subtitle>{{order.massage}}</v-list-item-subtitle>
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: 'test',
          name: 'Denys',
          phone: '11-22-33',
          massage: 'Notify me about updates to apps or games that I downloaded',
          productId: '1',
          done: false
        }
      ]
    }
  },
  methods: {
    orderDone (order) {
      order.done = true
    }
  }
};
</script>

<style scoped>

</style>
