import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";

class ScheduledFlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        <p>This is the flight  detail panel provided by Pavel Kolesnikov.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightDetailPanel);