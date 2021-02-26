export interface UserPermission {
    MenuId: number;
    MenuName: string;
    ParentName: string;
    Actions: string;
    IsCreate: boolean;
    IsUpdate: boolean;
    IsRead: boolean;
    IsApprove: boolean;
    IsDelete: boolean;
    IsPrint: boolean;
    IsSelect: boolean;
}
