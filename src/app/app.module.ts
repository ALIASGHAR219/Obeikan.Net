import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { MissionComponent } from './screens/mission/mission.component';
import { VisionComponent } from './screens/vision/vision.component';
import { HomeComponent } from './screens/home/home.component';
import { RolelistComponent } from './screens/usermanagement/rolelist/rolelist.component';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './screens/authentications/login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { ContextMenuModule } from 'primeng/contextmenu';
// Prime NG Imports
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from './services/authentication.service';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AgGridModule } from 'ag-grid-angular';
import { PrimeCellEditorComponent } from './editors/prime-cell-editor.component';
import { CustomDateComponent } from './date-components/custom-date-component.component';
import { BtnCellRenderer } from './btn-cell-renderer.component';
import { BtnCellRendererActualEntry } from './btn-cell-rendererActualEntry.component';
import { TreeModule } from 'primeng/tree';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InputMaskModule } from 'primeng/inputmask';
import { WelcombannerService } from './services/welcombanner.service';
import { TooltipModule } from 'primeng/tooltip';
import { PrivateLayoutComponent } from './shared/private-layout/private-layout.component';
import { PublicLayoutComponent } from './shared/public-layout/public-layout.component';
import { SignUpComponent } from './screens/authentications/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './screens/authentications/forgot-password/forgot-password.component';
import { WelcomeBannerComponent } from './shared/welcome-banner/welcome-banner.component';
// Start Material Modules
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// End Material Modules
import { ProductionOrderManagementComponent } from './screens/production-order-management/production-order-management.component';
import { OrderProcessingComponent } from './ProductionOrderComponents/order-processing/order-processing.component';
import { ShopFloorDataComponent } from './ProductionOrderComponents/shop-floor-data/shop-floor-data.component';
import { O3AdministrationComponent } from './screens/o3-administration/o3-administration.component';
import { ManufacturingAdminComponent } from './O3AdministrationComponents/manufacturing-admin/manufacturing-admin.component';
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
import { ProductionDbComponent } from './O3AdministrationComponents/production-db/production-db.component';
import { O3PercentageGraphComponent } from './O3AdministrationComponents/o3-percentage-graph/o3-percentage-graph.component';
import { NgxMatDateAdapter, NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { AnalyticsComponent } from './screens/analytics/analytics.component';
import { AutonomousMaintananceDbComponent } from './O3AdministrationComponents/autonomous-maintanance-db/autonomous-maintanance-db.component';
import { MachineboardComponent } from './screens/analytics/machineboard/machineboard.component';


import { MenusComponent } from './screens/usermanagement/menus/menus.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentAnimateDirective,
    MissionComponent,
    VisionComponent,
    HomeComponent,
    RolelistComponent,
    LoginComponent,
    PrimeCellEditorComponent,
    CustomDateComponent,
    BtnCellRenderer,
    BtnCellRendererActualEntry,
    PrivateLayoutComponent,
    PublicLayoutComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    WelcomeBannerComponent,
    ProductionOrderManagementComponent,
    OrderProcessingComponent,
    ShopFloorDataComponent,
    O3AdministrationComponent,
    ManufacturingAdminComponent,
    QualityAdminComponent,
    GeneralSettingsComponent,
    MasterDataUploadComponent,
    PlantModelComponent,
    MachineParametersComponent,
    ProductDetailComponent,
    DtConfigurationComponent,
    OeeConfigurationComponent,
    CilConfigurationComponent,
    DefectConfigurationComponent,
    UsermanagementComponent,
    O3PercentageGraphComponent,
    ProductionDbComponent,
    AnalyticsComponent,
    AutonomousMaintananceDbComponent,
    MachineboardComponent,
    MenusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    OrganizationChartModule,
    TreeTableModule,
    ToastModule,
    PanelModule,
    ContextMenuModule,
    ButtonModule,
    SidebarModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    TieredMenuModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    TieredMenuModule,
    DialogModule,
    CalendarModule,
    InputSwitchModule,
    BrowserAnimationsModule,
    CommonModule,
    InputNumberModule,
    CardModule,
    NgxSpinnerModule,
    ColorPickerModule,
    TreeModule,
    RadioButtonModule,
    InputMaskModule,
    TooltipModule,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    AgGridModule.withComponents([BtnCellRenderer, BtnCellRendererActualEntry]),
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    MessageService,
    AuthenticationService,
    ConfirmationService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true,
    // },
    WelcombannerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
