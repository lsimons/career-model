<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%">
    <v-row class="flex-grow-1" dense>
      <v-col cols="12" md="6">
        try 'Coding' to see a fleshed-out competency
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="1" category="Software Production" />
      </v-col>
      <v-col cols="12" md="6">
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="1" category="Software Management"/>
      </v-col>
    </v-row>

    <v-row class="flex-grow-1" dense>
      <v-col cols="12" md="6">
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="1" category="Software Technology"/>
      </v-col>
      <v-col cols="12" md="6">
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="1" category="General"/>
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
