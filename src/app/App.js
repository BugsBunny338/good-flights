import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux';

import NavMainMenu from '../components/NavMainMenu/NavMainMenu';
import NavBreadcrumb from '../components/NavMainMenu/NavBreadcrumb';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        <NavMainMenu/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}><NavBreadcrumb/></Col>
                </Row>
                <Row>
                    <Col xs={12}>{this.props.navigation.pages[0].page}</Col>
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
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);