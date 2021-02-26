import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  template: `
    <p-calendar
      [(ngModel)]="date"
      [panelStyleClass]="'ag-custom-component-popup'"
      [appendTo]="'body'"
      [placeholder]="'dd/mm/yyyy'"
      dateFormat="dd/mm/yyyy"
      [showIcon]="true"
      [monthNavigator]="true"
      [showButtonBar]="true"
      (onSelect)="onSelect($event)"
      (onClearClick)="onClearClick($event)"
      (onInput)="onInput($event)"
      [baseZIndex]="10000"
    ></p-calendar>
  `,
  styles: [``],
})
export class CustomDateComponent {
  date!: Date;
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onSelect(date: any): any {
    this.date = date;
    this.params.onDateChanged();
  }

  onClearClick(event: any): any {
    this.params.onDateChanged();
  }

  onInput(event: any): any {
    this.params.onDateChanged();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date || null;
  }
}
