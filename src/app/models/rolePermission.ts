export interface RolePermission {
    MenuId: number;
    MenuName: string;
    ParentName: string;
    IsCreate: boolean;
    IsUpdate: boolean;
    IsRead: boolean;
    IsApprove: boolean;
    IsDelete: boolean;
    IsPrint: boolean;
    IsSelect: boolean;
    Actions: string;
}
