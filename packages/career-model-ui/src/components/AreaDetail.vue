<template>
  <div id="area-detail" style="width: 100%; height: 100%">
    <div v-for="competency in competencies" :key="competency.name">
      <v-container>
        <v-row class="flex-grow-1" dense>
          <h1 class="text-h4">{{ competency.longName }}</h1>
        </v-row>
      </v-container>
      <CompetencyDetail
                        v-bind:category="category"
                        v-bind:area="area"
                        v-bind:competency="competency.name"/>
      <v-container>
        <v-row class="flex-grow-1" dense>
          <div class="competency-more">
            <competency-link v-bind:category="category"
                             v-bind:area="area"
                             v-bind:competency="competency.name"
                             v-bind:label="'More about ' + competency.longName"/></div>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { loadCompetencies } from '../store/competencies'
import CompetencyDetail from './CompetencyDetail'
import CompetencyLink from './CompetencyLink'

export default {
  name: 'AreaDetail',
  props: {
    category: String,
    area: String
  },
  data: function () {
    return {
      competencies: [],
    }
  },
  methods: {
    redrawCompetencies (areaData) {
      console.log('areaData', areaData)
      this.competencies = this.flattenCompetencies(areaData, [])
    },
    flattenCompetencies: function (parent, accumulator) {
      for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children[i]
        accumulator.push(child)
        child.longName = child.name
        if (parent.longName) {
          child.longName = parent.longName + ' - ' + child.name
        }
        const children = child.children
        if (children && children.length > 0) {
          this.flattenCompetencies(child, accumulator)
        }
      }
      return accumulator
    },
    selectArea: function (competencyData) { // todo shared with CompetencyDetail
      if (!this.area || this.area === '') {
        return competencyData
      }
      const areas = competencyData.children
      for (let i = 0; i < areas.length; i++) {
        const areaObj = areas[i]
        if (areaObj.name === this.area) {
          return areaObj
        }
      }
      console.error(`Area '${this.area}' not found!`)
      return {}
    }
  },
  mounted () {
    const comp = this
    loadCompetencies(this.category, 99, function (competencyData) {
      const areaData = comp.selectArea(competencyData)
      comp.redrawCompetencies(areaData)
    })
  },
  components: {
    CompetencyLink,
    CompetencyDetail
  }
}
</script>

<style scoped>
.competency-more {
  text-align: right;
}
</style>
