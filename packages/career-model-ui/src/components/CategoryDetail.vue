<template>
  <div id="category-detail" style="width: 100%; height: 100%">
    <v-row class="flex-grow-0" dense>
      <v-col class="category-definition">
        {{ definition }}
      </v-col>
    </v-row>
    <v-row v-if="Object.keys(areas).length > 0" class="flex-grow-1" dense>
      <v-col>
        <h2 class="text-h6">Areas</h2>
        <ul>
          <li v-for="(area, name) in areas" :key="name">
            <competency-link :category="category" :area="name"/>:
            {{ area.definition }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { fetchCategoryDetail } from '../store/categories'
import CompetencyLink from './CompetencyLink'

export default {
  name: 'CategoryDetail',
  props: {
    category: String
  },
  data: function () {
    return {
      definition: '',
      areas: {}
    }
  },
  methods: {
    redrawCategory (categoryObj) {
      this.definition = categoryObj.definition
      this.areas = categoryObj.areas
    }
  },
  mounted () {
    const comp = this
    fetchCategoryDetail(this.category,
      categoryObj => comp.redrawCategory(categoryObj),
      error => console.error(error)
    )
  },
  components: {
    CompetencyLink
  }
}
</script>

<style scoped>
.category-definition {
  font-weight: bold;
}
</style>
