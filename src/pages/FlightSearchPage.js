import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import FlightSearchPanel from "../components/FlightSearchPanel/FlightSearchPanel";
import NavBreadcrumb from '../components/NavMainMenu/NavBreadcrumb';

class FlightSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12} md={5} className="search-panel">
                        <div className="blue-top"></div>
                        <div className="nav-bread"><NavBreadcrumb/></div>
                        <div><FlightSearchPanel/></div>
                    </Col>
                    <Col xs={12} md={7} className="map-panel">
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