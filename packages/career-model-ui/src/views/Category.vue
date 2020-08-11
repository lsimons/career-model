<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%">
    <v-row class="flex-grow-1" dense>
      <v-col cols="12">
        <router-link to="/">&lt;&lt; Home</router-link>
        <h4 class="title">Category</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Category'
}
</script>

<style scoped>
</style>
