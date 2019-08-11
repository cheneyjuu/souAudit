import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelonChartModule } from '@delon/chart';

import { AuditstepAdStartComponent } from './ad-start/ad-start.component';
import { AuditstepDataSynchComponent } from './data-synch/data-synch.component';
import { AuditstepDataUploadComponent } from './data-upload/data-upload.component';
import { AuditstepDataCheckupComponent } from './data-checkup/data-checkup.component';
import { AuditstepPPreviewComponent } from './p-preview/p-preview.component';

const routes: Routes = [
  { path: 'ad-start', component: AuditstepAdStartComponent },
  { path: 'data-synch', component: AuditstepDataSynchComponent },
  { path: 'data-upload', component: AuditstepDataUploadComponent },
  { path: 'data-checkup', component: AuditstepDataCheckupComponent },
  { path: 'p-preview', component: AuditstepPPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DelonChartModule],
  exports: [RouterModule, DelonChartModule],
})
export class AuditstepRoutingModule {}
