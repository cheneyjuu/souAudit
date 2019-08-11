import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FxauditRoutingModule } from './fxaudit-routing.module';
import { FxauditDataUploadComponent } from './data-upload/data-upload.component';
import { FxauditDataUploadEditComponent } from './data-upload/edit/edit.component';
import { FxauditDataUploadViewComponent } from './data-upload/view/view.component';
import { FxauditDataCheckupComponent } from './data-checkup/data-checkup.component';
import { FxauditDataCheckupEditComponent } from './data-checkup/edit/edit.component';
import { FxauditDataCheckupViewComponent } from './data-checkup/view/view.component';
import { FxauditFPreviewComponent } from './f-preview/f-preview.component';
import { FxauditFPreviewEditComponent } from './f-preview/edit/edit.component';
import { FxauditFPreviewViewComponent } from './f-preview/view/view.component';

const COMPONENTS = [
  FxauditDataUploadComponent,
  FxauditDataCheckupComponent,
  FxauditFPreviewComponent];
const COMPONENTS_NOROUNT = [
  FxauditDataUploadEditComponent,
  FxauditDataUploadViewComponent,
  FxauditDataCheckupEditComponent,
  FxauditDataCheckupViewComponent,
  FxauditFPreviewEditComponent,
  FxauditFPreviewViewComponent];

@NgModule({
  imports: [
    SharedModule,
    FxauditRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FxauditModule { }
