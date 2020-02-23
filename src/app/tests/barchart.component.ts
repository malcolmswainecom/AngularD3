import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import * as d3Collection from "d3-collection"

@Component({
  selector: 'barChart',
  templateUrl: './barChart.component.html',
  styles: [`
  /deep/ svg {border: 1px solid #ccc;}
  /deep/ text { font-family: \'Avenir\', sans-serif;font-size: 10px;fill: white;}
  /deep/ text > tspan { font-size: 20px;}
  /deep/ .axis .domain {stroke: #bbb;}
  /deep/ .axis .tick line {stroke: #bbb;stroke-width: 0.5;stroke-dasharray: 4, 2;}
  /deep/ .axes-labels text {font-size: 0.6em;fill: #444;}
  `]
})

export class BarChartComponent implements OnInit {

  constructor() {}
  ngOnInit(){}


    formatTicks(d){
        return d3.format('~s')(d)
        .replace('M', ' Mil')
        .replace('G', ' Bil')
        .replace('T', ' Tril')
    }

  ngAfterContentInit() {
  
    // set margins
    const margins = { top: 60, right: 60, bottom: 60, left: 120 }

    // width and height taking into account margins
    const width = 600 - margins.right - margins.left;
    const height = 800 - margins.top - margins.bottom;

    d3.json('data/moviesParsed.json').then(res => {
       console.log(res);

       const svg = d3.select('#svgParent')
       .append('svg')
       .attr('width', width + margins.left + margins.right)
       .attr('height', height + margins.top + margins.bottom)
       .append('g')
       .attr('transform', `translate(${margins.left}, ${margins.top})`)

        // Draw header.
        const header = svg
        .append('g')
        .attr('class', 'bar-header')
        .attr('transform', `translate(0,${-margins.top * 0.6})`)
        .append('text');

        header.append('tspan').text('Total revenue by genre in $US');

        header
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1.5em')
        .style('font-size', '0.8em')
        .style('fill', '#555')
        .text('Films w/ budget and revenue figures, 2000-2009');




        // get the max data size
        const xMax = d3.max(res as any[], (d: any) => d.revenue )

        // create a data map between our data size and svg size
        const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0,width])

        // map each genre to a height scale interval
        const yScale = d3.scaleBand()
        .domain((res as any[]).map(d => d.genre))
        .rangeRound([0, height])
        .paddingInner(0.25)

        // create the bars mapping them to our data
        const bars = svg
                .selectAll('.bar')
                .data(res as any[])
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('y', d => yScale(d.genre))
                .attr('width', d => xScale(d.revenue))
                .attr('height', d => yScale.bandwidth())
                .style('fill', 'dodgerBlue')

        // create x axis at top
        const xAxis = d3.axisTop(xScale)
                        .tickFormat(this.formatTicks)
                        .tickSizeInner(-height)
                        .tickSizeOuter(0);

        // create a container and set font
        const xAxisDraw = svg.append('g')
                    .attr('class', 'x axis');
        xAxisDraw.selectAll('text').attr('font-size', '16px')
        
        // Render
        xAxis(xAxisDraw);

        const yAxis = d3.axisLeft(yScale).tickSize(0);

        const yAxisDraw = svg.append('g')
                            .attr('class', 'y axis')
                            .call(yAxis)

        // format our y axis
        yAxisDraw.selectAll('text').attr('dx', '-0.6em')
        //yAxisDraw.selectAll('text').attr('font-size', '16px')

         


        //debugger
    })
  }
}
