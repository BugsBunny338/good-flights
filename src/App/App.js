import React from 'react';
import {Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Col} from 'reactstrap';

import './App.css';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.css';

import MapPanel from '../components/Map/MapPanel';
import FlightEstimator from '../components/FlightEstimator/FlightEstimator';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            content: ''
        };
    }

    render() {
        let content = <div/>;
        switch (this.state.content) {
            case 'Map':
                content = <MapPanel/>;
                break;
            case 'Estimator':
                content = <FlightEstimator/>;
                break;
            default:
                content = <div/>;
        }
        return (
                <div>
                        <Navbar className="navbar-dark bg-dark .navbar-expand-sm">
                            <NavbarBrand href="/">
                                <h5 style={{color:'white', verticalAlign:'middle'}}>
                                    <img src={logo} style={{width:'20px', height:'20px', marginRight:'15px'}}
                                         className=".navbar-brand" alt="GoodData"/>GoodData Flight Center</h5>
                                </NavbarBrand>
                                <Nav>
                                    <Col md={10}/>
                                    <NavItem md={1}>
                                        <NavLink onClick={(() => this.setState({...this.state, content: 'Map'}))}
                                                 style={{color:'white', textDecoration: 'underline'}}>Map Panel</NavLink>
                                    </NavItem>
                                    <NavItem md={1}>
                                        <NavLink onClick={(() => this.setState({...this.state, content: 'Estimator'}))}
                                                 style={{color:'white', textDecoration: 'underline'}}>Estimator</NavLink>
                                    </NavItem>
                                </Nav>
                        </Navbar>
                    <Container fluid={true}>
                        {content}
                    </Container>
            </div>
        );
    }
}