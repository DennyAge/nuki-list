<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{on}">
      <v-btn color="deep-purple accent-2" class="ml-3" @click="dialog = !dialog">Buy</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row class="flex-column">
          <v-col xs="12">
            <v-card-title>
              Buy: {{product.title}}
            </v-card-title>
          </v-col>
          <v-col xs="12">
            <v-card-text>
              <v-text-field
                  v-model="name"
                  label="Enter your name"
                  type="text"
              ></v-text-field>
              <v-text-field
                  v-model="phone"
                  label="Enter your phone"
                  type="text"
              ></v-text-field>
              <v-text-field
                  v-model="address"
                  label="Enter yor Address"
                  type="text"
                  multi-line
              ></v-text-field>
              <v-text-field
                  v-model="massage"
                  label="Enter yor massage"
                  type="text"
                  multi-line
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-divider/>
          <v-col xs="12">
            <v-card-actions>
              <v-spacer/>
              <v-btn
                  dark
                  color="error"
                  outlined
                  :disabled="localLoading"
                  @click="onCancel"
              >Close</v-btn>
              <v-btn
                  dark
                  color="primary"
                  :disabled="localLoading"
                  :loading="localLoading"
                  @click="byProduct"
              >Sent</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      dialog: false,
      name: '',
      phone: '',
      address: '',
      massage: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.dialog = false
    },
    byProduct () {
      if (this.name !== '' && this.phone !== '' && this.address !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder' , {
          name: this.name,
          phone: this.phone,
          address: this.address,
          message: this.massage,
          productId: this.product.id,
          ownerId: this.product.ownerId
        })
            .finally(() => {
              this.name = ''
              this.phone = ''
              this.address = ''
              this.massage = ''
              this.localLoading = false
              this.dialog = false
            })
      }
    }
  }
};
</script>

<style scoped>

</style>
