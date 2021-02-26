import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-o3-percentage-graph',
  templateUrl: './o3-percentage-graph.component.html',
  styleUrls: ['./o3-percentage-graph.component.scss']
})
export class O3PercentageGraphComponent implements OnInit {
  @Input() barProperties: any ;
  constructor() { }

  ngOnInit(): void {
  }

}
