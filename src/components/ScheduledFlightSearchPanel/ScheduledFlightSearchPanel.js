import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import { setScheduledOrigin, setPages, setAttributeElements } from '../../store/actions';

import ScheduledFlightSearchResults from '../ScheduledFlightSearchResults/ScheduledFlightSearchResults';
import ScheduledMapPanel from '../ScheduledMapPanel/ScheduledMapPanel';

const C = new CatalogHelper(catalogJson);

const ORIGIN_IATA_CODE = 'Origin IATA Code'

class ScheduledFlightSearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setOrigin = this.setOrigin.bind(this);
    }

    setOrigin(selection) {
        this.props.onPagesSubmit({pages:[this.props.navigation.pages[0], {page: <ScheduledMapPanel/>, breadcrumb: 'Map'}]});
        this.props.onOriginSubmit({scheduledOrigin:selection});
    }

    getLookupAfm(attribute = ORIGIN_IATA_CODE) {
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
                </div>
                <div className="search-results">
                    <Row>
                        <Col xs={12}>
                            {_c.props.data.scheduledOrigin && <ScheduledFlightSearchResults />}
                        </Col>
                    </Row>
                </div>
            </Container>

        );
    }

}

const mapDispatchToProps = {
    onOriginSubmit: setScheduledOrigin,
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