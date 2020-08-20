<template>
  <span v-if="expand">
    <router-link v-bind:to="'/category/' + category">{{ category }}</router-link>
    <span v-if="area">
      &gt; <router-link v-bind:to="'/area/' + category + '/' + area">{{ area }}</router-link>
      <span v-if="competency">
        &gt; <router-link v-bind:to="'/competency/' + category + '/' + area + '/' + competency">{{ competency }}</router-link>
      </span>
    </span>
  </span>
  <router-link v-else v-bind:to="path">{{ drawLabel }}</router-link>
</template>

<script>
import { competencyLinkPath } from '../store/competencies'

export default {
  name: 'CompetencyLink',
  props: {
    category: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: false
    },
    competency: {
      type: String,
      required: false
    },
    expand: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false
    }
  },
  computed: {
    path: function () {
      return competencyLinkPath(this.category, this.area, this.competency)
    },
    drawLabel: function () {
      if (this.label) {
        return this.label
      }
      if (this.area) {
        if (this.competency) {
          return this.competency
        } else {
          return this.area
        }
      } else {
        return this.category
      }
    }
  }
}
</script>
