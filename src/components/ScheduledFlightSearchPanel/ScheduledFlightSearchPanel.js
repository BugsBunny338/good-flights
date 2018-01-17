import React, {Component} from 'react';
import {Container, Row, Col, Label} from 'reactstrap';
import Select from 'react-select';
import {CatalogHelper} from '@gooddata/react-components';
import {Execute} from '@gooddata/react-components';
import {connect} from 'react-redux';

import catalogJson from '../../catalog.json';
import cfg from '../../config';
import { setScheduledOrigin, setPages } from '../../store/actions';

import ScheduledFlightSearchResults from '../ScheduledFlightSearchResults/ScheduledFlightSearchResults';
import ScheduledMapPanel from '../ScheduledMapPanel/ScheduledMapPanel';

const C = new CatalogHelper(catalogJson);


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
                        {_c.props.data.scheduledOrigin && <ScheduledFlightSearchResults />}
                    </Col>
                </Row>

            </Container>

        );
    }

}

const mapDispatchToProps = {
    onOriginSubmit: setScheduledOrigin,
    onPagesSubmit: setPages,
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightSearchPanel);