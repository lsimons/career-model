<template>
  <div class="home">
    <HelloWorld msg="Welcome to Career Model"/>
    <CompetencyGraph v-bind:width="900" v-bind:height="900" />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import CompetencyGraph from '../components/CompetencyGraph.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    CompetencyGraph
  }
}
</script>
