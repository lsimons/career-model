<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12">
        <router-link to="/">Home</router-link>
        &gt; <router-link v-bind:to="'/category/' + $route.params.category">{{ $route.params.category }}</router-link>
        &gt; <router-link v-bind:to="'/area/' + $route.params.category + '/' + $route.params.area">{{ $route.params.area }}</router-link>
        <h4 class="title">Competency: {{ $route.params.competency }}</h4>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1" dense>
      <v-col cols="12">
        <CompetencyGraph v-bind:width="400"
                         v-bind:height="400"
                         v-bind:max-level="3"
                         v-bind:category="$route.params.category"
                         v-bind:competency="$route.params.competency" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompetencyGraph from '../components/CompetencyGraph'

export default {
  name: 'Competency',
  components: {
    CompetencyGraph
  }
}
</script>

<style scoped>
</style>
