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
                <Row>
                    <Col xs={12} className="nopadding">
                        <Navbar className="navbar-dark bg-dark .navbar-expand-sm Navbar">
                            <NavbarBrand href="/">
                                <h5 className="Logo">
                                    <img className=".navbar-brand LogoImage" src={logo} alt="GoodData"/>
                                    <span className="LogoThick">GoodData</span> <span className="LogoThin">Flight Center</span>
                                </h5>
                            </NavbarBrand>
                            <Nav>
                                <Col xs={10}/>
                                <NavItem className="NavItem">
                                    <NavLink href=""
                                             onClick={(e) => this.setPages(e,[{ page:<FlightSearchPage/>, breadcrumb:'Routes'}])}>
                                        Routes
                                    </NavLink>
                                </NavItem>
                                <NavItem className="NavItem">
                                    <NavLink href=""
                                             onClick={(e) => this.setPages(e, [{page: <ScheduledFlightSearchPage/>, breadcrumb:'Flights' }])}>
                                        Flights
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>

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