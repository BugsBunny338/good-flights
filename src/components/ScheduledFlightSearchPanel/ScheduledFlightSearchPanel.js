import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import { setScheduledOrigin, setPages, setAttributeElements, setCarrier } from '../../store/actions';

import ScheduledFlightSearchResults from '../ScheduledFlightSearchResults/ScheduledFlightSearchResults';
import ScheduledMapPanel from '../ScheduledMapPanel/ScheduledMapPanel';
import airplane from '../../img/airplane.png';


const C = new CatalogHelper(catalogJson);

const ORIGIN_IATA_CODE = 'Origin IATA Code'

class ScheduledFlightSearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setOrigin = this.setOrigin.bind(this);
        this.setCarrier = this.setCarrier.bind(this);
    }

    setOrigin(selection) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], {page: <ScheduledMapPanel/>, breadcrumb: 'Map'}]});
        this.props.onOriginSubmit({scheduledOrigin:selection});
    }
    
    setCarrier(selection) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], {page: <ScheduledMapPanel/>, breadcrumb: 'Map'}]});
        this.props.onCarrierSubmit({carrier:selection});
    }

    getLookupAfm(attribute = ORIGIN_IATA_CODE) {
        if (!Array.isArray(attribute)) {
            attribute = [ attribute ]
        }
        return ({
            attributes: attribute.map(a => ({
                id: C.attributeDisplayForm(a),
                type: 'attribute'
            }))
        });
    }


    render() {
        let _c= this;
        let search_results = null;
        
        if(_c.props.data.scheduledOrigin) {
            search_results = <ScheduledFlightSearchResults />;
        } else {
            search_results = <div className="search-results-placeholder"><img src={airplane} /><div className="search-results-placeholder-text">Select airport of origin</div></div>;
        }
        
        return (
            <Container fluid={true} className="search-column">
            <div className="search-menu">
                <Execute afm={this.getLookupAfm()} projectId={cfg.projectId}
                         onLoadingChanged={e=>{}} onError={e=>{}}>
                    {
                        (executionResult) => {
                            let options = executionResult.result.rawData.map((row) => {
                                return {value: row[0].id, label: row[0].name}});
                            this.props.setAttributeElements(C.attributeDisplayForm(ORIGIN_IATA_CODE), options)
                            return (
                                <Row>
                                    <Col xs={12} className="select-title">SELECT ORIGIN</Col>
                                    <Col xs={6} className="select-drop">
                                        <Select id="origin" style={{margin: '5px'}}
                                                value={_c.props.data.scheduledOrigin}
                                                options={options}
                                                placeholder="FROM"
                                                onChange={(selectedValue) => _c.setOrigin(selectedValue)}/>
                                    </Col>
                                    <Col xs={6}></Col>
                                </Row>
                            );
                        }
                    }
                </Execute>
                <Row className="search-results-carrier-row">
                        <Col xs={3}>
                            <div className="search-results-carrier-name">Select carrier:</div>
                                                </Col>

                            <Execute afm={this.getLookupAfm([ "Carrier Name", "Carrier" ])} projectId={cfg.projectId}
                                 onLoadingChanged={e => {}} onError={e => {}}>
                            {
                                (executionResult) => {
                                    console.log('ScheduledFlightSearchPanel _c.props.data.carrierCodesInSearchResult', _c.props.data.carrierCodesInSearchResult)
                                    let options = executionResult.result.rawData.map((row) => {
                                        return {
                                            value: row[0].id, label: row[0].name,
                                            codeValue: row[1].id, codeLabel: row[1].name
                                        }
                                    }).filter(row => ( // show only airlines from the list of scheduled flights
                                        !_c.props.data.carrierCodesInSearchResult || _c.props.data.carrierCodesInSearchResult[row.codeLabel]
                                    ));
                                    this.props.setAttributeElements(C.attributeDisplayForm("Carrier Name"), options)
                                    return (
                                            <Col xs={6} className="search-results-carrier-select-drop">
                                                <Select id="carrier" style={{margin: '5px'}}
                                                        value={_c.props.data.carrierSearch}
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
                <div className="search-results">
                    <Row>
                        <Col xs={12}>
                            {search_results}
                        </Col>
                    </Row>
                </div>
            </Container>

        );
    }

}

const mapDispatchToProps = {
    onOriginSubmit: setScheduledOrigin,
    onCarrierSubmit: setCarrier,
    onPagesSubmit: setPages,
    setAttributeElements
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchPanel);