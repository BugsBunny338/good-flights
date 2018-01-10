import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps"
const googleMapStyle = require("./google-map.json");

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
              
              <GoogleMap
                defaultZoom={3}
                defaultCenter={{ lat: props.flights[0].originLat, lng: props.flights[0].originLng }} 
                defaultOptions={{ mapTypeControl: false, fullscreenControl: false, streetViewControl: false }}
                ref={(map) => map && map.panTo({ lat: props.flights[0].originLat, lng: props.flights[0].originLng })}
              >
                               {                                                          
                                  props.flights.map(function(flight, index) { 
                                     return(
                                         <div>
                                            <Polyline 
                                                key={flight.flightId}
                                                path={[
                                                        {
                                                            lat: flight.originLat, 
                                                            lng: flight.originLng
                                                        },
                                                        {
                                                            lat: flight.destLat, 
                                                            lng: flight.destLng
                                                        }
                                                    ]} 
                                                options={{
                                                    strokeColor: 'red',
                                                    strokeWeight: 3,
                                                    strokeOpacity: 0.6,
                                                    geodesic: true
                                                }}
                                            />
                                         </div>
                                     )})}                                    
              </GoogleMap>
))
    
export default MyMapComponent;