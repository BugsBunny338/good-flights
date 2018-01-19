import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";

import Map from '../Map/Map';
import airports from "../../flightapi/airports";

class MapPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let routes = [];
        if(this.props.data && this.props.data.scheduledOrigin && this.props.data.destinations) {
            routes = this.props.data.destinations.map( d => {
                let destination = airports[d.destination];
                let origin = airports[this.props.data.scheduledOrigin.label];
                return {
                    flightId: d.ident,
                    originIata: this.props.data.scheduledOrigin.label,
                    originLat: origin.lat,
                    originLng: origin.lon,
                    destIata: d,
                    destLat: destination.lat,
                    destLng: destination.lon,
                }
            });
        }

        return (
            <Container fluid={true} className="map-result">
                {this.props.data && this.props.data.scheduledOrigin && this.props.data.destinations && <Row>
                    <Col xs={12}>
                        <Map
                            flights={routes}

                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Vo7Rv1C80cQ05W2w8qjMAlA5IBpiufE&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div className="MapLoadingElement" style={{
                                height: 350,
                                width: '100%',
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                justifyContent: 'center',
                                padding: 0
                            }}/>}
                            containerElement={<div className="MapContainerElement" style={{
                                width: "100%",
                                marginLeft: 0
                            }}/>}
                            mapElement={<div className="MapElement"/>}
                        />
                    </Col>
                </Row>}
            </Container>);
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel);