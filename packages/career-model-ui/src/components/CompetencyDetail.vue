<template>
  <div id="competency-detail" style="width: 100%; height: 100%">
    <span v-html="detail"></span>
    <div class="competency-definition">
      <p>Coding is creating software by writing source code.</p>
    </div>
    <div class="competency-references">
      <h6>References:</h6>
      <ul>
        <li><a data-isbn-13="978-0735619678" data-isbn-10="0735619670" href="https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670">Code Complete</a></li>
        <li><a data-isbn-13="978-0132350884" data-isbn-10="9780132350884" href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-dp-0132350882/dp/0132350882/">Clean Code</a></li>
      </ul>
    </div>
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
  .competency-definition {
    font-weight: bold;
  }
</style>
