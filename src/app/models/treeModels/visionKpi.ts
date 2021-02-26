export interface VisionKpi {
    visionId: number;
    quantify: string;
    yearFrom: number;
    yearTo: number;
    groupId: number;
    plantId: number;
    remarks: string;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    createdOn: Date;
    createdBy: number;
    updatedOn: Date;
    updatedBy: number;
    deletedAt: Date;
}
