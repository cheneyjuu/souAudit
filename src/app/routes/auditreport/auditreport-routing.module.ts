import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditreportFileshowComponent } from './fileshow/fileshow.component';

const routes: Routes = [

  { path: 'fileshow', component: AuditreportFileshowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditreportRoutingModule { }
