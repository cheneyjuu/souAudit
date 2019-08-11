import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';

import { SysdataFxSynchdatatableEditComponent } from './edit/edit.component';
import { SysdataFxSynchdatatableViewComponent } from './view/view.component';

@Component({
  selector: 'app-sysdata-fx-synchdatatable',
  templateUrl: './fx-synchdatatable.component.html',
})
export class SysdataFxSynchdatatableComponent implements OnInit {
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
    // this.dtType = this.routeInfo.snapshot.params.dtType;
    this.loadInfo();
  }
  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=fxcj').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(SysdataFxSynchdatatableEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  viewInfo(record: any[]) {
    this.modal.create(SysdataFxSynchdatatableViewComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  // deleteConfirm(id: number): void {
  //   this.modalService.confirm({
  //     nzTitle: '<i>是否要删除数据</i>',
  //     nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
  //     nzOnOk: () => this.deleteInfo(id),
  //   });
  // }

  // deleteInfo(id: number) {
  //   this.http.delete('http://139.224.62.102:8080/api/users/' + id).subscribe((res: any) => {
  //     this.msgSrv.success('删除用户成功');
  //     this.cdr.detectChanges();
  //     this.loadInfo();
  //   });
  // }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
