<template>
  <div id="area-detail" style="width: 100%; height: 100%">
    <v-row class="flex-grow-0" dense>
      <v-col cols="12" class="area-definition">
          {{ definition }}
      </v-col>
    </v-row>
    <div v-for="competency in competencies" :key="competency.name">
      <v-container>
        <v-row class="flex-grow-0" dense>
          <v-col cols="12">
            <h1 class="text-h4">{{ competency.longName }}</h1>
          </v-col>
        </v-row>
      </v-container>
      <CompetencyDetail v-bind:category="category"
                        v-bind:area="area"
                        v-bind:competency="competency.name"/>
      <v-container>
        <v-row class="flex-grow-0" dense>
          <v-col cols="12" class="competency-more">
            <competency-link v-bind:category="category"
                             v-bind:area="area"
                             v-bind:competency="competency.name"
                             v-bind:label="'More about ' + competency.longName"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { fetchCategoryDetail } from '../store/categories'
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
      definition: ''
    }
  },
  methods: {
    redrawCompetencies (areaData) {
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
    selectArea: function (competencyData) {
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

    fetchCategoryDetail(this.category, function (categoryData) {
      const areas = categoryData.areas
      for (const [name, area] of Object.entries(areas)) {
        if (name === comp.area) {
          comp.definition = area.definition
          break
        }
      }
    }, error => console.error(error))
  },
  components: {
    CompetencyLink,
    CompetencyDetail
  }
}
</script>

<style scoped>
.area-definition {
  font-weight: bold;
}

.competency-more {
  text-align: right;
}
</style>
