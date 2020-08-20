<template>
  <v-container class="home d-flex flex-column" fluid>
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <router-link to="/">Home</router-link>
        &gt; <competency-link v-bind:category="$route.params.category"/>
        &gt; <competency-link v-bind:category="$route.params.category" v-bind:area="$route.params.area"/>
        <h1 class="text-h4 title">Competency: {{ $route.params.competency }}</h1>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1">
      <v-col cols="12" sm="6" md="4" style="min-height: 300px; max-height: 600px">
        <CompetencyGraph v-bind:width="300"
                         v-bind:height="300"
                         v-bind:max-level="99"
                         v-bind:category="$route.params.category"
                         v-bind:area="$route.params.area"
                         v-bind:competency="$route.params.competency"
                         v-bind:zoom="200"
                         align="left"
                         valign="top"/>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <CompetencyDetail expand
          v-bind:category="$route.params.category"
          v-bind:area="$route.params.area"
          v-bind:competency="$route.params.competency"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompetencyGraph from '../components/CompetencyGraph'
import CompetencyDetail from '../components/CompetencyDetail'
import CompetencyLink from '../components/CompetencyLink'

export default {
  name: 'Competency',
  components: {
    CompetencyGraph,
    CompetencyDetail,
    CompetencyLink
  }
}
</script>

<style scoped>
</style>
