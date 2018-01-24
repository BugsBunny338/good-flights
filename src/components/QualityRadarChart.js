import React from 'react';
import { CatalogHelper, Execute } from '@gooddata/react-components';
import { ResponsiveContainer, RadarChart, PolarGrid, Tooltip, 
        PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import catalogJson from '../catalog.json';
import cfg from '../config';
import { afmMetric, transformResult, filteredAfm, COLOR_PALETTE } from '../gdUtil'
import { nameCache, reverseNameCache, ON_TIME, TOTAL_FLIGHTS, DELAY_SCORE,
  DELAYED_OVER_15M, NORM_DELAY_VAR_SCORE,
  CARRIER, CAR_CODE, FLIGHT_NO } from '../ldm'

const C = new CatalogHelper(catalogJson);

const metrics = [ 
    ON_TIME, DELAYED_OVER_15M, TOTAL_FLIGHTS,
    DELAY_SCORE, NORM_DELAY_VAR_SCORE
]

const _afm = {
  measures: metrics.map(m => { return afmMetric(m) }),
  attributes: [
    { id: CARRIER, type: 'attribute' }
  ]
}

/*  array of objects like { metric: 'Metric Name', 'United': 123, 'Delta': 22 } */
const toRadarData = (list, max) => {
    const byMetric = {}
    list.forEach(row => {
      metrics.forEach(metricId => {
        const metricName = nameCache[metricId]
        if (!byMetric[metricName]) {
          byMetric[metricName] = {}
        }
        byMetric[metricName][row[CARRIER].name] = row[metricId] / max[metricId]
      })
    })
    return Object.keys(byMetric).map(metricName => ({
      ...byMetric[metricName],
      metric: metricName
    }))
      
}

const metricValue = (transformed, carrierName, metricName) => {
    const metricId = reverseNameCache[metricName]
    console.log('metricValue transformed', transformed)
    console.log('metricName', metricName)
    console.log('carrierName', carrierName)
    console.log('metricId', metricId)
    return transformed[carrierName][0][metricId]
}

const renderTooltip = (transformed) => (point) => {
    if (!point.payload[0]) {
        return null
    }
    return <div style={{ backgroundColor: 'white', padding: 8 }}>
      <div><b>{point.label}:</b></div>
      {
        point.payload.map((payload => (
          <div key={payload.dataKey} style={{ color: payload.color }}>
            - {payload.name}: {metricValue(transformed, payload.name, point.label)}
          </div>
        )))
      }
    </div>
}

const QualityRadarChart = ({ originId, destinationId }) => (
  <Execute afm={filteredAfm(_afm, originId, destinationId)} onError={(e)=>{
        console.error(e);
    }} onLoadingChanged={(e)=>{
        console.log(e);
    }} {...cfg}>{
      (result) => {
          const { headers, transformed, list, max } = transformResult(
              result, metrics, [ CARRIER ]
          )
          const radarData = toRadarData(list, max)
          console.log('radarData', radarData)
          console.log('transformed', transformed)
          return (
            <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
              <PolarGrid />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={renderTooltip(transformed)} isAnimationActive={false} />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis tick={false} />
                {
                    Object.keys(transformed).map((carrierName, index) => (
                        <Radar key={carrierName} name={carrierName}
                            dataKey={carrierName}
                            fillOpacity="0.01"
                            stroke={COLOR_PALETTE[index]}
                        />
                    ))
                }
              <Legend />
            </RadarChart>
          )
    }
  }
  </Execute>
)

export default QualityRadarChart