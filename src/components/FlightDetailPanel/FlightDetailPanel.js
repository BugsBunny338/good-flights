import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";

import PixelPerfectChart from '../PixelPerfectChart/PixelPerfectChart';

class FlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        const {origin, destination} = this.props.data;
        return (
            <Container fluid={true}>
                <Row>
                    <Col>
                        <h1>Airlines Quality</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <PixelPerfectChart height="600px" src={
                            "https://secure.gooddata.com/reportWidget.html" +
                            `?label.origins.originiatacode=${origin.label}` +
                            `&label.destinations.destinationiatacode=${destination.label}` +
                            "#project=/gdc/projects/ljh2d3as9i2uw2jqrgcdgu3sl69j5wf0" +
                            "&report=/gdc/md/ljh2d3as9i2uw2jqrgcdgu3sl69j5wf0/obj/1749" +
                            "&transparentBackground=yes"}/>
                    </Col>
                </Row>
            </Container>
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