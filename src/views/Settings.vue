<template>
<div class="d-flex">
  <v-card
      width="400"
      max-width="300"
      tile
  >
    <v-list shaped>
      <v-list-item-group
          v-model="selectedItem"
          color="primary"
      >
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  <v-container>
    <div v-if="selectedItem === 0">
      item 1
    </div>
    <div v-if="selectedItem === 1">
      <AddCategories/>
    </div>
    <div v-if="selectedItem === 2">
      item 3
    </div>
  </v-container>
</div>
</template>

<script>
import AddCategories from '@/components/Settings/AddCategories';
export default {
  components: {AddCategories},
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'Add Users', icon: 'mdi-account' },
      { text: 'Add Categories', icon: 'mdi-flag' },
      { text: 'Statistics', icon: 'mdi-clock' },
    ],
  }),
  methods: {
  }
};
</script>

<style scoped>

</style>
