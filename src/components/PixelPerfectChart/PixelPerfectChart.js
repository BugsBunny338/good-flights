import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Row, Col} from 'reactstrap';


class PixelPerfectChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { width, height, src } = this.props;
        return (
                <Row>
                    <Col xs={12}>
                <iframe width={width ? width : "100%"} height={height ? height : "400px"}
                    frameBorder={0}
                        src={src}
                    allowTransparency="true">
                </iframe>
                    </Col>
                </Row>
        );
    }

}

const mapDispatchToProps = {};


function mapStateToProps(state) {
    return {
        data: state.data,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PixelPerfectChart);