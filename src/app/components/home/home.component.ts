import { ApiDbService } from './../../services/api-db.service';
import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  data: any = [];
  svg: any;
  margin = 50;
  width = window.innerWidth - 200 - this.margin * 2;
  height = 400 - this.margin * 2;

  constructor(private apiDbService: ApiDbService) {
    this.apiDbService.getAllData().then((response) => {
      this.data = response.data.recordset;
      let arrayResidencial = this.data.filter(function (el: any) {
        return (
          el.cliente === 'Residencial' &&
          el.linea === 'Tramo 1' &&
          parseInt(el.dato) >= 398
        );
      });
      console.log(this.data);
      this.createSvg();
      this.drawBars(arrayResidencial);
    });
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.fecha.split('T')[0]))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([395, 405]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.fecha.split('T')[0]))
      .attr('y', (d: any) => y(d.dato))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.dato))
      .attr('fill', '#d04a35');
  }

  ngOnInit() {}

  onResize(event: { target: { innerWidth: any } }) {
    this.width = event.target.innerWidth;
  }
}
