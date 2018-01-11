import React, { Component } from 'react';

import {Container, Row, Col, Input} from 'reactstrap';

import Map from "./Map.js"

import { Execute } from '@gooddata/react-components';
import { CatalogHelper } from '@gooddata/react-components';
import catalogJson from '../../catalog.json';
const C = new CatalogHelper(catalogJson);

const blankFlightsAFM = {
    attributes: [
        {
            id: C.attributeDisplayForm('Origin IATA Code'),
            type: 'attribute'
        },
        {
            id: C.attributeDisplayForm('Origin GPS Latitude'),
            type: 'attribute'
        },
                {
            id: C.attributeDisplayForm('Origin GPS Longitude'),
            type: 'attribute'
        },
        {
            id: C.attributeDisplayForm('Destination IATA Code'),
            type: 'attribute'
        },
        {
            id: C.attributeDisplayForm('Destination GPS Latitude'),
            type: 'attribute'
        },
        {
            id: C.attributeDisplayForm('Destination GPS Longitude'),
            type: 'attribute'
        }
    ],
    filters: [
        {
            id: C.attributeDisplayForm('Origin IATA Code'),
            type: 'attribute',
            in: []
        }
    ],
    measures: [
        {
            id: 'number_of_flights', 
            definition: {
                baseObject: {
                    id: C.metric('Number of Flights [Sum]')
                }
            }
        }
    ],
}

const airportListAFM = { 
    attributes: [ 
        { 
            id: C.attributeDisplayForm('Origin IATA Code'),
            type: 'attribute' 
        }
    ]
}

function generateAFM(airportID) {
    let newAFM = {}
    
    // Prague airport (airportID = 4) will be our default selection
    airportID = (typeof airportID === 'undefined') ? '4' : airportID;

    // This replaced deep cloning, we are using most of blankFlightsAFM, but defining filters on the fly
    newAFM['attributes'] = blankFlightsAFM['attributes'];
    newAFM['measures'] = blankFlightsAFM['measures'];

    newAFM['filters'] = [
        {
            id: C.attributeDisplayForm('Origin IATA Code'),
            type: 'attribute',
            in: [ airportID ]
        }
    ];
            
    return newAFM; 
}


// Elements: https://secure.gooddata.com/gdc/md/hib1qeozpdj880kbziozzqymjo7bkrzc/obj/53/elements
// https://developers.google.com/maps/documentation/javascript/geometry
// Google Maps API key: AIzaSyA4Vo7Rv1C80cQ05W2w8qjMAlA5IBpiufE
                                
class MapPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        flightsAFM: generateAFM()
    };
  }

  setAirport(airportID) {  
    this.setState({
      flightsAFM: generateAFM(airportID)
    });
  }
    
  render() {
    return (
      <Container fluid={true}>
          <Row>
              <Col xs={10} md={11}/>
              <Col xs={2} md={1}>
                  <Execute afm={airportListAFM} projectId="ljh2d3as9i2uw2jqrgcdgu3sl69j5wf0" onLoadingChanged={e=>{}} onError={e=>{}}>
                      {
                          (executionResult) => {
                              return (
                                  <Input style={{margin:'5px'}} type="select" onChange={(e) => this.setAirport(e.target.value)} defaultValue="4">
                                      {
                                          executionResult.result.rawData.map(function(row, index) {
                                              return(
                                                  <option key={row[0].id} value={row[0].id}>
                                                      {row[0].name || 'Unknown Airport'}
                                                  </option>
                                              );
                                          })
                                      }
                                  </Input>
                              );
                          }
                      }
                  </Execute>
              </Col>
          </Row>
          <Row>
              <Col xs={12}>
                  <Execute afm={this.state.flightsAFM} projectId="ljh2d3as9i2uw2jqrgcdgu3sl69j5wf0" onLoadingChanged={e=>{}} onError={e=>{}}>
                      {
                          (executionResult) => {

                              return (
                                  <Map
                                      flights={
                                          executionResult.result.rawData.map(function(flight, index) {
                                              const singleRoute = {
                                                  flightId: flight[0].name+flight[3].name,
                                                  originIata: flight[0].name,
                                                  originLat: parseFloat(flight[1].name),
                                                  originLng: parseFloat(flight[2].name),
                                                  destIata: flight[3].name,
                                                  destLat: parseFloat(flight[4].name),
                                                  destLng: parseFloat(flight[5].name),
                                                  numOfFlights: parseFloat(flight[6])
                                              }

                                              return singleRoute;
                                          })
                                      }

                                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Vo7Rv1C80cQ05W2w8qjMAlA5IBpiufE&v=3.exp&libraries=geometry,drawing,places"
                                      loadingElement={<div className="MapLoadingElement" />}
                                      containerElement={<div className="MapContainerElement" />}
                                      mapElement={<div className="MapElement" />}
                                  />
                              );
                          }
                      }
                  </Execute>
              </Col>
          </Row>
      </Container>
    );
  }
}

export default MapPanel;