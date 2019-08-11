import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';

import { SysdataZxHandupfileEditComponent } from './edit/edit.component';
import { SysdataZxHandupfileAddComponent } from './add/add.component';

@Component({
  selector: 'app-sysdata-zx-handupfile',
  templateUrl: './zx-handupfile.component.html',
})
export class SysdataZxHandupfileComponent implements OnInit {
  dtType: string;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService, // private activatedRoute: ActivatedRoute, // private routeInfo: ActivatedRoute,
  ) {}

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData: any[] = [];
  visible = false;
  value: string;

  ngOnInit() {
    this.loadInfo();
  }
  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/wzfile/files?fileType=zxwz').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  addInfo() {
    this.modal.create(SysdataZxHandupfileAddComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
      this.loadInfo();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(SysdataZxHandupfileEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
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
    this.http.delete('http://139.224.62.102:8080/api/wzfile/files/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
