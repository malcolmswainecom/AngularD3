import { Component, OnInit } from '@angular/core'
import * as d3 from 'd3'

@Component ({
    selector: 'home',
    templateUrl: './lollipop.component.html'
})


export class LollipopComponent implements OnInit {

  ngOnInit(){

    d3.json('data/harry_potter.json').then(data => {
      console.log(data);
    })
  }
  

  ngAfterContentInit(){
    const svg = d3.select("#svgParent")
    .append('svg')
    .attr('width', 500)
    .attr('height', 400)

    const lollipop = svg.append('g').attr('transform', 'translate(100,100)');
    
    lollipop.append('line')
    .attr('x2', 200)
    .style('stroke', 'white')

    lollipop.append('circle')
    .attr('cx', 200)
    .style('r', 3)
    .style('stroke', 'white')

    lollipop.append('text')
    .attr('y', -10)
    .text('hi')
    .style('stroke', 'white')

  }
}
