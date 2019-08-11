import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuditstepRoutingModule } from './auditstep-routing.module';
import { AuditstepAdStartComponent } from './ad-start/ad-start.component';
import { AuditstepAdStartAddComponent } from './ad-start/add/add.component';
import { AuditstepAdStartEditComponent } from './ad-start/edit/edit.component';
import { AuditstepAdStartViewComponent } from './ad-start/view/view.component';
import { AuditstepDataSynchComponent } from './data-synch/data-synch.component';
import { AuditstepDataSynchEditComponent } from './data-synch/edit/edit.component';
import { AuditstepDataSynchViewComponent } from './data-synch/view/view.component';
import { AuditstepDataUploadComponent } from './data-upload/data-upload.component';
import { AuditstepDataUploadEditComponent } from './data-upload/edit/edit.component';
import { AuditstepDataUploadViewComponent } from './data-upload/view/view.component';
import { AuditstepDataCheckupComponent } from './data-checkup/data-checkup.component';
import { AuditstepDataCheckupEditComponent } from './data-checkup/edit/edit.component';
import { AuditstepDataCheckupViewComponent } from './data-checkup/view/view.component';
import { AuditstepPPreviewComponent } from './p-preview/p-preview.component';
import { AuditstepPPreviewEditComponent } from './p-preview/edit/edit.component';
import { AuditstepPPreviewViewComponent } from './p-preview/view/view.component';

const COMPONENTS = [
  AuditstepAdStartComponent,
  AuditstepDataSynchComponent,
  AuditstepDataUploadComponent,
  AuditstepDataCheckupComponent,
  AuditstepPPreviewComponent,
];
const COMPONENTS_NOROUNT = [
  AuditstepAdStartAddComponent,
  AuditstepAdStartEditComponent,
  AuditstepAdStartViewComponent,
  AuditstepDataSynchEditComponent,
  AuditstepDataSynchViewComponent,
  AuditstepDataUploadEditComponent,
  AuditstepDataUploadViewComponent,
  AuditstepDataCheckupEditComponent,
  AuditstepDataCheckupViewComponent,
  AuditstepPPreviewEditComponent,
  AuditstepPPreviewViewComponent,
];

@NgModule({
  imports: [SharedModule, AuditstepRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AuditstepModule {}
