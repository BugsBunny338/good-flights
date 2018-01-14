import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";

class FlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentWillReceiveProps(nextProps) {
        // setState with computed or enriched results if new props
        if (nextProps.data && nextProps.data.destination && nextProps.data.origin && nextProps.data.flight &&
            (!this.props.data || !this.props.data.destination || !this.props.data.origin ||
                !this.props.data.flight ||
                nextProps.data.destination.value !== this.props.data.destination.value ||
                nextProps.data.origin.value !== this.props.data.origin.value ||
                nextProps.data.flight.id !== this.props.data.flight.id )) {

            // perform computation or enrichment and set it to state
        }
    }

    componentDidMount() {
        // the componentWillReceiveProps isn't called during the first render
        if (this.props.data && this.props.data.destination && this.props.data.origin && this.props.data.flight) {

            // perform computation or enrichment and set it to state

        }
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        <h1>This is the flight  detail panel provided by Pavel Kolesnikov.</h1>
                        <p>Origin: {JSON.stringify(this.props.data.origin, null,2)}</p>
                        <p>Destination: {JSON.stringify(this.props.data.destination, null,2)}</p>
                        <p>Flight #: {JSON.stringify(this.props.data.flight, null,2)}</p>
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