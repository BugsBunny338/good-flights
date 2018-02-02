import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import {afmMetric, filteredAfm} from '../../gdUtil'
import {TOTAL_FLIGHTS} from '../../ldm'
import {setOrigin, setDestination, setCarrier, setPages, setAttributeElements} from '../../store/actions';

import FlightSearchResults from '../FlightSearchResults/FlightSearchResults';
import MapPanel from '../MapPanel/MapPanel';
import airplane from '../../img/airplane.png';


const C = new CatalogHelper(catalogJson);


class FlightSearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.setDestination = this.setDestination.bind(this);
        this.setOrigin = this.setOrigin.bind(this);
        this.setCarrier = this.setCarrier.bind(this);
    }

    setOrigin(selection) {
        this.props.onPagesSubmit({pages: [this.props.navigation.pages[0], {page: <MapPanel/>, breadcrumb: 'Map'}]});
        this.props.onOriginSubmit({origin: selection});
    }

    setDestination(selection) {
        this.props.onPagesSubmit({pages: [this.props.navigation.pages[0], {page: <MapPanel/>, breadcrumb: 'Map'}]});
        this.props.onDestinationSubmit({destination: selection});
    }
    
    setCarrier(selection) {
        this.props.onPagesSubmit({pages: [this.props.navigation.pages[0], {page: <MapPanel/>, breadcrumb: 'Map'}]});
        this.props.onCarrierSubmit({carrier: selection});
    }

    getLookupAfm(attribute = 'Origin IATA Code', metric = null, originId = null, destinationId = null) {
        const afm = {
            attributes: [
                {
                    id: C.attributeDisplayForm(attribute),
                    type: 'attribute'
                }
            ],
            filters: []
        };
        if (metric) {
            afm['measures'] = [ metric ]
        }
        return filteredAfm(afm, originId, destinationId)
    }

    getCarriersAfm() {
        const { origin, destination } = this.props.data
        const originId = origin ? origin.value : null
        const destinationId = destination ? destination.value : null
        const metric = (originId || destinationId) ? afmMetric(TOTAL_FLIGHTS) : null
        return this.getLookupAfm('Carrier Name', metric, originId, destinationId)
    }

    render() {
        let _c = this;
        let search_results = null;
        
        if(this.props.data.destination && this.props.data.origin) {
            search_results = <FlightSearchResults/>;
        } else {
            search_results = <div className="search-results-placeholder"><img src={airplane} /><div className="search-results-placeholder-text">Select your route</div></div>;
        }
        
        return (
            <div className="search-column">
                <div className="search-menu">
                    <Execute afm={this.getLookupAfm()} projectId={cfg.projectId}
                             onLoadingChanged={e => {
                             }} onError={e => {
                    }}>
                        {
                            (executionResult) => {
                                let options = executionResult.result.rawData.map((row) => {
                                    return {value: row[0].id, label: row[0].name}
                                });
                                console.log('setAttributeElements')
                                this.props.setAttributeElements(C.attributeDisplayForm('Origin IATA Code'), options)
                                return (
                                    <Row>
                                        <Col xs={12} className="select-title">SELECT ROUTE</Col>
                                        <Col xs={6} className="select-drop">
                                            <Select id="origin" style={{margin: '5px'}}
                                                    value={_c.props.data.origin}
                                                    options={options}
                                                    placeholder="FROM"
                                                    onChange={(selectedValue) => _c.setOrigin(selectedValue)}/>
                                        </Col>
                                        <Col xs={6} className="select-drop">
                                            <Select id="dest" style={{margin: '5px'}}
                                                    value={_c.props.data.destination}
                                                    options={options}
                                                    placeholder="TO"
                                                    onChange={(selectedValue) => _c.setDestination(selectedValue)}/>
                                        </Col>
                                    </Row>
                                );
                            }
                        }
                    </Execute>
                    <Row className="search-results-carrier-row">
                        <Col xs={3}>
                            <div className="search-results-carrier-name">Select carrier:</div>
                        </Col>
                          
                            <Execute afm={this.getCarriersAfm()} projectId={cfg.projectId}
                                 onLoadingChanged={e => {}} onError={e => {}}>
                            {
                                (executionResult) => {
                                    let options = executionResult.result.rawData.map((row) => {
                                        return {value: row[0].id, label: row[0].name}
                                    });
                                    this.props.setAttributeElements(C.attributeDisplayForm("Carrier Name"), options)
                                    return (
                                            <Col xs={6} className="search-results-carrier-select-drop">
                                                <Select id="carrier" style={{margin: '5px'}}
                                                        value={_c.props.data.carrier}
                                                        options={options}
                                                        placeholder="All carriers"
                                                        onChange={(selectedValue) => _c.setCarrier(selectedValue)}/>
                                             </Col>
                                            );
                                }
                            }
                            </Execute>
                </Row>
                        
                </div>
                <Row className="search-results">
                    <Col xs={12}>
                        {search_results}
                    </Col>
                </Row>

            </div>
        );
    }

}

const mapDispatchToProps = {
    onOriginSubmit: setOrigin,
    onDestinationSubmit: setDestination,
    onCarrierSubmit: setCarrier,
    onPagesSubmit: setPages,
    setAttributeElements
};


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPanel);