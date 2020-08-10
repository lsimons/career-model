<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Career Model</h1>
      </v-col>
    </v-row>
    <v-row class="flex-grow-1" dense>
      <v-col cols="12">
        <CompetencyGraph v-bind:width="900" v-bind:height="900" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompetencyGraph from '../components/CompetencyGraph.vue'

export default {
  name: 'Home',
  components: {
    CompetencyGraph
  }
}
</script>
