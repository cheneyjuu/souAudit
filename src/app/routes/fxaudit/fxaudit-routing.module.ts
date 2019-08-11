import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FxauditDataUploadComponent } from './data-upload/data-upload.component';
import { FxauditDataCheckupComponent } from './data-checkup/data-checkup.component';
import { FxauditFPreviewComponent } from './f-preview/f-preview.component';

const routes: Routes = [

  { path: 'data-upload', component: FxauditDataUploadComponent },
  { path: 'data-checkup', component: FxauditDataCheckupComponent },
  { path: 'f-preview', component: FxauditFPreviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FxauditRoutingModule { }
