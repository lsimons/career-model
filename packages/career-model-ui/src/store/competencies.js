import { parse as csvParse } from 'papaparse'

class CompetencyLoader {
  constructor (career, maxLevel, baseUrl) {
    this.career = career
    this.maxLevel = maxLevel
    this.baseUrl = baseUrl
    this.careerObj = {
      name: career,
      type: 'Career',
      children: []
    }
  }

  get careerSlug () {
    return this.career.toLowerCase().replace(' ', '-')
  }

  get dataUrl () {
    return new URL(`/competency-list-${this.careerSlug}.csv`, this.baseUrl).toString()
  }

  ensureArea (name) {
    const area = name.trim()
    const areas = this.careerObj.children
    for (let i = 0; i < areas.length; i++) {
      if (areas[i].name === area) {
        return areas[i]
      }
    }
    const areaObject = {
      name: area,
      type: 'Area',
      children: []
    }
    this.careerObj.children.push(areaObject)
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
        children: []
      }
      parent.children.push(competencyObject)
    }

    if (competencyList.length > 1 && level < this.maxLevel) {
      const childCompetencies = competencyList.slice(1)
      this.ensureCompetency(area, childCompetencies, level + 1, competencyObject)
    }
  }

  load (onComplete) {
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
        onComplete(loader.careerObj)
      }
    })
  }
}

let loader

export function load (career, maxLevel, onComplete, baseUrl = document.location.href) {
  loader = new CompetencyLoader(career, maxLevel, baseUrl)
  loader.load(onComplete)
}
