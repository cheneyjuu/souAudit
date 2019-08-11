import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LeadboardRoutingModule } from './leadboard-routing.module';

import { LeadboardAnalysisComponent } from './analysis/analysis.component';
import { LeadboardAnalysisEditComponent } from './analysis/edit/edit.component';
import { LeadboardAnalysisViewComponent } from './analysis/view/view.component';
import { LeadboardV1Component } from './v1/v1.component';
import { LeadboardV1EditComponent } from './v1/edit/edit.component';
import { LeadboardV1ViewComponent } from './v1/view/view.component';

const COMPONENTS = [LeadboardAnalysisComponent, LeadboardV1Component];

const COMPONENTS_NOROUNT = [
  LeadboardAnalysisEditComponent,
  LeadboardAnalysisViewComponent,
  LeadboardV1EditComponent,
  LeadboardV1ViewComponent,
];

@NgModule({
  imports: [SharedModule, LeadboardRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class LeadboardModule {}
