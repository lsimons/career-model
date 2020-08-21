import YAML from 'yaml/index'
import { slug } from './util'

export function fetchCategoryDetail (category, handler, errorHandler) {
  const url = `/competencies/${slug(category)}.yaml`
  fetch(url).then(response => {
    if (!response.ok) {
      const error = `Error ${response.status} while loading ${category}!`
      errorHandler(error)
      return
    }

    response.text().then(body => {
      if (!body.startsWith('definition:')) {
        const error = `Unexpected data while loading ${category}!`
        errorHandler(error)
        return
      }

      const categoryDetailObj = YAML.parse(body)
      handler(categoryDetailObj)
    }).catch(error => {
      errorHandler(error)
    })
  }).catch(error => {
    errorHandler(error)
  })
}
