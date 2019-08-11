import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuditindexRoutingModule } from './auditindex-routing.module';
import { AuditindexIndexManaComponent } from './index-mana/index-mana.component';
import { AuditindexIndexManaAddComponent } from './index-mana/add/add.component';
import { AuditindexIndexManaEditComponent } from './index-mana/edit/edit.component';
import { AuditindexIndexManaViewComponent } from './index-mana/view/view.component';
import { AuditindexIndexManaXdrawerComponent } from './index-mana/xdrawer/xdrawer.component';

import { AuditindexIndexManaIdaddComponent } from './index-mana/xdrawer/idadd/add.component';
import { AuditindexIndexManaIdeditComponent } from './index-mana/xdrawer/idedit/edit.component';
import { AuditindexIndexManaSetUpComponent } from './index-mana/xdrawer/setlist/setup.component';
import { AuditindexIndexManaIdotherSetUpComponent } from './index-mana/xdrawer/idother/setup.component';

import { AuditindexIndexRuleComponent } from './index-rule/index-rule.component';
import { AuditindexIndexRuleEditComponent } from './index-rule/edit/edit.component';
import { AuditindexIndexRuleViewComponent } from './index-rule/view/view.component';
import { AuditindexIndexFileComponent } from './index-file/index-file.component';
import { AuditindexIndexFileEditComponent } from './index-file/edit/edit.component';
import { AuditindexIndexFileViewComponent } from './index-file/view/view.component';

const COMPONENTS = [AuditindexIndexManaComponent, AuditindexIndexRuleComponent, AuditindexIndexFileComponent];
const COMPONENTS_NOROUNT = [
  AuditindexIndexManaAddComponent,
  AuditindexIndexManaEditComponent,
  AuditindexIndexManaViewComponent,
  AuditindexIndexManaXdrawerComponent,
  AuditindexIndexManaIdaddComponent,
  AuditindexIndexManaIdeditComponent,
  AuditindexIndexManaSetUpComponent,
  AuditindexIndexManaIdotherSetUpComponent,
  AuditindexIndexRuleEditComponent,
  AuditindexIndexRuleViewComponent,
  AuditindexIndexFileEditComponent,
  AuditindexIndexFileViewComponent,
];

@NgModule({
  imports: [SharedModule, AuditindexRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class AuditindexModule {}
