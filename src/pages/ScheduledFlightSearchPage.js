import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import ScheduledMapPanel from "../components/ScheduledMapPanel/ScheduledMapPanel";
import ScheduledFlightSearchPanel from "../components/ScheduledFlightSearchPanel/ScheduledFlightSearchPanel";
import ScheduledFlightDetailPanel from "../components/ScheduledFlightDetailPanel/ScheduledFlightDetailPanel";

class ScheduledFlightSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let component = this.props.data.schedule ? <ScheduledFlightDetailPanel/> : <ScheduledMapPanel/>;
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={6} md={4}>
                        <ScheduledFlightSearchPanel/>
                    </Col>
                    <Col xs={6} md={8}>
                        {component}
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchPage);