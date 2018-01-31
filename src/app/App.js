import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux';

import NavMainMenu from '../components/NavMainMenu/NavMainMenu';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <Container fluid={true} className="main-container">
                <Row className="main-nav">
                    <Col xs={12}>
                        <NavMainMenu/>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col xs={12} className="main-panel">{this.props.navigation.pages[0].page}</Col>
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
        navigation: state.navigation,
        userrole: state.userrole
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);