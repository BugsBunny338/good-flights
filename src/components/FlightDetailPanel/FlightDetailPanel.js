import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';

import catalogJson from '../../catalog.json';
import cfg from '../../config';

import FlightSearchResults from '../FlightSearchResults/FlightSearchResults'
import {connect} from "react-redux";

const C = new CatalogHelper(catalogJson);


class FlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        let _c= this;
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        <p>This is the flight detail panel provided by Pavel Kolesnikov.</p>
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
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailPanel);