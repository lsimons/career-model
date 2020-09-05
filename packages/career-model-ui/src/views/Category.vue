<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%" v-if="$route.params.category">
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <router-link to="/">Home</router-link>
        <h4 class="title">Category: {{ $route.params.category }}</h4>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1">
      <v-col cols="12" md="8" style="min-height: 400px;">
        <CompetencyGraph :width="400"
                         :height="400"
                         :max-level="99"
                         :category="$route.params.category" />
      </v-col>
      <v-col cols="12" md="4">
        <CategoryDetail :category="$route.params.category"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompetencyGraph from '../components/CompetencyGraph'
import CategoryDetail from '../components/CategoryDetail'

export default {
  name: 'Category',
  components: {
    CompetencyGraph,
    CategoryDetail
  }
}
</script>

<style scoped>
</style>
