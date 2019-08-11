import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelonChartModule } from '@delon/chart';
import { LeadboardAnalysisComponent } from './analysis/analysis.component';
import { LeadboardV1Component } from './v1/v1.component';

const routes: Routes = [
  { path: 'analysis', component: LeadboardAnalysisComponent },
  { path: 'v1', component: LeadboardV1Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DelonChartModule],
  exports: [RouterModule, DelonChartModule],
})
export class LeadboardRoutingModule {}
