import { CARRIER } from './ldm'

export const COLOR_PALETTE = [
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#e41a1c'
]

const attributeFilter = (labelIdentifier, elementId) => ({
    id: labelIdentifier,
    type: 'attribute',
    in: [ elementId ]
})

export const filteredAfm = (_afm, originId, destinationId) => {
    const filters = []
    if (originId) {
      filters.push(attributeFilter('attr.dataset_name.originiatacode', originId))
    }
    if (destinationId) {
      filters.push(attributeFilter('attr.dataset_name.destinationiatacode', destinationId))
    }
    return {
        ..._afm,
        filters
    }
}

export const afmMetric = (id) => ({
    id,
    definition: {
        baseObject: {
            id
        }
    }
})

export const transformResult = (executionResult, metrics, attributes) => {
  const headers = {}
  let max = {}
  metrics.forEach(m => { max[m] = 0 })
  executionResult.result.headers.forEach((header, index) => {
      headers[header.id] = {
          index,
          ...header
      }
  })

  const value = (row, column) => row[headers[column].index]

  const transformed = {}
  const list = []

  executionResult.result.rawData.forEach(row => {
      const carrier = value(row, CARRIER).name
      transformed[carrier] = transformed[carrier] || []
      const transformedRow = {}
      metrics.forEach(m => {
          transformedRow[m] = parseInt(value(row, m), 10)
          if (max[m] < transformedRow[m]) {
              max[m] = transformedRow[m]
          }
      })
      attributes.forEach(m => {
          transformedRow[m] = value(row, m)
      })
      transformed[carrier].push(transformedRow)
      list.push(transformedRow)
  })
  return { transformed, headers, list, max }
}