import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditindexIndexManaComponent } from './index-mana/index-mana.component';
import { AuditindexIndexRuleComponent } from './index-rule/index-rule.component';
import { AuditindexIndexFileComponent } from './index-file/index-file.component';

const routes: Routes = [

  { path: 'index-mana', component: AuditindexIndexManaComponent },
  { path: 'index-rule', component: AuditindexIndexRuleComponent },
  { path: 'index-file', component: AuditindexIndexFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditindexRoutingModule { }
