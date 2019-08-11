import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzFormatEmitEvent, NzDrawerRef, NzDrawerService, NzMessageService, NzModalService } from 'ng-zorro-antd';

import { AuditindexIndexManaAddComponent } from './add/add.component';
import { AuditindexIndexManaEditComponent } from './edit/edit.component';
import { AuditindexIndexManaViewComponent } from './view/view.component';
import { AuditindexIndexManaXdrawerComponent } from './xdrawer/xdrawer.component';

@Component({
  selector: 'app-auditindex-index-mana',
  templateUrl: './index-mana.component.html',
  styleUrls: ['./index-mana.component.less'],
})
export class AuditindexIndexManaComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private modal: ModalHelper,
    private drawerService: NzDrawerService,
    private msgSrv: NzMessageService,
    private modalService: NzModalService,
  ) {}

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData: any[] = [];
  value: string;

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/main/infos').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  addInfo() {
    this.modal.create(AuditindexIndexManaAddComponent, { size: 'md' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(AuditindexIndexManaEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  viewInfo(record: any[]) {
    this.modal.create(AuditindexIndexManaViewComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  deleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(id),
    });
  }

  deleteInfo(id: number) {
    this.http.delete('http://139.224.62.102:8080/api/main/infos/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }
  // 打开指标的抽屉
  openComponent(record: any): void {
    const drawerRef = this.drawerService.create<AuditindexIndexManaXdrawerComponent, { value: string }, string>({
      nzTitle: record.esName,
      nzWidth: 480,
      nzPlacement: 'left',
      nzMaskClosable: false,
      // nzClosable: false,
      nzContent: AuditindexIndexManaXdrawerComponent,
      nzContentParams: {
        // value: this.value,
        value: record.verIndex,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {}
}
