import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styles: [`
  /deep/ svg {
    border: 1px solid #ccc;
  }
  
  /deep/ text {
    font-family: 'Avenir', sans-serif;
  }
  
  /deep/ .axis .domain {
    stroke: #bbb;
  }
  
  /deep/ .axis .tick line {
    stroke: #bbb;
    stroke-width: 0.5;
    stroke-dasharray: 4, 2;
  }
  
  /deep/.axes-labels text {
    font-size: 0.6em;
    fill: #444;
  }
  
  `]
})

export class ScatterChartComponent implements OnInit {

    constructor() {}
    ngOnInit(){}


    // formatTicks(d){
    //     return d3.format('~s')(d)
    //     .replace('M', ' Mil')
    //     .replace('G', ' Bil')
    //     .replace('T', ' Tril')
    // }

    prepareScatterData(data) {
      return data.sort((a, b) => b.budget - a.budget).filter((d, i) => i < 100);
    }

    formatTicks(d) {
      return d3
        .format('~s')(d)
        .replace('M', ' mil')
        .replace('G', ' bil')
        .replace('T', ' tril');
    }
    
     addLabel(axis, label, x) {
      axis
        .select('.tick:last-of-type text')
        .clone()
        .text(label)
        .attr('x', x)
        .style('text-anchor', 'start')
        .style('font-weight', 'bold')
        .style('fill', '#555');
    }

  ngAfterContentInit() {

    d3.json('data/scatterPlotMovies.json').then(scatterData => {
      console.log(scatterData);

      // Dimensions.
      const margin = { top: 80, right: 40, bottom: 40, left: 60 };
      const width = 500 - margin.right - margin.left;
      const height = 500 - margin.top - margin.bottom;

      // Scales.d3.extent(scatterData, d => d.revenue)
      let xExtent = d3
        .extent(scatterData as any[], d => (d as any).budget);

      (xExtent as any[]).map((d, i) => (i === 0 ? d * 0.95 : d * 1.05));

      const xScale = d3
        .scaleLinear()
        .domain(xExtent as any[])
        .range([0, width]);

      let yExtent = d3.extent(scatterData as any[], d => (d as any).revenue);
       // .map((d, i) => (i === 0 ? d * 0.1 : d * 1.1));
       (yExtent as any[]).map((d, i) => (i === 0 ? d * 0.95 : d * 1.05));

      const yScale = d3
        .scaleLinear()
        .domain(yExtent as any[])
        .range([height, 0]);

      // Draw base.
      const svg = d3
        .select('#svgParent')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Draw header.
      const header = svg
        .append('g')
        .attr('class', 'scatter-header')
        .attr('transform', `translate(0,${-margin.top * 0.6})`)
        .append('text');

      header.append('tspan').text('Budget vs. Revenue in $US');

      header
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1.5em')
        .style('font-size', '0.8em')
        .style('fill', '#555')
        .text('Top 100 films by budget, 2000-2009');

      // Draw x axis.
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(5)
        .tickFormat(this.formatTicks)
        .tickSizeInner(-height)
        .tickSizeOuter(0);

      const xAxisDraw = svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .call(this.addLabel, 'Budget', 25);

      xAxisDraw.selectAll('text').attr('dy', '1em');

      // Draw y axis.
      const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickFormat(this.formatTicks)
        .tickSizeInner(-width)
        .tickSizeOuter(0);

      const yAxisDraw = svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .call(this.addLabel, 'Revenue', 5);

      // Draw scatter.
      svg
        .append('g')
        .attr('class', 'scatter-points')
        .selectAll('.scatter')
        .data(scatterData as any[])
        .enter()
        .append('circle')
        .attr('class', 'scatter')
        .attr('cx', d => xScale((d as any).budget))
        .attr('cy', d => yScale((d as any).revenue))
        .attr('r', 3)
        .style('fill', 'dodgerblue')
        .style('fill-opacity', 0.7);


    })
  }
}
