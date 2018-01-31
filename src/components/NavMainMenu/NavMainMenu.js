import React, {Component} from 'react';
import {Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink,} from 'reactstrap';
import {connect} from "react-redux";

import FlightSearchPage from '../../pages/FlightSearchPage';
import ScheduledFlightSearchPage from '../../pages/ScheduledFlightSearchPage';
import LoginPage from '../../pages/LoginPage';
import DesignerPage from '../../pages/DesignerPage';
import CustomViewPage from '../../pages/CustomViewPage';
import { setPages, resetData } from "../../store/actions";

import logo from './logo.png';
import user1_photo from './user1_photo.png';
import user2_photo from './user2_photo.png';
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
    
    isNavItemDisabled(name) {
        return (this.props.navigation.pages[0].breadcrumb == name ? true : false);
    }
    
    generateNavItem(pageTitle, pageComponent) {
        let navItem = <NavItem className="NavItem">
                        <NavLink href="" onClick={(e) => this.setPages(e,[{ page: pageComponent, breadcrumb: pageTitle}])}
                            disabled={this.isNavItemDisabled(pageTitle)}>
                            {pageTitle}
                        </NavLink>
                      </NavItem>;
        
        return navItem;
    }

    render() {
        let user_name, user_photo = null;
        
        // TODO: REMOVE hard-coded manager and replace with actual role from log in screen
        let user = 'manager'
        
        if(user == 'qa') {
        // QA user logged in
            user_name = 'Alan Smith';
            user_photo = user1_photo;
            
        } else if(user == 'manager') {
            // Manager user logged in
            user_name = 'Stanley Davis';
            user_photo = user2_photo;
            
        } else {
            // No user logged in
        }
        
        let tab_routes = this.generateNavItem('Routes', <FlightSearchPage/>);
        let tab_flights = this.generateNavItem('Flights', <ScheduledFlightSearchPage/>);
        let tab_designer = this.generateNavItem('Designer', <DesignerPage/>);
        let tab_customview = this.generateNavItem('Custom View', <CustomViewPage/>);

        let user_panel = <div className="UserPanel">
                            <img className="UserPanelImage" alt="user" src={user_photo} />
                            <span className="UserName">{user_name}</span>
                            <img className="UserPanelLogout" alt="user logout" src={user_logout} onClick={(e) => this.setPages(e, [{page: <LoginPage/>, breadcrumb:'Login' }])} />
                         </div>;
        
        
        if(user == 'qa') {
        // QA user logged in, not seeing Designer and CustomView
            tab_designer = tab_customview = null;

        } else if(user == 'manager') {
            // Manager logged in, seeing everything

        } else {
            // No user logged in, menu and user_panel are empty
            tab_routes = tab_flights = tab_designer = tab_customview = user_panel = null;
        }
        
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
                                {tab_routes}
                                {tab_flights}
                                {tab_designer}
                                {tab_customview}
                            </Nav>
                            {user_panel}
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