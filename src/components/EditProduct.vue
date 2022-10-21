<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{on}">
      <v-btn color="primary" @click="dialog = !dialog">Edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row class="flex-column">
          <v-col xs="12">
            <v-card-title>
              Edit Product
            </v-card-title>
          </v-col>
          <v-divider/>
          <v-col xs="12">
            <v-card-text>
              <v-text-field
                  v-model="editTitle"
                  label="Title"
                  type="text"
              ></v-text-field>
              <v-text-field
                  v-model="editBrand"
                  label="Brand"
                  type="text"
              ></v-text-field>
              <v-text-field
                  v-model="editPrice"
                  label="Price"
                  type="number"
              ></v-text-field>
              <v-text-field
                  v-model="editColor"
                  label="Color"
                  type="text"
              ></v-text-field>
              <v-text-field
                  v-model="editDescription"
                  label="Description"
                  type="text"
                  multi-line
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-divider/>
          <v-col xs="12">
            <v-card-actions>
              <v-spacer/>
              <v-btn dark color="error" outlined @click="onCancel">Cancel</v-btn>
              <v-btn dark color="primary" @click="onSave">Save</v-btn>
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
      editTitle: this.product.title,
      editBrand: this.product.brand,
      editPrice: this.product.price,
      editColor: this.product.color,
      editDescription: this.product.description,
    }
  },
  methods: {
    onCancel () {
      this.dialog = false
    },
    onSave () {
      if (this.editTitle !== '' && this.editBrand !== '' && this.editColor && this.editPrice !== '' && this.editDescription !== '') {
        this.$store.dispatch('updateProduct',  {
          title: this.editTitle,
          brand: this.editBrand,
          price: this.editPrice,
          color: this.editColor,
          description: this.editDescription,
          id: this.product.id
        })
        this.dialog = false
      }
    }
  }
};
</script>

<style scoped>

</style>
