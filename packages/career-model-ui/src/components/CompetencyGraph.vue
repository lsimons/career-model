<template>
  <div class="competency-graph"
       :style="{ width: width + 'px', height: height + 'px' }">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
export default {
  name: 'CompetencyGraph',
  props: {
    width: Number,
    height: Number
  },
  mounted () {
    console.log('mounted competency graph')

    // this.els = {}
    // this.els.svg = d3.select(this.$el.querySelector('svg'))
    // this.els.graph = this.els.svg.append('g')
    //
    // this.els.linkLayer = this.els.graph.append('g')
    //   .attr('stroke', '#000')
    //   .attr('stroke-opacity', 1)
    // this.els.nodeLayer = this.els.graph.append('g')
    //   .attr('fill', '#FFF')
    //   .attr('stroke', '#000')
    //   .attr('stroke-width', 1.5)
    // this.els.nodeLabelLayer = this.els.graph.append('g')
    //   .attr('font-family', 'Arial, Helvetica, sans-serif')
  }
}
</script>

<style scoped>
.competency-graph {
  border: 1px solid black;
  box-sizing: border-box;
}
</style>
