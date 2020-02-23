import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})



export class LineChartComponent {
    formatTicks(d) {
        return d3
          .format('~s')(d)
          .replace('M', ' mil')
          .replace('G', ' bil')
          .replace('T', ' tril');
      }

    ready(lineChartData) {
       
        // Dimensions.
        const margin = { top: 80, right: 60, bottom: 40, left: 60 };
        const width = 500 - margin.right - margin.left;
        const height = 500 - margin.top - margin.bottom;

        var dates: any[] = lineChartData.dates.map(d => new Date(d))

        var xExtent = d3.extent(dates);

        const xScale = d3
            .scaleTime()
            .domain(xExtent)
            .range([0, width])

        const yScale = d3
            .scaleLinear()
            .domain([0, lineChartData.yMax])
            .range([height, 0])

        const lineGen = d3.line()
            .x(d =>  xScale(new Date((d as any).date)))    
            .y(d => yScale((d as any).value)) 


        // Draw base.
        const svg = d3
            .select('#svgParent')
            .append('svg')
            .attr('width', width + margin.right + margin.left)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);


        // Draw x axis.
        const xAxis = d3
            .axisBottom(xScale)
            .tickSizeOuter(0);

        // const xAxisDraw = svg
        //     .append('g')
        //     .attr('class', 'x axis')
        //     .attr('transform', `translate(0, ${height})`)
        //     .call(xAxis)

         // Draw y axis.
        const yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
            .tickFormat(this.formatTicks)
            .tickSizeInner(-width)
            .tickSizeOuter(0);

        // const yAxisDraw = svg
        //     .append('g')
        //     .attr('class', 'y axis')
        //     .call(yAxis)

         // Draw header.
      const header = svg
        .append('g')
        .attr('class', 'scatter-header')
        .attr('transform', `translate(0,${-margin.top * 0.6})`)
        .append('text');

        header.append('tspan').text('Budget and Revenue over time');

        header
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1.5em')
        .style('font-size', '0.8em')
        .style('fill', '#555')
        .text('Top 100 films by budget, 2000-2009');

        // give the lines a container and a class
        const chartGroup = svg.append('g').attr('class', 'line-chart')

        // Draw the series lines
        chartGroup.selectAll('.line-series')
            .data(lineChartData.series)
            .enter()
            .append('path')
            .attr('class', d => `line-series ${(d as any).name}`)
            .attr('d', d => lineGen((d as any).values))
            .style('fill', 'none')
            .style('stroke', d => (d as any).color)
        
        // Add the series labels 
        chartGroup.append('g')
            .attr('class', 'series-labels')
            .selectAll('.series-label')
            .data(lineChartData.series)
            .enter()
            .append('text')
            .attr('x', d=> xScale(new Date((d as any).values[(d as any).values.length -1].date)) + 5)
            .attr('y', d=> yScale((d as any).values[(d as any).values.length -1].value) + 5)
            .text(d => (d as any).name)
            .style('dominant-baseline', 'central')
            .style('font-size', '0.7em')
            .style('font-weight', 'bold')
            .style('fill', d => (d as any).color)

    }

    ngAfterContentInit() {

        d3.json('data/bar-chart-data.json').then(data => {
            this.ready(data[0]);
        });

    }
}