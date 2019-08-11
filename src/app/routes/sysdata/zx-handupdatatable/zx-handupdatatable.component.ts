import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';

import { SysdataZxHandupdatatableEditComponent } from './edit/edit.component';
import { SysdataZxHandupdatatableViewComponent } from './view/view.component';
import { SysdataZxHandupdatatableUdrawerComponent } from './udrawer/udrawer.component';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sysdata-zx-handupdatatable',
  templateUrl: './zx-handupdatatable.component.html',
})
export class SysdataZxHandupdatatableComponent implements OnInit {
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
    // this.dtType = this.routeInfo.snapshot.params.dtType;
    this.loadInfo();
  }
  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=zxtb').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  editInfo(record: any[]) {
    this.modal.create(SysdataZxHandupdatatableEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  viewInfo(record: any[]) {
    this.modal.create(SysdataZxHandupdatatableViewComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  openComponent(record: any): void {
    const drawerRef = this.drawerService.create<SysdataZxHandupdatatableUdrawerComponent, { value: any }, string>({
      nzTitle: record.dtName,
      nzWidth: 900,
      nzPlacement: 'left',
      // nzClosable: false,
      nzContent: SysdataZxHandupdatatableUdrawerComponent,
      nzContentParams: {
        // value: this.value,
        value: record,
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
