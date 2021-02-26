import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-picker-cell-editor',
  template: `
    <p-calendar
      #container
      [(ngModel)]="value"
      [appendTo]="'body'"
      [style]="{ height: '100%', width: '100%' }"
      [inputStyle]="{ height: '100%', width: '100%' }"
      [monthNavigator]="true"
      yearRange="2015:2030"
      dateFormat="dd/mm/yy"
      (onSelect)="onSelect($event)"
      [baseZIndex]="10000"
    ></p-calendar>
  `,
  styles: [``],
})
export class PrimeCellEditorComponent
  implements AgEditorComponent, AfterViewInit {
  params: any;
  value!: Date;

  @ViewChild('container', { static: true }) public container: any;

  agInit(params: any): void {
    this.params = params;

    if (this.params.value) {
      const dateArray = this.params.value.split('/');

      const day = parseInt(dateArray[0], 10);
      const month = parseInt(dateArray[1], 10);
      const year = parseInt(dateArray[2], 10);

      this.value = new Date(year, month - 1, day);
    }
  }

  // open the calendar when grid enters edit mode, i.e. the datepicker is rendered
  ngAfterViewInit(): any {
    this.container.toggle();
  }

  // ensures that once a date is selected, the grid will exit edit mode and take the new date
  // otherwise, to exit edit mode after a selecting a date, click on another cell or press enter
  onSelect(event: any): any {
    this.params.api.stopEditing(false);
  }

  getValue(): any {
    const d = this.value;
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
}
