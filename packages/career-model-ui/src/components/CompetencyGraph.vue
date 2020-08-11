<template>
  <div class="competency-graph" style="width: 100%; height: 100%">
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { load as loadCompetencies } from '../store/competencies'

const areaColorMap = {
  Requirements: '#fed9a6',
  Design: '#ffffcc',
  Construction: '#f2f2f2',
  Test: '#ccebc5',
  Quality: '#e6f5c9',
  DevOps: '#f1e2cc',
  Foundations: '#fff2ae',
  Domain: '#fbb4ae',
  'Project Management': '#fddaec',
  Company: '#cccccc',
  Leadership: '#b3e2cd',
  Process: '#fdcdac',

  Technology: '#b3cde3',
  'Web Frontend': '#d3cde3',
  'Web Backend': '#d3cde3',
  Data: '#b3dde3',
  Cloud: '#b3dde3',
  Languages: '#b3cdd3',
  Tools: '#b3cdd3',
  'Operating Systems': '#b3cdd3',
  Mobile: '#b3cdf3',
  Desktop: '#b3cdf3',
  AI: '#c3dde3',
  IoT: '#c3dde3',
  Platform: '#b3ddf3',
  Integration: '#b3ddf3'
}

const areas = []
const colorScheme = []
for (const [area, color] of Object.entries(areaColorMap)) {
  areas.push(area)
  colorScheme.push(color)
}
colorScheme.push([
  '#f4cae4',
  '#cbd5e8',
  '#decbe4',
  '#e5d8bd'])

const categoryColor = '#eef'

const areaColors = d3.scaleOrdinal()
  .domain(areas)
  .range(colorScheme)

class CompetencySimulation {
  constructor (data, width, height) {
    this.data = data
    this.width = width
    this.height = height
    this.radius = Math.min(
      50,
      Math.max(10,
        Math.min(this.width / 20, this.height / 20))
    )
    this.margin = Math.max(5, this.radius / 5)
    this.distance = this.margin * 1.2
  }

  setup () {
    const sim = this
    this.root = d3.hierarchy(this.data)
    this.links = this.root.links()
    this.nodes = this.root.descendants()

    // noinspection JSCheckFunctionSignatures
    this.simulation = d3
      .forceSimulation(this.nodes)
      // .stop()
      .force('center', d3.forceCenter(this.width / 2, this.height / 1.99))
      .force('link',
        d3
          .forceLink(this.links)
          .id(d => d.id)
          .distance(function (l) {
            // noinspection JSUnresolvedVariable
            const source = l.source.data || {}
            const target = l.target.data || {}
            if (source.type === 'Category' || target.type === 'Category') {
              return sim.distance + sim.radius * 3
            } else if (source.type === 'Area' || target.type === 'Area') {
              return sim.distance + sim.radius
            } else {
              return sim.distance + sim.radius
            }
          })
          .strength(function (l) {
            // noinspection JSUnresolvedVariable
            const source = l.source.data || {}
            const target = l.target.data || {}
            if (source.type === 'Category' || target.type === 'Category') {
              return 0.9
            } else if (source.type === 'Area' || target.type === 'Area') {
              return 0.5
            } else {
              return 0.5
            }
          }))
      .force('charge', d3.forceManyBody().strength(function (d) {
        // noinspection JSUnresolvedVariable
        const data = d.data || {}
        if (data.type === 'Category') {
          return -1
        } else if (data.type === 'Area') {
          return -0.3
        } else {
          return -0.2
        }
      }))
      .force('collide', d3.forceCollide().radius(function (d) {
        // noinspection JSUnresolvedVariable
        const data = d.data || {}
        if (data.type === 'Category') {
          return sim.margin + sim.radius * 3
        } else if (data.type === 'Area') {
          return sim.margin + sim.radius * 2
        } else {
          return sim.margin + sim.radius
        }
      }).iterations(2))
  }

  redrawLinks (selection) {
    this.linkSelection = selection.selectAll('line')
      .data(this.links)
      .join('line')
  }

  redrawNodes (selection) {
    const sim = this
    // noinspection JSCheckFunctionSignatures
    this.nodeSelection = selection.selectAll('circle')
      .data(this.nodes)
      .join('circle')
      .attr('fill', function (d) {
        const data = d.data || {}
        if (data.type === 'Category') {
          return categoryColor
        } else {
          return areaColors(data.area)
        }
      })
      .attr('r', function (d) {
        const data = d.data || {}
        if (data.type === 'Category') {
          return sim.radius * 2
        } else if (data.type === 'Area') {
          return sim.radius * 1.5
        } else {
          return sim.radius
        }
      })
    this.nodeSelection = this.addOnClick(this.nodeSelection)
  }

  addOnClick (selection) {
    return selection.attr('onclick', function (d) {
      const data = d.data || {}
      if (data.type === 'Category') {
        return `router.push("/category/${data.name}");`
      } else if (data.type === 'Area') {
        return `router.push("/area/${data.name}");`
      } else {
        return `router.push("/competency/${data.name}");`
      }
    })
      .style('cursor', 'pointer')
  }

  redrawNodeLabels (selection) {
    // noinspection JSCheckFunctionSignatures
    this.nodeLabelSelection = selection.selectAll('text')
      .data(this.nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .style('text-shadow', function (d) {
        const data = d.data || {}
        let color = categoryColor
        if (data.type !== 'Category') {
          color = areaColors(data.area)
        }
        return `0 2px 0 ${color}, 2px 0 0 ${color}, 0 -2px 0 ${color}, -2px 0 0 ${color}`
      })
      .text(d => d.data.name)
    this.nodeLabelSelection = this.addOnClick(this.nodeLabelSelection)
  }

  animate () {
    const sim = this
    // setTimeout(function() {
    //   sim.simulation.stop()
    // }, 10000)

    function boundedX (d) {
      let radius = sim.radius
      if (d.type && d.type === 'Area') {
        radius = radius * 3
      } else if (d.data && d.data.type === 'Category') {
        radius = radius * 5
      }

      // right margin
      d.x = Math.min(sim.width - radius - sim.margin * 3, d.x)
      // left margin
      d.x = Math.max(d.x, Math.min(radius + sim.margin * 3))
      return d.x
    }

    function boundedY (d) {
      let radius = sim.radius
      if (d.type && d.type === 'Area') {
        radius = radius * 2
      } else if (d.data && d.data.type === 'Category') {
        radius = radius * 3
      }

      // bottom margin
      d.y = Math.min(sim.height - radius - sim.margin * 3, d.y)
      // top margin
      d.y = Math.max(d.y, Math.min(radius + sim.margin * 3))
      return d.y
    }

    function returnX (d) {
      return d.x
    }

    function returnYOffset (d) {
      return d.y + 5
    }

    this.simulation.on('tick', () => {
      sim.linkSelection
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      sim.nodeSelection
        .attr('cx', boundedX)
        .attr('cy', boundedY)

      sim.nodeLabelSelection
        .attr('x', returnX)
        .attr('y', returnYOffset)
    })
    this.simulation.restart()
  }

  stop () {
    if (this.simulation) {
      this.simulation.stop()
    }
  }

  redraw
}

export default {
  name: 'CompetencyGraph',
  props: {
    category: String,
    width: Number,
    height: Number,
    maxLevel: Number
  },
  data: function () {
    return {
    }
  },
  methods: {
    selectSvg: function () {
      return d3.select(this.$el.querySelector('svg'))
    },
    drawWidth () {
      if (this.selections && this.selections.svg) {
        return Math.max(this.width, this.selections.svg.node().getBoundingClientRect().width)
      } else {
        return this.width
      }
    },
    drawHeight () {
      if (this.selections && this.selections.svg) {
        return Math.max(this.height, this.selections.svg.node().getBoundingClientRect().height)
      } else {
        return this.height
      }
    },
    setupSelections: function () {
      this.selections = {}
      this.selections.svg = this.selectSvg()
      this.selections.graph = this.selections.svg.append('g')

      this.selections.links = this.selections.graph.append('g')
        .attr('stroke', '#000')
        .attr('stroke-opacity', 1)
      this.selections.nodes = this.selections.graph.append('g')
        .attr('fill', '#FFF')
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
      this.selections.nodeLabels = this.selections.graph.append('g')
        .attr('font-family', 'Arial, Helvetica, sans-serif')
    },
    redrawCompetencies: function (competencyData) {
      const vm = this
      function redraw () {
        vm.sim = new CompetencySimulation(competencyData, vm.drawWidth(), vm.drawHeight())
        vm.sim.setup()
        vm.sim.redrawLinks(vm.selections.links)
        vm.sim.redrawNodes(vm.selections.nodes)
        vm.sim.redrawNodeLabels(vm.selections.nodeLabels)
        vm.sim.animate()
      }
      redraw()

      window.addEventListener('resize', function () {
        if (vm.sim) {
          vm.sim.stop()
        }
        redraw()
      })
    }
  },
  mounted () {
    this.setupSelections()

    const comp = this
    loadCompetencies(this.category, this.maxLevel, function (competencyData) {
      comp.redrawCompetencies(competencyData)
    })
  }
}
</script>

<style scoped>
</style>
