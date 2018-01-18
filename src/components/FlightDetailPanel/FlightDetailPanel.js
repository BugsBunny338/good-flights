import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {connect} from "react-redux";

import { Kpi } from '@gooddata/react-components';

import cfg from '../../config';
import catalogJson from '../../catalog';
import PixelPerfectChart from '../PixelPerfectChart/PixelPerfectChart';
import {CatalogHelper} from "@gooddata/react-components/dist/index";

const C = new CatalogHelper(catalogJson);

class FlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        const {origin, destination, flight, carrier} = this.props.data;
        return (
            <div className="FlightDetailPanel">
                <Row>
                    <Col xs={3}>
                        <h1 className="FlightDetailPanel-h1">
                            <Kpi filters={[
                                {
                                    id: C.attributeDisplayForm('Carrier'),
                                    type: 'attribute',
                                    in: [carrier]
                                },
                                {
                                    id: C.attributeDisplayForm('Flight Number'),
                                    type: 'attribute',
                                    in: [flight]
                                }
                            ]} measure={C.metric('On Time Flights (%)')} projectId={cfg.projectId}/>
                        </h1>
                        <h1>TEST</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h1 className="FlightDetailPanel-h1">{origin.label} => {destination.label} Airlines Benchmark</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <PixelPerfectChart height="600px" src={
                            "https://secure.gooddata.com/reportWidget.html" +
                            `?label.origins.originiatacode=${origin.label}` +
                            `&label.destinations.destinationiatacode=${destination.label}` +
                            `#project=/gdc/projects/${cfg.projectId}` +
                            `&report=/gdc/md/${cfg.projectId}/obj/1749` +
                            "&transparentBackground=yes"}/>
                    </Col>
                </Row>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailPanel);