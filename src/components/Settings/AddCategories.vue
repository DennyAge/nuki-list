<template>
  <v-container>
    <h1>
      Add New Category
    </h1>
    <v-row>
      <v-col md="4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
              v-model="category"
              label="Category name"
              :rules="CategoryRules"
              type="text"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-btn
        color="deep-purple accent-2"
        :loading="loading"
        @click="onSubmit"
        :disabled="!valid || loading"
        width="120"
        class="mb-3 mr-2"
        outlined
    >Add </v-btn>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      category: '',
      CategoryRules: [
        v => !!v || 'Category name is required',
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate())  {
        const data = {
          name: this.category,
        }
        this.$store.dispatch('createCategory', data)
      }
    },
  },
};
</script>

<style scoped>

</style>
