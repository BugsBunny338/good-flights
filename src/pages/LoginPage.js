import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap';

import FlightSearchPage from './FlightSearchPage';
import { setPages, resetData, setUser } from "../store/actions";

import user1_photo from '../img/user1_photo.png';
import user2_photo from '../img/user2_photo.png';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            email: '',
            password: '',
            userrole: ''
        }
    }
    
    setPages(e, pages) {
        this.props.onResetData();
        this.props.onPagesSubmit({pages});
        e.preventDefault();
    }
    
    
    
    handleSubmit(event) {
        event.preventDefault();

        //TODO: Matching the right names and roles
        if(this.state.email.includes('qa')) {
            this.props.setUser({userrole: 'qa', username: 'Alan Smith', photo: user1_photo});
            this.setPages(event, [{breadcrumb: 'Routes', page: <FlightSearchPage/>}])

        } else if(this.state.email.includes('manager')) {
            this.props.setUser({userrole: 'manager', username: 'Stanley Davis', photo: user2_photo});
            this.setPages(event, [{breadcrumb: 'Routes', page: <FlightSearchPage/>}])

        } else {
            this.setState({userrole: null});
        }
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    render() {
        return (
            <div className="login-screen-center">
            <Container fluid={true}>
                <Row>
                  <Col xs={12} md={{ size: 2, offset: 5 }}>
                     <h1 className="login-screen-h1">Log In</h1>
                  </Col>
                </Row>
                <Row>
                    <Col xs={12} md={{ size: 4, offset: 4 }} className="login-screen">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                              <Label for="email" className="login-screen-headline">Email</Label>
                              <Input type="email" name="email" id="email" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                              <Label for="password" className="login-screen-headline">Password</Label>
                              <Input type="password" name="password" id="password" onChange={this.handleInputChange} />
                            </FormGroup>
                            <a href="" className="login-screen-passforgot">Forgot my password</a>
                            <Button>Log In</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

const mapDispatchToProps = {
    onPagesSubmit: setPages,
    onResetData: resetData,
    setUser
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation,
        userrole: state.userrole
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);