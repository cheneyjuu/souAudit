import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { WebreviewRoutingModule } from './webreview-routing.module';
import { WebreviewViewindexComponent } from './viewindex/viewindex.component';
import { WebreviewViewindexEditComponent } from './viewindex/edit/edit.component';
import { WebreviewViewindexViewComponent } from './viewindex/view/view.component';

const COMPONENTS = [
  WebreviewViewindexComponent];
const COMPONENTS_NOROUNT = [
  WebreviewViewindexEditComponent,
  WebreviewViewindexViewComponent];

@NgModule({
  imports: [
    SharedModule,
    WebreviewRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class WebreviewModule { }
