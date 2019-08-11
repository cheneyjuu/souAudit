import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { SysdataOrgdepartmentEditComponent } from './edit/edit.component';
import { SysdataOrgdepartmentAddComponent } from './add/add.component';

@Component({
  selector: 'app-sysdata-orgdepartment',
  templateUrl: './orgdepartment.component.html',
  styleUrls: ['./orgdepartment.component.less'],
})
export class SysdataOrgdepartmentComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
  ) {}

  visible = false;
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfData: any[] = [];

  /**
   * 加载用户列表
   */
  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/departments').subscribe((res: any[]) => {
      this.listOfData = res;
      console.log(this.listOfData);
      // this.cdr.detectChanges() 这句一定要加，否则列表不会刷新，导致看不到数据
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.loadInfo();
  }

  addInfo() {
    this.modal.create(SysdataOrgdepartmentAddComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
      this.loadInfo();
    });
  }

  editInfo(record) {
    this.modal.create(SysdataOrgdepartmentEditComponent, { record }, { size: 'md' }).subscribe((res: any) => {
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
    this.http.delete('http://139.224.62.102:8080/api/departments/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }
}
