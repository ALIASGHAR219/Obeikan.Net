export interface OrderProcessingElement {
    itemID: number;
    PO: string;
    itemCode: number;
    poTarget: string;
    plannedStart: string;
    plannedEnd: string;
    createdBy: string;
    icon: any;
    createdOn: Date;
}
