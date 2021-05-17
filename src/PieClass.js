import React, { createRef, Component } from "react";
import * as d3 from "d3";

class PieClass extends Component {
  constructor(props) {
    super(props);
    this.width = this.props.width
    this.height = this.props.height
    this.outerRadius = this.props.outerRadius;
    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value(d => d.value)
      .sort(null);
    this.width1 = 500;
    this.height1 = 400;
    this.radius = Math.min(this.width1, this.height1)/2;
    //this.colors = d3.scaleOrdinal(['lightblue', 'darkblue', 'gray']);
    // this.format = d3.format(".2f");
  }
  componentDidMount() {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(this.props.data);
    const createArc = d3
      .arc()
      .innerRadius(this.radius*0.8)
      .outerRadius(this.radius*0.6);
    const outerArc = d3.arc()
                .outerRadius(this.radius * 0.9)
                .innerRadius(this.radius * 0.9);
    svg
      .attr("class", "chart")
      .attr("width", this.width)
      .attr("height", this.height);

    const group = svg
      .append("g")
      .attr("transform", "translate(" + this.width1 / 2 + "," + this.height1 / 2 + ")");

    const groupWithEnter = group
      .selectAll("g.arc")
      .data(data)
      .enter();

    const path = groupWithEnter.append("g").attr("class", "arc");

    path.append("g")
      .attr("class", "slices");
    path.append("g")
      .attr("class", "labels");
    path.append("g")
      .attr("class", "lines");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => d.data.color);
    
    path.append('g').classed('labels',true);
    path.append('g').classed('lines',true);

    svg.select('.lines')
        .selectAll('polyline')
        .data(data)
        .enter().append('polyline')
        .attr('points', function(d) {
          var pos = outerArc.centroid(d);
          return [createArc.centroid(d), outerArc.centroid(d), pos]
        }).style('stroke', function(d) {
          return d.data.color;
        });

    svg.select('.labels').selectAll('text')
        .data(data)
        .enter().append('text')
        .attr('dy', '.35em')
        .html(function(d) {
            return d.data.label+ ':' +d.value;
        })
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            return (midAngle(d)) < Math.PI ? 'start' : 'end';
        });    

    function midAngle(d) { console.log(d); return d.startAngle + (d.endAngle - d.startAngle) / 2; }
  }

  render() {
    return <svg ref={this.ref} />;
  }
}

export default PieClass;
