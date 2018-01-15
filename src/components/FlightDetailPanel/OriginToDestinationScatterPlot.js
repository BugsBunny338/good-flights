import React from 'react';
import { CatalogHelper, Execute } from '@gooddata/react-components';
import { ResponsiveContainer, ScatterChart, Scatter,
        XAxis, YAxis, ZAxis, CartesianGrid,
        Tooltip, Legend } from 'recharts';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
const C = new CatalogHelper(catalogJson);

const afmMetric = (id) => ({
    id,
    definition: {
        baseObject: {
            id
        }
    }
})

const ON_TIME   = C.metric('On Time Flights')
const DELAYED   = C.metric('Delayed Flights')
const CARRIER   = C.attributeDisplayForm('Carrier Name')
const FLIGHT_NO = C.attributeDisplayForm('Flight Number')

const _afm = {
    measures: [
        afmMetric(ON_TIME),
        afmMetric(DELAYED)
    ],
    attributes: [
        {
            id: CARRIER,
            type: 'attribute'
        },
        {
            id: FLIGHT_NO,
            type: 'date'
        }
    ]
}

const attributeFilter = (labelIdentifier, elementId) => ({
    id: labelIdentifier,
    type: 'attribute',
    in: [ elementId ]
})

const afm = (originId, destinationId) => ({
    ..._afm,
    filters: [
        attributeFilter('attr.dataset_name.originiatacode', originId),
        attributeFilter('attr.dataset_name.destinationiatacode', destinationId) 
    ]
})

const transformResult = (executionResult) => {
  const headers = {}
  executionResult.result.headers.forEach((header, index) => {
      headers[header.id] = {
          index,
          ... header
      }
  })
  const indices = {
      ontime: headers[ON_TIME].index,
      delayed: headers[DELAYED].index,
      carrier: headers[CARRIER].index,
      month: headers[FLIGHT_NO].index
  }
  const value = (row, column) => row[headers[column].index]
  const transformed = {}
  executionResult.result.rawData.forEach(row => {
      const carrier = value(row, CARRIER).name
      transformed[carrier] = transformed[carrier] || []
      transformed[carrier].push({
          [ON_TIME]: parseInt(value(row, ON_TIME)),
          [DELAYED]: parseInt(value(row, DELAYED)),
          [CARRIER]: value(row, CARRIER),
          [FLIGHT_NO]: value(row, FLIGHT_NO)
      })
  })
  console.log('transformed[0]', transformed[0])
  return { transformed, headers }
}

const renderTooltip = (point) => {
    if (!point.payload[0]) {
        return null
    }
    const payload = point.payload[0].payload
    return <div style={{backgroundColor: 'white'}}>
        <div>{point.payload[0].name}: {point.payload[0].value}</div>
        <div>{point.payload[1].name}: {point.payload[1].value}</div>
        <div>Carrier: {payload[CARRIER].name}</div>
        <div>Flight: {payload[FLIGHT_NO].name}</div>
    </div>
}

const COLOR_PALETTE = [
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf'
]

const OriginToDestinationScatterPlot = ({ originId, destinationId }) => (
    <Execute afm={afm(originId, destinationId)} onError={()=>{}} onLoadingChanged={()=>{}} {...cfg}>{
      (result) => {
        const { headers, transformed } = transformResult(result)
        console.log('result / headers / transformed', result, headers, transformed)
        return (
          <ResponsiveContainer width="100%" aspect={2.5}>
            <ScatterChart height={600}
              onClick={(e, f, g) => console.log('scatter click', e, f, f.target, g)}
              margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={ON_TIME} name="Flights On Time" type="number" />
              <YAxis dataKey={DELAYED} name="Delayed Flights" type="number" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={renderTooltip} />
              <Legend />
              {
                  Object.keys(transformed).map((carrierName, index) => (
                      <Scatter key={carrierName} name={carrierName}
                          data={transformed[carrierName]}
                          fill={COLOR_PALETTE[index]} />
                  ))
              }
            </ScatterChart>
          </ResponsiveContainer>
        )
      }
    }</Execute>
)

export default OriginToDestinationScatterPlot