import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import * as d3Collection from "d3-collection"

@Component({
  templateUrl: './tool-tip-bar-chart.component.html',
  styleUrls: ['tool-tip-bar-chart.component.css']
})

export class ToolTipBarChartComponent {

    bars:any;
    sourceData: any[];
    yScale: any;
    xScale: any;

    xAxisDraw: any;
    xAxis: any;

    yAxisDraw: any;
    yAxis: any;

    svg: any;
    width: any;
    height: any;
    header: any;

    tip: any;

    formatTicks(d){
        return d3.format('~s')(d)
        .replace('M', ' Mil')
        .replace('G', ' Bil')
        .replace('T', ' Tril')
    }

    cutText(str){
        return str.length < 35 ? str : str.substr(0, 35) + '...'
    }

    ngAfterContentInit() {
    
        that = this; // make sure we have a reference to this

        // set margins
        const margins = { top: 60, right: 60, bottom: 60, left: 200 }

        // width and height taking into account margins
        this.width = 800 - margins.right - margins.left;
        this.height = 800 - margins.top - margins.bottom;

        d3.json('data/transitional-bar-chart.json').then(data => {

            this.sourceData = data as any[];
            
            let revenueData = (this.sourceData).sort((a, b) => b.revenue - a.revenue)
                                .filter((d, i) => i < 15)


            this.svg = d3.select('#svgParent')
                .append('svg')
                .attr('width', this.width + margins.left + margins.right)
                .attr('height', this.height + margins.top + margins.bottom)
                .append('g')
                .attr('transform', `translate(${margins.left}, ${margins.top})`)

            // Draw header.
            this.header = this.svg
                .append('g')
                .attr('class', 'bar-header')
                .attr('transform', `translate(0,${-margins.top * 0.6})`)
                .append('text');

            this.header.append('tspan').text('Total revenue by genre in $US');

            this.header
                .append('tspan')
                .attr('x', 0)
                .attr('dy', '1.5em')
                .style('font-size', '0.8em')
                .style('fill', '#555')
                .text('Films w/ budget and revenue figures, 2000-2009');

            // get the max data size
            const xMax = d3.max(revenueData as any[], (d: any) => d.revenue )

            // create a data map between our data size and svg size
            this.xScale = d3.scaleLinear()
                .domain([0, xMax])
                .range([0,this.width])

            // map each genre to a height scale interval
            this.yScale = d3.scaleBand()
                .domain((revenueData as any[]).map(d => this.cutText(d.title)))
                .rangeRound([0, this.height])
                .paddingInner(0.25)

            // create the bars mapping them to our data
            this.bars = this.svg
                    .append('g')
                    .attr('class', 'bars')

           

            // create x axis at top
            this.xAxis = d3.axisTop(this.xScale)
                            .tickFormat(this.formatTicks)
                            .ticks(5)
                            .tickSizeInner(-this.height)
                            .tickSizeOuter(0);

            // create a container and set font
            this.xAxisDraw = this.svg.append('g')
                        .attr('class', 'x axis')
                        .call(this.xAxis);


            this.yAxis = d3.axisLeft(this.yScale).tickSize(0);

            this.yAxisDraw = this.svg.append('g')
                                .attr('class', 'y axis')
                                .call(this.yAxis)

            // format our y axis
            this.yAxisDraw.selectAll('text').attr('dx', '-0.6em')

            this.update(revenueData, 'revenue')
            
            d3.selectAll('button').on('click', this.click)

            // add tooltip
            this.tip = d3.select(".tooltip")
            d3.selectAll('.bar')
                .on('mouseover', this.mouseover)
                .on('mousemove', this.mousemove)
                .on('mouseout', this.mouseout)



        })
    }

    mouseover(){
        
        let barData:any = d3.select(this as any).data()[0]

        const bodyData = [
            ['Budget', that.formatTicks(barData.budget)],
            ['Revenue', that.formatTicks(barData.revenue)],
            ['Profit', that.formatTicks(barData.revenue - barData.budget)],
            ['TMDb Popularity', Math.round(barData.popularity)],
            ['IMDb Rating', barData.vote_average],
            ['Genres', barData.genres.join(', ')],
          ];
        
        that.tip
            .style('left', d3.event.clientX + 'px')
            .style('top', d3.event.clientY + 'px')
            .transition()
            .style('opacity', 0.98)

        that.tip.select('h3').html(`${barData.title}, ${barData.release_year}`)
        that.tip.select('h4').html(`${barData.tagline}, ${barData.runtime} min.`)

        d3.select('.tip-body')
            .selectAll('p')
            .data(bodyData)
            .join('p')
            .attr('class', 'tip-info')
            .html(d => `${d[0]}: ${d[1]}`);
    }

    mousemove(){
        that.tip
            .style('left', `${d3.event.clientX + 15}px`)
            .style('top', `${d3.event.clientY}px`)
    }

    mouseout(){
        that.tip
            .transition()
            .style('opacity', 0)
    }

    update(updatedData, metric)
    {
        let xMax = d3.max(updatedData, d => d[metric]);
        that.xScale.domain([0, xMax]);
        that.yScale.domain(updatedData.map(d => that.cutText(d.title)));

        const dur = 1000;
        const t = d3.transition().duration(dur);
        
        that.bars.selectAll('.bar')
            .data(updatedData)
            .join(
                enter => {
                    enter.append('rect')
                    .attr('class', 'bar')
                    .attr('y', d => that.yScale(that.cutText(d.title)))
                    .attr('height', that.yScale.bandwidth())
                    .style('fill', 'lightcyan')
                    .transition(t)
                    .delay((d, i) => i * 20)
                    .attr('width', d => that.xScale(d[metric]))
                    .style('fill', 'dodgerblue');
                    
                },
                update =>{ update
                    .transition(t)
                    .delay((d, i) => i * 20)
                    .attr('y', d => that.yScale(that.cutText(d.title)))
                    .attr('width', d => that.xScale(d[metric])); },
                exit => {
                    exit
                      .transition()
                      .duration(dur / 2)
                      .style('fill-opacity', 0)
                      .remove();
                  }
            )

            // Update Axes.
            that.xAxisDraw.transition(t).call(that.xAxis.scale(that.xScale));
            that.yAxisDraw.transition(t).call(that.yAxis.scale(that.yScale));

            that.yAxisDraw.selectAll('text').attr('dx', '-0.6em');

            // Update header.
            that.header.text(
                `Total ${metric} by title ${metric === 'popularity' ? '' : 'in $US'}`
            );
    }        

    click(){
        let metric = (this as any).dataset.name;
        let updatedData = that.sourceData
                        .sort((a, b)=> b[metric] - a[metric])
                        .filter((d, i) => i < 15)
        that.update(updatedData, metric)
    }
}
let that;
