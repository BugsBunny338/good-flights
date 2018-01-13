import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import actions from '../../store/actions';

import ScheduledFlightSearchResults from '../ScheduledFlightSearchResults/ScheduledFlightSearchResults'

const C = new CatalogHelper(catalogJson);


class ScheduledFlightSearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setOrigin = this.setOrigin.bind(this);
    }

    setOrigin(selection) {
        this.props.onOriginSubmit({scheduledOrigin:selection});
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
                                    <Col xs={12}>
                                        <Label>From:</Label>
                                        <Select id="origin" style={{margin: '5px'}}
                                                value={_c.props.data.scheduledOrigin}
                                                options={options}
                                                onChange={(selectedValue) => _c.setOrigin(selectedValue)}/>
                                    </Col>
                                </Row>
                            );
                        }
                    }
                </Execute>
                <Row>
                    <Col xs={12}>
                        <ScheduledFlightSearchResults />
                    </Col>
                </Row>

            </Container>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        onOriginSubmit: (state) => {
            dispatch({type: actions.SET_SCHEDULED_ORIGIN, scheduledOrigin: state.scheduledOrigin})
        }
    }
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchPanel);