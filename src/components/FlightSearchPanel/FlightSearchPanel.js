import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import { setOrigin, setDestination, setPages, setAttributeElements } from '../../store/actions';

import FlightSearchResults from '../FlightSearchResults/FlightSearchResults';
import MapPanel from '../MapPanel/MapPanel';

const C = new CatalogHelper(catalogJson);


class FlightSearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.setDestination = this.setDestination.bind(this);
        this.setOrigin = this.setOrigin.bind(this);
    }

    setOrigin(selection) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], {page: <MapPanel/>, breadcrumb: 'Map'}]});
        this.props.onOriginSubmit({origin:selection});
    }

    setDestination(selection) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], {page: <MapPanel/>, breadcrumb: 'Map'}]});
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
            <div>
            <Execute afm={this.getLookupAfm()} projectId={cfg.projectId}
                         onLoadingChanged={e=>{}} onError={e=>{}}>
                    {
                        (executionResult) => {
                            let options = executionResult.result.rawData.map((row) => {
                                return {value: row[0].id, label: row[0].name}});
                            console.log('setAttributeElements')
                            this.props.setAttributeElements(C.attributeDisplayForm('Origin IATA Code'), options)
                            return (
                                <Row>
                                    <Col xs={6}>
                                        <Label>From:</Label>
                                        <Select id="origin" style={{margin: '5px'}}
                                                value={_c.props.data.origin}
                                                options={options}
                                                onChange={(selectedValue) => _c.setOrigin(selectedValue)}/>
                                    </Col>
                                    <Col xs={6}>
                                        <Label>To:</Label>
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

            </div>

        );
    }

}

const mapDispatchToProps = {
    onOriginSubmit: setOrigin,
    onDestinationSubmit: setDestination,
    onPagesSubmit: setPages,
    setAttributeElements
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPanel);