<template>
  <v-container class="home d-flex flex-column" fluid style="min-height: 100%">
    <v-row class="flex-grow-1 flex-sm-wrap" dense>
      <v-col cols="6">
        <!--<h4 class="title graph-title">Software<br>Production<br>Competencies</h4>-->
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="3" category="Software Production" />
      </v-col>
      <v-col cols="6">
        <!--<h4 class="title graph-title" style="right: 10px">Software<br>Management<br>Competencies</h4>-->
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="3" category="Software Management"/>
      </v-col>
    </v-row>

    <v-row class="flex-grow-1" dense>
      <v-col cols="6">
        <!--<h4 class="title graph-title">Technical<br>Competencies</h4>-->
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="3" category="Software Technology"/>
      </v-col>
      <v-col cols="6">
        <!--<h4 class="title graph-title" style="right: 10px">General<br>Competencies</h4>-->
        <CompetencyGraph v-bind:width="200" v-bind:height="200" v-bind:max-level="3" category="General"/>
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

<style scoped>
.graph-title {
  display: inline-block;
  position: absolute;
}
</style>
