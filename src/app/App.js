import React from 'react';
import {Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import {connect} from 'react-redux';

import './App.css';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.css';

import FlightSearchPage from '../pages/FlightSearchPage';
import ScheduledFlightSearchPage from '../pages/ScheduledFlightSearchPage';

import actions from "../store/actions";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.setPage = this.setPage.bind(this);
    }

    setPage(page) {
        this.props.onResetData();
        this.props.onPageSubmit({page:page});
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}><Navbar className="navbar-dark bg-dark .navbar-expand-sm">
                        <NavbarBrand href="/">
                            <h5 style={{color: 'white', verticalAlign: 'middle'}}>
                                <img src={logo} style={{width: '20px', height: '20px', marginRight: '15px'}}
                                     className=".navbar-brand" alt="GoodData"/>GoodData Flight Center</h5>
                        </NavbarBrand>
                        <Nav>
                            <Col md={10}/>
                            <NavItem>
                                <NavLink style={{color: 'white', textDecoration: 'underline'}}>
                                    <div onClick={() => this.setPage(<FlightSearchPage/>)}>Flights</div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={{color: 'white', textDecoration: 'underline'}}>
                                    <div onClick={() => this.setPage(<ScheduledFlightSearchPage/>)}>Scheduled</div>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>{this.props.navigation.page ? this.props.navigation.page : <FlightSearchPage/>}</Col>
                </Row>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPageSubmit: (state) => {
            dispatch({type: actions.SET_PAGE, page: state.page})
        },
        onDestinationSubmit: (state) => {
            dispatch({type: actions.SET_DESTINATION, destination: state.destination})
        },
        onResetData: () => {
            dispatch({type: actions.RESET_DATA})
        }
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);