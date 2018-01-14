import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import FlightSearchPanel from "../components/FlightSearchPanel/FlightSearchPanel";

class FlightSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={6} md={4}>
                        <FlightSearchPanel/>
                    </Col>
                    <Col xs={6} md={8}>
                        {this.props.navigation.pages && Array.isArray(this.props.navigation.pages) &&
                        this.props.navigation.pages.length > 1 &&
                        this.props.navigation.pages[this.props.navigation.pages.length - 1] &&
                        this.props.navigation.pages[this.props.navigation.pages.length - 1].page}
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
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPage);