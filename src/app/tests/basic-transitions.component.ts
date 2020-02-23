import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'line-chart',
  templateUrl: './basic-transitions.component.html'
})

export class BasicTransitionsComponent {

    svg: any;

    ngAfterContentInit() {
        this.svg = d3.select('svg')

        this.svg.selectAll('circle')
            .data([1, 2, 3, 4])
            .join('circle')
            .attr('cx', 50)
            .attr('cy', (d, i) => i * 75 + 50)
            .attr('r', 20)
            .style('fill', 'white')

            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .attr('cx', 400) 

            .transition()
            .delay((d, i) => i * 500)
            .duration(300)
            .attr('cx', 600)
        
    }

}