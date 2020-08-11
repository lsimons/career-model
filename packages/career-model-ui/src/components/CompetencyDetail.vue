<template>
  <div id="competency-detail" style="width: 100%; height: 100%">
    <span v-html="detail"></span>
  </div>
</template>

<script>
import { loadCompetency } from '../store/competencies'

export default {
  name: 'CompetencyDetail',
  props: {
    category: String,
    area: String,
    competency: String
  },
  data: function () {
    return {
      detail: '<p>Loading...</p>'
    }
  },
  methods: {
    redrawCompetency (competencyDetail) {
      console.log('competencyDetail', competencyDetail)
      this.detail = '<p>No detail available</p>'
    }
  },
  mounted () {
    const comp = this
    loadCompetency(this.category, this.area, this.competency, function (competencyDetail) {
      comp.redrawCompetency(competencyDetail)
    })
  }
}
</script>

<style scoped>
</style>
