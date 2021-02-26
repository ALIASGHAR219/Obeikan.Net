import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './screens/authentications/login/login.component';
import { HomeComponent } from './screens/home/home.component';
// import { KpimanagmentComponent } from './screens/kpimanagment/kpimanagment.component';
import { MissionComponent } from './screens/mission/mission.component';
import { RolelistComponent } from './screens/usermanagement/rolelist/rolelist.component';
import { RolepermissionsComponent } from './screens/usermanagement/rolepermissions/rolepermissions.component';
import { UserslistComponent } from './screens/usermanagement/userslist/userslist.component';
import { VisionComponent } from './screens/vision/vision.component';
import { YearlyscorecardComponent } from './screens/yearlyscorecard/yearlyscorecard.component';
import { PublicLayoutComponent } from './shared/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './shared/private-layout/private-layout.component';
import { AuthGuard } from './services/auth.guard';
import { SignUpComponent } from './screens/authentications/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './screens/authentications/forgot-password/forgot-password.component';
import { ProductionOrderManagementComponent } from './screens/production-order-management/production-order-management.component';
import { OrderProcessingComponent } from './ProductionOrderComponents/order-processing/order-processing.component';
import { ShopFloorDataComponent } from './ProductionOrderComponents/shop-floor-data/shop-floor-data.component';
import { O3AdministrationComponent } from './screens/o3-administration/o3-administration.component';
import { ManufacturingAdminComponent } from './O3AdministrationComponents/manufacturing-admin/manufacturing-admin.component';
// import { KpisAdminComponent } from './O3AdministrationComponents/kpis-admin/kpis-admin.component';
import { QualityAdminComponent } from './O3AdministrationComponents/quality-admin/quality-admin.component';
import { GeneralSettingsComponent } from './O3AdministrationComponents/general-settings/general-settings.component';
import { MasterDataUploadComponent } from './O3AdministrationComponents/master-data-upload/master-data-upload.component';
import { PlantModelComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/plant-model/plant-model.component';
import { MachineParametersComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/machine-parameters/machine-parameters.component';
import { ProductDetailComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/product-detail/product-detail.component';
import { DtConfigurationComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/dt-configuration/dt-configuration.component';
import { OeeConfigurationComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/oee-configuration/oee-configuration.component';
import { CilConfigurationComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/cil-configuration/cil-configuration.component';
import { DefectConfigurationComponent } from './O3AdministrationComponents/ManufacturingAdminComponents/defect-configuration/defect-configuration.component';
import { UsermanagementComponent } from './screens/usermanagement/usermanagement.component';
import { VerifyCodeComponent } from './screens/authentications/verify-code/verify-code.component';
import { NewPasswordComponent } from './screens/authentications/new-password/new-password.component';
import { ProductionDbComponent } from './O3AdministrationComponents/production-db/production-db.component';
import { AutonomousMaintananceDbComponent } from './O3AdministrationComponents/autonomous-maintanance-db/autonomous-maintanance-db.component';
import { MachineboardComponent } from './screens/analytics/machineboard/machineboard.component';
import { MenusComponent } from './screens/usermanagement/menus/menus.component';
import { AnalyticsComponent } from './screens/analytics/analytics.component';

const routes: Routes = [
  // Public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent },
      {path: 'signup', component: SignUpComponent},
      {path: 'forgotpassword', component: ForgotPasswordComponent},
      {path: 'verify-code', component: VerifyCodeComponent},
      {path: 'new-password', component: NewPasswordComponent},
      { path: '', component: LoginComponent }
    ]
  },
  // Private layout
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'logout', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      // { path: 'kpimanagement', component: KpimanagmentComponent, canActivate: [AuthGuard] },
      { path: 'vision', component: VisionComponent, canActivate: [AuthGuard] },
      { path: 'mission', component: MissionComponent, canActivate: [AuthGuard] },
      { path: 'roles', component: RolelistComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserslistComponent, canActivate: [AuthGuard] },
      { path: 'menus', component: MenusComponent, canActivate: [AuthGuard]},
      { path: 'rolepermissions', component: RolepermissionsComponent, canActivate: [AuthGuard] },
      { path: 'usermanagement', component: UsermanagementComponent, canActivate: [AuthGuard]},
      // Kpi tree section

      { path: 'yearlyscorecard', component: YearlyscorecardComponent, canActivate: [AuthGuard] },
      // production order Management routes
      {path: 'productionordermanagement', component: ProductionOrderManagementComponent, canActivate: [AuthGuard]},
      {path: 'orderprocessing', component: OrderProcessingComponent, canActivate: [AuthGuard]},
      {path: 'shopfloordata', component: ShopFloorDataComponent, canActivate: [AuthGuard]},
      // super administrations routes
      {path: 'administration', component: O3AdministrationComponent, canActivate: [AuthGuard]},
      {path: 'manufacturingadmin', component: ManufacturingAdminComponent, canActivate: [AuthGuard]},
      // {path: 'kpisadmin', component: KpisAdminComponent, canActivate: [AuthGuard] },
      {path: 'qualityadmin', component: QualityAdminComponent, canActivate: [AuthGuard]},
      {path: 'generalsettings', component: GeneralSettingsComponent, canActivate: [AuthGuard]},
      {path: 'masterdataupload', component: MasterDataUploadComponent, canActivate: [AuthGuard]},
      {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
      // manufacturing admin routes
      {path: 'plantmodel', component: PlantModelComponent, canActivate: [AuthGuard]},
      {path: 'machineparameters', component: MachineParametersComponent, canActivate: [AuthGuard]},
      {path: 'productdetail', component: ProductDetailComponent, canActivate: [AuthGuard]},
      {path: 'dtconfiguration', component: DtConfigurationComponent, canActivate: [AuthGuard]},
      {path: 'oeeconfiguration', component: OeeConfigurationComponent, canActivate: [AuthGuard]},
      {path: 'cilconfiguration', component: CilConfigurationComponent, canActivate: [AuthGuard]},
      {path: 'defectconfiguration', component: DefectConfigurationComponent, canActivate: [AuthGuard]},
      { path: 'production-db', component: ProductionDbComponent, canActivate: [AuthGuard] },
      { path: 'autonomous-maintanance-db', component:  AutonomousMaintananceDbComponent, canActivate: [AuthGuard] },
      { path: 'machineboard', component:  MachineboardComponent, canActivate: [AuthGuard] },

    ],
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
