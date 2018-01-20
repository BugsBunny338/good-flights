import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Row, Col} from 'reactstrap';


class PixelPerfectChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.iframe = this.iframe.bind(this);
    }

    iframe() {
        const {src, width, height} = this.props;
        return {
            __html: `<iframe width="${width ? width : "100%"}" height="${height ? height : "400px"}" frameBorder="0" src="${src}" allowTransparency="true">`
        };
    }

    render() {
        return (
                <Row>
                    <Col xs={12}>
                        <div dangerouslySetInnerHTML={this.iframe()}/>
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