<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%">
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <router-link to="/">Home</router-link>
        &gt; <router-link v-bind:to="'/category/' + $route.params.category">{{ $route.params.category }}</router-link>
        <h4 class="title">Area: {{ $route.params.area }} </h4>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1">
      <v-col cols="4">
        <CompetencyGraph v-bind:width="200"
                         v-bind:height="200"
                         v-bind:max-level="3"
                         v-bind:category="$route.params.category"
                         v-bind:area="$route.params.area"
                         v-bind:zoom="150"
                         align="left"
                         valign="top"/>
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
