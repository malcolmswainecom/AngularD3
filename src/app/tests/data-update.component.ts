import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'line-chart',
  templateUrl: './data-update.component.html',
  styleUrls: ['./data-update.component.css']
})


export class DataUpdateComponent {
    
    friends: any = {
        biff: ['Apples', 'Oranges', 'Lemons'],
        chip: ['Apples', 'Oranges'],
        kipper: ['Apples', 'Cherries', 'Peaches', 'Oranges'],
      };

    svg: any;

    ngAfterContentInit() {
        this.svg = d3.select('svg')
        d3.selectAll('button').on('click', this.click);
        that = this;
    }

    click(){
        let data = that.friends[(this as any).dataset.name];
        that.update(data)
    }

    update(data){
        let join = this.svg.selectAll('text')
            .data(data, d => d)
            .join(
                enter => 
                    { enter.append('text')
                    .text(d => d)
                    .attr('x', -100)
                    .attr('y', (d, i) => i * 30 + 50)
                    .style('fill', 'dodgerBlue')
                    .transition()
                    .attr('x', 30) },
                update => update
                    .transition()
                    .style('fill', 'gray')
                    .attr('y', (d,i) => i * 30 + 50),
                exit => exit
                    .transition()
                    .attr('x', 150)
                    .style('fill', 'tomato')
                    .remove()
                )
    }
}

let that;