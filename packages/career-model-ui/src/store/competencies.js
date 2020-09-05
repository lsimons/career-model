import {parse as csvParse} from 'papaparse'
import YAML from 'yaml/index'
import {slug} from "./util";

class CompetenciesLoader {
  constructor (category, maxLevel, baseUrl) {
    this.category = category
    this.maxLevel = maxLevel
    this.baseUrl = baseUrl
    this.categoryObj = {
      name: category,
      type: 'Category',
      children: []
    }
  }

  get categorySlug () {
    return slug(this.category)
  }

  get dataUrl () {
    return new URL(`/competency-list-${this.categorySlug}.csv`, this.baseUrl).toString()
  }

  ensureArea (name) {
    const area = name.trim()
    const areas = this.categoryObj.children
    for (let i = 0; i < areas.length; i++) {
      if (areas[i].name === area) {
        return areas[i]
      }
    }
    const areaObject = {
      name: area,
      type: 'Area',
      area: area,
      category: this.category,
      children: []
    }
    this.categoryObj.children.push(areaObject)
    return areaObject
  }

  ensureCompetency (areaName, competencyNames, level, parent) {
    const area = areaName.trim()
    if (parent === undefined) {
      parent = this.ensureArea(areaName)
    }
    if (competencyNames.length === 0 || this.maxLevel === 0) {
      return
    }
    const competencyList = []
    for (let i = 0; i < competencyNames.length; i++) {
      competencyList.push(competencyNames[i].trim())
    }

    const competency = competencyList[0]
    const children = parent.children
    let competencyObject
    for (let i = 0; i < children.length; i++) {
      if (children[i].name === competency) {
        competencyObject = children[i]
        break
      }
    }
    if (competencyObject === undefined) {
      competencyObject = {
        name: competency,
        type: 'Competency',
        area: area,
        category: this.category,
        children: []
      }
      parent.children.push(competencyObject)
    }

    if (competencyList.length > 1 && level < this.maxLevel) {
      const childCompetencies = competencyList.slice(1)
      this.ensureCompetency(area, childCompetencies, level + 1, competencyObject)
    }
  }

  loadCompetencies (onComplete) {
    const loader = this

    csvParse(this.dataUrl, {
      worker: true,
      download: true,
      skipEmptyLines: true,
      comments: '#',
      step: function (row) {
        const areaName = row.data[0]
        const competencyNames = row.data.slice(1)
        loader.ensureCompetency(areaName, competencyNames, 1)
      },
      complete: function () {
        onComplete(loader.categoryObj)
      }
    })
  }
}

export function loadCompetencies (category, maxLevel, onComplete, baseUrl = document.location.href) {
  const loader = new CompetenciesLoader(category, maxLevel, baseUrl)
  loader.loadCompetencies(onComplete)
}

export function parseBehaviors (s) {
  /*
    from
         `   abc def g
          def ghi  `
    to
        ['abc def g', 'def ghi']
  */
  return s.trim().replace(/\r\n/g, '\n').split('\n').flatMap(x => x.trim())
}

export function parseLinks (s) {
  /*
   from
        `x > y > z
        a > b`
   to
        [{ category: x, area: y, competency: z }
         { category: x, area: y }]
  */
  return s
    .trim()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(parseLink)
}

export function parseLink (s) {
  /*
   from
        `x > y > z`
   to
        { category: x, area: y, competency: z }
  */
  return parseLinkArr(s.split(/ *> */).map(elem => elem.trim()))
}

export function parseLinkArr (arr) {
  switch (arr.length) {
    case 0:
      console.error(`invalid link line '${JSON.stringify(arr)}'`)
      return {}
    case 1:
      return { category: arr[0] }
    case 2:
      return { category: arr[0], area: arr[1] }
    case 3:
      return { category: arr[0], area: arr[1], competency: arr[2] }
    default:
      console.error(`invalid link line '${JSON.stringify(arr)}'`)
      return { category: arr[0], area: arr[1], competency: arr[2] }
  }
}

export function parseLinkSections (competencyDetailYaml) {
  /*
   from
        links:
          foo:
            x > y > z
            x > y
   to
        {links:
          {foo:
            [{ category: x, area: y, competency: z }
             { category: x, area: y }]
          }
        }
  */
  if (!Object.prototype.hasOwnProperty.call(competencyDetailYaml, 'links')) {
    return
  }
  for (const [linkSectionName, linkSection] of Object.entries(competencyDetailYaml.links)) {
    competencyDetailYaml.links[linkSectionName] = linkSection.map(link => parseLink(link))
  }
}

const textSectionNames = ['evaluation', 'learningPath']

export function parseTextSections (competencyDetailYaml) {
  /*
   from
     {evaluations: "<p>foo [x > y > z]"}
   to
     {evaluations: "<p>foo <a href="#/competency/x/y/z">z</a>}
   */
  for (let i = 0; i < textSectionNames.length; i++) {
    const textSectionName = textSectionNames[i]
    if (!Object.prototype.hasOwnProperty.call(competencyDetailYaml, textSectionName)) {
      continue
    }
    let textSection = competencyDetailYaml[textSectionName]
    textSection = textSection.replace(/\[([^<\]]+)]/g, function (match, p1) {
      const link = parseLink(p1)
      const path = competencyLinkPath(link.category, link.area, link.competency)
      return `<a href="#${path}">${link.competency}</a>`
    })
    competencyDetailYaml[textSectionName] = textSection
  }
}

export function competencyLinkPath (category, area, competency) {
  if (area) {
    if (competency) {
      return '/competency/' + category + '/' + area + '/' + competency
    } else {
      return '/area/' + category + '/' + area
    }
  } else {
    if (competency) {
      console.error(`Defined competency-link with competency '${competency}' but no parent area!`)
    }
    return '/category/' + category
  }
}

export function fetchCompetencyDetail (category, area, competency, handler, errorHandler) {
  const url = `/competencies/${slug(category)}/${slug(area)}/${slug(competency)}.yaml`
  fetch(url).then(response => {
    if (!response.ok) {
      const error = `Error ${response.status} while loading ${competency}!`
      errorHandler(error)
      return
    }

    response.text().then(body => {
      if (!body.startsWith('definition:')) {
        const error = `Unexpected data while loading ${competency}!`
        errorHandler(error)
        return
      }

      const competencyDetailObj = YAML.parse(body)
      parseLinkSections(competencyDetailObj)
      parseTextSections(competencyDetailObj)
      handler(competencyDetailObj)
    }).catch(error => {
      errorHandler(error)
    })
  }).catch(error => {
    errorHandler(error)
  })
}
