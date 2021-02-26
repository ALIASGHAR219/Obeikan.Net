import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'btn-cell-renderer',
    template: ` <button mat-mini-fab color="warn" (click)="onClick($event)">
                 <i class="fa fa-times" style="color: #fff;"></i>
            </button>`
})
// tslint:disable-next-line:component-class-suffix
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
    private params: any;
    refresh(params: any): boolean {
        throw new Error('Method not implemented.');
    }

    agInit(params: any): void {
        this.params = params;
    }

    onClick($event: any): any {
        if (this.params.onClick instanceof Function) {
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params.node.data
                // ...something
            };
            this.params.onClick(params);
        }
    }
    ngOnDestroy(): any {
        // no need to remove the button click handler
        // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }
}
