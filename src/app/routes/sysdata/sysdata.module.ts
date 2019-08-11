import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysdataRoutingModule } from './sysdata-routing.module';
import { SysdataUserlistComponent } from './userlist/userlist.component';
import { SysdataUserlistEditComponent } from './userlist/edit/edit.component';
import { SysdataUserlistAddComponent } from './userlist/add/add.component';
import { SysdataModlistComponent } from './modlist/modlist.component';
import { SysdataModlistEditComponent } from './modlist/edit/edit.component';
import { SysdataModlistViewComponent } from './modlist/view/view.component';
import { SysdataAuthlistComponent } from './authlist/authlist.component';
import { SysdataAuthlistEditComponent } from './authlist/edit/edit.component';
import { SysdataAuthlistAddComponent } from './authlist/add/add.component';
import { SysdataAuthlistUdrawerComponent } from './authlist/udrawer/udrawer.component';
import { SysdataDatalistComponent } from './datalist/datalist.component';
import { SysdataDatalistEditComponent } from './datalist/edit/edit.component';
import { SysdataOrgdepartmentComponent } from './orgdepartment/orgdepartment.component';
import { SysdataOrgdepartmentEditComponent } from './orgdepartment/edit/edit.component';
import { SysdataOrgdepartmentAddComponent } from './orgdepartment/add/add.component';
import { SysdataOrgbranchComponent } from './orgbranch/orgbranch.component';
import { SysdataOrgbranchEditComponent } from './orgbranch/edit/edit.component';
import { SysdataOrgbranchAddComponent } from './orgbranch/add/add.component';
import { SysdataZxSynchdatatableComponent } from './zx-synchdatatable/zx-synchdatatable.component';
import { SysdataZxSynchdatatableEditComponent } from './zx-synchdatatable/edit/edit.component';
import { SysdataZxSynchdatatableViewComponent } from './zx-synchdatatable/view/view.component';
import { SysdataZxHandupdatatableComponent } from './zx-handupdatatable/zx-handupdatatable.component';
import { SysdataZxHandupdatatableEditComponent } from './zx-handupdatatable/edit/edit.component';
import { SysdataZxHandupdatatableViewComponent } from './zx-handupdatatable/view/view.component';
import { SysdataZxHandupdatatableUdrawerComponent } from './zx-handupdatatable/udrawer/udrawer.component';
import { SysdataZxHandupfileComponent } from './zx-handupfile/zx-handupfile.component';
import { SysdataZxHandupfileEditComponent } from './zx-handupfile/edit/edit.component';
import { SysdataZxHandupfileAddComponent } from './zx-handupfile/add/add.component';
import { SysdataFxSynchdatatableComponent } from './fx-synchdatatable/fx-synchdatatable.component';
import { SysdataFxSynchdatatableEditComponent } from './fx-synchdatatable/edit/edit.component';
import { SysdataFxSynchdatatableViewComponent } from './fx-synchdatatable/view/view.component';
import { SysdataFxHandupdatatableComponent } from './fx-handupdatatable/fx-handupdatatable.component';
import { SysdataFxHandupdatatableEditComponent } from './fx-handupdatatable/edit/edit.component';
import { SysdataFxHandupdatatableViewComponent } from './fx-handupdatatable/view/view.component';
import { SysdataFxHandupdatatableUdrawerComponent } from './fx-handupdatatable/udrawer/udrawer.component';
import { SysdataFxHandupfileComponent } from './fx-handupfile/fx-handupfile.component';
import { SysdataFxHandupfileEditComponent } from './fx-handupfile/edit/edit.component';
import { SysdataFxHandupfileAddComponent } from './fx-handupfile/add/add.component';

const COMPONENTS = [
  SysdataUserlistComponent,
  SysdataModlistComponent,
  SysdataAuthlistComponent,
  SysdataDatalistComponent,
  SysdataOrgdepartmentComponent,
  SysdataOrgbranchComponent,
  SysdataZxSynchdatatableComponent,
  SysdataZxHandupdatatableComponent,
  SysdataZxHandupfileComponent,
  SysdataFxSynchdatatableComponent,
  SysdataFxHandupdatatableComponent,
  SysdataFxHandupfileComponent,
];
const COMPONENTS_NOROUNT = [
  SysdataUserlistEditComponent,
  SysdataUserlistAddComponent,
  SysdataModlistEditComponent,
  SysdataModlistViewComponent,
  SysdataAuthlistEditComponent,
  SysdataAuthlistAddComponent,
  SysdataAuthlistUdrawerComponent,
  SysdataDatalistEditComponent,
  SysdataOrgdepartmentEditComponent,
  SysdataOrgdepartmentAddComponent,
  SysdataOrgbranchEditComponent,
  SysdataOrgbranchAddComponent,
  SysdataZxSynchdatatableEditComponent,
  SysdataZxSynchdatatableViewComponent,
  SysdataZxHandupdatatableEditComponent,
  SysdataZxHandupdatatableViewComponent,
  SysdataZxHandupdatatableUdrawerComponent,
  SysdataZxHandupfileEditComponent,
  SysdataZxHandupfileAddComponent,
  SysdataFxSynchdatatableEditComponent,
  SysdataFxSynchdatatableViewComponent,
  SysdataFxHandupdatatableEditComponent,
  SysdataFxHandupdatatableViewComponent,
  SysdataFxHandupdatatableUdrawerComponent,
  SysdataFxHandupfileEditComponent,
  SysdataFxHandupfileAddComponent,
];

@NgModule({
  imports: [SharedModule, SysdataRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SysdataModule {}
