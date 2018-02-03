import React from 'react';
import ReactDOM from 'react-dom'
import { Gauge } from 'gaugeJS'

var GaugeWrapper = React.createClass({
  componentDidMount() {
    var target = ReactDOM.findDOMNode(this)
    this.gauge = new Gauge(target);
    this.update(this.props)
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.update(nextProps)
    }
  },

  update(props) {
    this.gauge.setOptions(props.options)
    this.gauge.maxValue = props.max;
    let value = 0
    if (props.value > 0) {
      if (props.value > props.max) {
        value = props.max
      } else {
        value = props.value
      }
    }
    this.gauge.set(value);
  },

  render(){
    return <canvas width={this.props.width} height={this.props.height} />
  }
})

export default GaugeWrapper