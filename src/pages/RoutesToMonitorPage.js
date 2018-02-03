import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';

import cfg from '../config';

class RoutesToMonitorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let iframeUrl = `${cfg.gdCustomDomain}/dashboards/embedded/#/project/${cfg.projectId}/dashboard/ad2A0DIEalQa`;

        return (
                <Row>
                  <Col xs={12}>
                     <iframe src={iframeUrl} frameBorder="0" className="gd-full-frame"></iframe>
                  </Col>
                </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesToMonitorPage);