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
    this.update(nextProps)
  },

  shouldComponentUpdate() {
    return false
  },

  update(props) {
    this.gauge.setOptions(this.props.options)
    this.gauge.maxValue = this.props.max;
    let value = -1
    if (this.props.value > 0) {
      if (this.props.value > this.props.max) {
        value = this.props.max + 1
      } else {
        value = this.props.value
      }
    }
    this.gauge.set(value);
  },

  render(){
    return <canvas width={this.props.width} height={this.props.height} />
  }
})

export default GaugeWrapper