import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import actions from '../../store/actions';

import FlightSearchResults from '../FlightSearchResults/FlightSearchResults'

const C = new CatalogHelper(catalogJson);


class FlightSearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.setDestination = this.setDestination.bind(this);
        this.setOrigin = this.setOrigin.bind(this);
    }

    setOrigin(selection) {
        this.props.onOriginSubmit({origin:selection});
    }

    setDestination(selection) {
        this.props.onDestinationSubmit({destination:selection});
    }


    getLookupAfm(attribute = 'Origin IATA Code') {
        return ({
            attributes: [
                {
                    id: C.attributeDisplayForm(attribute),
                    type: 'attribute'
                }
            ]
        });
    }


    render() {
        let _c= this;
        return (
            <Container fluid={true}>
                <Execute afm={this.getLookupAfm()} projectId={cfg.projectId}
                         onLoadingChanged={e=>{}} onError={e=>{}}>
                    {
                        (executionResult) => {
                            let options = executionResult.result.rawData.map((row) => {
                                return {value: row[0].id, label: row[0].name}});
                            return (
                                <Row>
                                    <Col xs={6}>
                                        <Label labelFor="origin">From:</Label>
                                        <Select id="origin" style={{margin: '5px'}}
                                                value={_c.props.data.origin}
                                                options={options}
                                                onChange={(selectedValue) => _c.setOrigin(selectedValue)}/>
                                    </Col>
                                    <Col xs={6}>
                                        <Label labelFor="dest">To:</Label>
                                        <Select id="dest" style={{margin: '5px'}}
                                                value={_c.props.data.destination}
                                                options={options}
                                                onChange={(selectedValue) => _c.setDestination(selectedValue)}/>
                                    </Col>
                                </Row>
                            );
                        }
                    }
                </Execute>
                <Row>
                    <Col xs={12}>
                        {this.props.data.destination && this.props.data.origin && <FlightSearchResults />}
                    </Col>
                </Row>

            </Container>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        onOriginSubmit: (state) => {
            dispatch({type: actions.SET_ORIGIN, origin: state.origin})
        },
        onDestinationSubmit: (state) => {
            dispatch({type: actions.SET_DESTINATION, destination: state.destination})
        }
    }
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPanel);