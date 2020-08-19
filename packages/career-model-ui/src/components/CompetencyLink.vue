<template>
  <span v-if="expand">
    <router-link v-bind:to="'/category/' + category">{{ category }}</router-link>
    <span v-if="area">
      &gt; <router-link v-bind:to="'/category/' + category + '/' + area">{{ area }}</router-link>
      <span v-if="competency">
        &gt; <router-link v-bind:to="'/category/' + category + '/' + area + '/' + competency">{{ competency }}</router-link>
      </span>
    </span>
  </span>
  <router-link v-else v-bind:to="path">{{ drawLabel }}</router-link>
</template>

<script>
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
      if (this.area) {
        if (this.competency) {
          return '/competency/' + this.category + '/' + this.area + '/' + this.competency
        } else {
          return '/area/' + this.category + '/' + this.area
        }
      } else {
        if (this.competency) {
          console.error(`Defined competency-link with competency '${this.competency}' but no parent area!`)
        }
        return '/category/' + this.category
      }
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
