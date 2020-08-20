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
      <v-col cols="12" sm="6" md="4" style="min-height: 300px; max-height: 600px">
        <CompetencyGraph v-bind:width="300"
                         v-bind:height="300"
                         v-bind:max-level="99"
                         v-bind:category="$route.params.category"
                         v-bind:area="$route.params.area"
                         v-bind:zoom="150"
                         align="left"
                         valign="top"/>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <AreaDetail
                    v-bind:category="$route.params.category"
                    v-bind:area="$route.params.area"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompetencyGraph from '../components/CompetencyGraph'
import AreaDetail from '../components/AreaDetail'

export default {
  name: 'Competency',
  components: {
    CompetencyGraph,
    AreaDetail
  }
}
</script>

<style scoped>
</style>
