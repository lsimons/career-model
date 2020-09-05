<template>
  <div id="competency-detail" style="width: 100%; height: 100%">
    <v-container>
      <v-row class="flex-grow-1" dense>
        <v-col class="competency-definition">
          <p>{{ definition }}</p>
        </v-col>
      </v-row>
      <v-row v-if="expand" class="flex-grow-1" dense>
        <v-col v-if="books && books.length > 0" cols="12" md="6" xl="4">
          <div class="competency-books">
            <h2 class="text-h6">Books</h2>
            <ul>
              <li v-for="book in books" :key="JSON.stringify(book.isbn)"><a :data-isbn-13="book.isbn" :href="book.href">{{ book.title }}</a></li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="courses && courses.length > 0" cols="12" md="6" xl="4">
          <div class="competency-courses">
            <h2 class="text-h6">Courses</h2>
            <ul>
              <li v-for="course in courses" :key="JSON.stringify(course.href)">
                <a :href="course.href">{{ course.title}}</a>
                (<span v-if="course.free">free</span><span v-else>paid</span><span v-if="course.duration">, {{ course.duration }}</span>)
              </li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="references && references.length > 0" cols="12" md="6" xl="4">
          <div class="competency-references">
            <h2 class="text-h6">References</h2>
            <ul>
              <li v-for="reference in references" :key="JSON.stringify(reference.href)">
                <a :href="reference.href">{{ reference.title}}</a>
                - {{ reference.description }}
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row class="flex-grow-1" dense>
        <v-col v-if="behaviors && behaviors.base && behaviors.base.length > 0" cols="12" md="6" lg="4">
          <div class="competency-behavior-base">
            <h2 class="text-h6">Base behavior</h2>
            <ul>
              <li v-for="behavior in behaviors.base" :key="JSON.stringify(behavior)">{{ behavior }}</li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="behaviors && behaviors.expert && behaviors.expert.length > 0" cols="12" md="6" lg="4">
          <div class="competency-behavior-expert">
            <h2 class="text-h6">Expert behavior</h2>
            <ul>
              <li v-for="behavior in behaviors.expert" :key="JSON.stringify(behavior)">{{ behavior }}</li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="behaviors && behaviors.lead && behaviors.lead.length > 0" cols="12" md="6" lg="4">
          <div class="competency-behavior-lead">
            <h2 class="text-h6">Leadership behavior</h2>
            <ul>
              <li v-for="behavior in behaviors.lead" :key="JSON.stringify(behavior)">{{ behavior }}</li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="expand" class="flex-grow-1" dense>
        <v-col v-if="links && links.prerequisites && links.prerequisites.length > 0" cols="12" md="6" xl="4">
          <div class="competency-prerequisites">
            <h2 class="text-h6">Prerequisites</h2>
            <ul>
              <li v-for="link in links.prerequisites" :key="JSON.stringify(link)">
                <competency-link :category="link.category"
                                 :area="link.area"
                                 :competency="link.competency" expand/>
              </li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="links && links.related && links.related.length > 0" cols="12" md="6" xl="4">
          <div class="competency-related">
            <h2 class="text-h6">Related</h2>
            <ul>
              <li v-for="link in links.related" :key="JSON.stringify(link)">
                <competency-link :category="link.category"
                                 :area="link.area"
                                 :competency="link.competency" expand/>
              </li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="links && links.specializations && links.specializations.length > 0" cols="12" md="6" xl="4">
          <div class="competency-specializations">
            <h2 class="text-h6">Specializations</h2>
            <ul>
              <li v-for="link in links.specializations" :key="JSON.stringify(link)">
                <competency-link :category="link.category"
                                 :area="link.area"
                                 :competency="link.competency" expand/>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="expand" class="flex-grow-1" dense>
        <v-col v-if="learningPath" class="competency-learning-path" cols="12" xl="6">
          <h2 class="text-h6">Learning path</h2>
          <div v-html="learningPath"></div>
        </v-col>
        <v-col v-if="evaluation" class="competency-evaluation" cols="12" xl="6">
          <h2 class="text-h6">Evaluation</h2>
          <div v-html="evaluation"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { fetchCompetencyDetail } from '../store/competencies'
import CompetencyLink from './CompetencyLink'

export default {
  name: 'CompetencyDetail',
  props: {
    category: String,
    area: String,
    competency: String,
    expand: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      definition: null, // String
      books: [/* {isbn: String, href: String, title: String} */],
      courses: [/* {href: String, title: String, free?: Boolean, duration?: String} */],
      references: [/* {href: String, title: String, description?: String} */],
      behaviors: {
        base: [/* String */],
        expert: [/* String */],
        lead: [/* String */]
      },
      links: {
        prerequisites: [/* {category: String, area?: String, competency?: String} */],
        related: [/* {category: String, area?: String, competency?: String} */],
        specializations: [/* {category: String, area?: String, competency?: String} */]
      },
      learningPath: null, // html string
      evaluation: null // html String
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData () {
      const comp = this
      const category = this.category
      const area = this.area
      const competency = this.competency

      function handler (competencyDetailObj) {
        if (category !== comp.category) return
        if (area !== comp.area) return
        if (competency !== comp.competency) return

        for (const [key, value] of Object.entries(competencyDetailObj)) {
          comp[key] = value
        }
      }

      function errorHandler (s) {
        console.error(s)
      }

      fetchCompetencyDetail(category, area, competency, handler, errorHandler)
    }
  },
  components: {
    CompetencyLink
  }
}
</script>

<style scoped>
  .competency-definition {
    font-weight: bold;
  }
</style>
