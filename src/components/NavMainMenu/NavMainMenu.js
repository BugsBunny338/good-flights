import React, {Component} from 'react';
import {Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink,} from 'reactstrap';
import {connect} from "react-redux";

import FlightSearchPage from '../../pages/FlightSearchPage';
import ScheduledFlightSearchPage from '../../pages/ScheduledFlightSearchPage';
import actions from "../../store/actions";

import logo from './logo.png';


class NavMainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setPages = this.setPages.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
    }

    setPages(e, pages) {
        this.props.onResetData();
        this.props.onPagesSubmit({pages});
        e.preventDefault();
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        <Navbar className="navbar-dark bg-dark .navbar-expand-sm">
                            <NavbarBrand href="/">
                                <h5 style={{color: 'white', verticalAlign: 'middle'}}>
                                    <img src={logo} style={{width: '20px', height: '20px', marginRight: '15px'}}
                                         className=".navbar-brand" alt="GoodData"/>GoodData Flight Center</h5>
                            </NavbarBrand>
                            <Nav>
                                <Col md={10}/>
                                <NavItem>
                                    <NavLink href=""
                                             onClick={(e) => this.setPages(e,[{ page:<FlightSearchPage/>, breadcrumb:'Routes'}])}>
                                        Routes
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href=""
                                             onClick={(e) => this.setPages(e, [{page: <ScheduledFlightSearchPage/>, breadcrumb:'Flights' }])}>
                                        Flights
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        onPagesSubmit: (state) => {
            dispatch({type: actions.SET_PAGES, pages: state.pages})
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

export default connect(mapStateToProps, mapDispatchToProps)(NavMainMenu);