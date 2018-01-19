import React, {Component} from 'react';
import {Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink,} from 'reactstrap';
import {connect} from "react-redux";

import FlightSearchPage from '../../pages/FlightSearchPage';
import ScheduledFlightSearchPage from '../../pages/ScheduledFlightSearchPage';
import { setPages, resetData } from "../../store/actions";

import logo from './logo.png';
import user_photo from './user_photo.png';
import user_logout from './user_logout.png';



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
                        <Navbar className="navbar-dark bg-dark .navbar-expand-md Navbar">
                            <NavbarBrand href="/">
                                <h5 className="Logo">
                                    <img className=".navbar-brand LogoImage" src={logo} alt="GoodData"/>
                                    <span className="LogoThick">GoodData</span> <span className="LogoThin">Flight Center</span>
                                </h5>
                            </NavbarBrand>
                            <Nav>
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
                            <div className="UserPanel">
                                <img className="UserPanelImage" src={user_photo} />
                                <span className="UserName">Alan Smith</span>
                                <img className="UserPanelLogout" src={user_logout} />
                            </div> 
                        </Navbar>
                    </Col>
                </Row>

        );
    }

}

const mapDispatchToProps = {
    onPagesSubmit: setPages,
    onResetData: resetData
}

function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMainMenu);