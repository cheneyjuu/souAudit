import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysdataUserlistComponent } from './userlist/userlist.component';
import { SysdataModlistComponent } from './modlist/modlist.component';
import { SysdataAuthlistComponent } from './authlist/authlist.component';
import { SysdataDatalistComponent } from './datalist/datalist.component';
import { SysdataOrgdepartmentComponent } from './orgdepartment/orgdepartment.component';
import { SysdataOrgbranchComponent } from './orgbranch/orgbranch.component';
import { SysdataZxSynchdatatableComponent } from './zx-synchdatatable/zx-synchdatatable.component';
import { SysdataZxHandupdatatableComponent } from './zx-handupdatatable/zx-handupdatatable.component';
import { SysdataZxHandupfileComponent } from './zx-handupfile/zx-handupfile.component';
import { SysdataFxSynchdatatableComponent } from './fx-synchdatatable/fx-synchdatatable.component';
import { SysdataFxHandupdatatableComponent } from './fx-handupdatatable/fx-handupdatatable.component';
import { SysdataFxHandupfileComponent } from './fx-handupfile/fx-handupfile.component';

const routes: Routes = [
  { path: 'userlist', component: SysdataUserlistComponent },
  { path: 'modlist', component: SysdataModlistComponent },
  { path: 'authlist', component: SysdataAuthlistComponent },
  { path: 'datalist', component: SysdataDatalistComponent },
  { path: 'orgdepartment', component: SysdataOrgdepartmentComponent },
  { path: 'orgbranch', component: SysdataOrgbranchComponent },
  { path: 'zx-synchdatatable', component: SysdataZxSynchdatatableComponent },
  { path: 'zx-handupdatatable', component: SysdataZxHandupdatatableComponent },
  { path: 'zx-handupfile', component: SysdataZxHandupfileComponent },
  { path: 'fx-synchdatatable', component: SysdataFxSynchdatatableComponent },
  { path: 'fx-handupdatatable', component: SysdataFxHandupdatatableComponent },
  { path: 'fx-handupfile', component: SysdataFxHandupfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysdataRoutingModule {}
