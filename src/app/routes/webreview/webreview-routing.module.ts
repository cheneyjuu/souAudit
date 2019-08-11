import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebreviewViewindexComponent } from './viewindex/viewindex.component';

const routes: Routes = [

  { path: 'viewindex', component: WebreviewViewindexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebreviewRoutingModule { }
