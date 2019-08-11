import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuditreportRoutingModule } from './auditreport-routing.module';
import { AuditreportFileshowComponent } from './fileshow/fileshow.component';
import { AuditreportFileshowEditComponent } from './fileshow/edit/edit.component';
import { AuditreportFileshowViewComponent } from './fileshow/view/view.component';

const COMPONENTS = [
  AuditreportFileshowComponent];
const COMPONENTS_NOROUNT = [
  AuditreportFileshowEditComponent,
  AuditreportFileshowViewComponent];

@NgModule({
  imports: [
    SharedModule,
    AuditreportRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AuditreportModule { }
