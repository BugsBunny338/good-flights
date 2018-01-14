import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";
import OpenWeather from "../../weather/OpenWeather";
import passwd from "../../passwd";
import airports from "../../flightapi/airports";


class ScheduledFlightDetailPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getWeather = this.getWeather.bind(this);
        this.retrieveForecast = this.retrieveForecast.bind(this);

    }

    retrieveForecast(lat, lon, time, callback) {
        let o = new OpenWeather(passwd.openWeatherKey);
        o.forecast(lat, lon, (err, r) => {
            if(err) {
                let message = `ScheduledFlightDetailPanel: error retrieving forecast for (${lat},${lon}) and time '${time}': ${JSON.stringify(err, null,2)}`;
                console.log(message);
                callback(undefined, Error(message));
            }
            else {
                //console.log(`time:${time}`);
                //console.log(`forecast:${JSON.stringify(r.map( a => a.dt),null,2)}`);
                let ret = r.reduce((acc,value) => Math.abs(value.dt - time) < Math.abs(acc.dt - time) ? value : acc);
                //console.log(`result:${JSON.stringify(ret,null,2)}`);
                callback(ret);
            }
        });

    }

    getWeather() {
        let _c = this;
        if(_c.props.data && _c.props.data.schedule && _c.props.data.schedule.origin &&
            this.props.data.schedule.destination) {
            let origin = airports[_c.props.data.schedule.origin];
            this.retrieveForecast(origin.lat, origin.lon, _c.props.data.schedule.filed_departuretime, (or, oe)  => {
                let destination = airports[_c.props.data.schedule.destination];
                this.retrieveForecast(destination.lat, destination.lon, _c.props.data.schedule.estimatedarrivaltime, (dr, de) => {
                   // or dr
                   //console.log(`Origin = ${_c.props.data.schedule.origin} forecast = ${JSON.stringify(or, null,2)}`);
                    _c.setState({destinationWeather: dr, originWeather: or, origin, destination});
                   //console.log(`Destination = ${_c.props.data.schedule.destination} forecast = ${JSON.stringify(dr, null,2)}`);
               });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.schedule && nextProps.data.schedule.origin && nextProps.data.schedule.destination &&
            (!this.props.data || !this.props.data.schedule || !this.props.data.schedule.origin ||
                !this.props.data.schedule.destination ||
                nextProps.data.schedule.origin !== this.props.data.schedule.origin ||
                nextProps.data.schedule.destination !== this.props.data.schedule.destination )) {

                this.getWeather();
        }
    }

    componentDidMount() {
        if (this.props.data && this.props.data.schedule && this.props.data.schedule.origin &&
            this.props.data.schedule.destination ) {

            this.getWeather();
        }
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col xs={12}>
                        <p>{this.props.data.schedule.origin} Weather: {JSON.stringify(this.state.originWeather,null,2)}</p>
                        <p>{this.props.data.schedule.destination} Weather: {JSON.stringify(this.state.destinationWeather, null, 2)}</p>
                    </Col>
                </Row>

            </Container>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return {};
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledFlightDetailPanel);