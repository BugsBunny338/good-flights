import React from 'react';
import { CatalogHelper, Execute } from '@gooddata/react-components';
import { ResponsiveContainer, ScatterChart, Scatter,
        XAxis, YAxis, CartesianGrid,
        Tooltip, Legend } from 'recharts';
import catalogJson from '../../catalog.json';
import cfg from '../../config';
import { afmMetric, transformResult, filteredAfm, COLOR_PALETTE } from '../../gdUtil'
import { ON_TIME, DELAYED, CARRIER, CAR_CODE, FLIGHT_NO } from '../../ldm'
const C = new CatalogHelper(catalogJson);

const PLANE_ICON_PATH = "M416.4,90.2l-96.6,61.1L114.2,63.7L63.9,99.1l156.3,115.3l-89.2,56.5l-72.3-24.7L27,267.2l91.8,52.2l7.9,105.3  l32.4-19.5l8.7-75.9l89.2-56.5l37.3,190.6l53.6-30.3l8.9-223.4l102.3-64.8c17.5-11.1,33.8-35.3,21.7-54.5  C468.7,71.1,433.9,79.1,416.4,90.2z"
const PLANE_ICON_SCALE = "scale(0.02)"

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
            id: CAR_CODE,
            type: 'attribute'
        },
        {
            id: FLIGHT_NO,
            type: 'date'
        }
    ]
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
        <div>Flight: {payload[CAR_CODE].name}{payload[FLIGHT_NO].name}</div>
    </div>
}

const onPointClickDefault = (pointData, event) => {
    console.log('point clicked', event, pointData)
}

const renderPoint = (pointData) => {
    if (!pointData.x || !pointData.y) {
        return null
    }
    return <path fill={pointData.fill}
        transform={"translate(" + pointData.cx + " " + pointData.cy + ") " + PLANE_ICON_SCALE}
        d={PLANE_ICON_PATH} />
}

const OriginToDestinationScatterPlot = ({ originId, destinationId, onPointClick }) => (
    <Execute afm={filteredAfm(_afm, originId, destinationId)} onError={(e)=>{
        console.error(e);
    }} onLoadingChanged={(e)=>{
        console.log(e);
    }} {...cfg}>{
      (result) => {
        const { headers, transformed } = transformResult(
            result,
            [ ON_TIME, DELAYED ],
            [ CARRIER, CAR_CODE, FLIGHT_NO ]
        )
        console.log('result / headers / transformed', result, headers, transformed)
        return (
          <ResponsiveContainer width="100%" aspect={1.8}>
            <ScatterChart
              margin={{ top: 20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={ON_TIME} name="Flights On Time" type="number" tick={false}
                  label={{ value: "Flights On Time", position: "insideBottomRight" }} />
              <YAxis dataKey={DELAYED} name="Delayed Flights" type="number" orientation="left" tick={false}
                  label={{value: "Delayed Flights", angle: -90 }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={renderTooltip} isAnimationActive={false} />
              <Legend />
              {
                  Object.keys(transformed).map((carrierName, index) => (
                      <Scatter key={carrierName} name={carrierName}
                          data={transformed[carrierName]}
                          onClick={onPointClick || onPointClickDefault}
                          shape={renderPoint}
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