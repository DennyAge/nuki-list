<template>
  <v-container>
    <h1 class="d-flex justify-center mt-5">Create New Promo</h1>
    <v-row class="justify-center mt-5">
      <v-col md="6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
              v-model="title"
              label="Title"
              :rules="[v => !!v || 'Title is require']"
              type="text"
              required
          ></v-text-field>
          <v-text-field
              v-model="brand"
              label="Brand"
              :rules="[v => !!v || 'Brand is require']"
              type="text"
          ></v-text-field>
          <v-text-field
              v-model="color"
              label="Color"
              :rules="[v => !!v || 'Color is require']"
              type="text"
          ></v-text-field>
          <v-text-field
              v-model="description"
              label="Description"
              :rules="[v => !!v || 'Description is require']"
              type="text"
          ></v-text-field>
          <v-text-field
              v-model="price"
              label="Price"
              :rules="[v => !!v || 'Price is require']"
              type="number"
              required
          ></v-text-field>
        </v-form>
        <v-row>
          <v-col md="6">
            <v-btn class="warning" @click="upload">Upload
              <v-icon>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
                ref="fileInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="onFileChange"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-img :src="image" height="250" width="250" v-if="image"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-switch
                color="primary"
                label="Add to Stock?"
                v-model="stock"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col md="3">
           <v-btn
               :loading="loading"
               class="success"
               @click="createPromo"
               :disabled="!valid || !img || loading"
           >Create new promo</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      brand: '',
      color: '',
      description: '',
      price: '',
      image: '',
      stock: false,
      valid: false,
      img: null
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createPromo () {
      if (this.$refs.form.validate() && this.img) {
        const product = {
          title: this.title,
          brand: this.brand,
          color: this.color,
          description: this.description,
          price: this.price,
          img: this.img,
          stock: this.stock,
        }
        this.$store.dispatch('createProduct', product)
            .then(() => {
              this.$router.push('/shop')
            })
            .catch(() => {})
      }
    },
    upload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.image = reader.result
      }
      reader.readAsDataURL(file)
      this.img = file
    }
  }
};
</script>

<style scoped>

</style>
