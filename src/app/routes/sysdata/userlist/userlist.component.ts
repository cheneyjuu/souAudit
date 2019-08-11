import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { SysdataUserlistEditComponent } from './edit/edit.component';
import { SysdataUserlistAddComponent } from './add/add.component';

@Component({
  selector: 'app-sysdata-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less'],
})
export class SysdataUserlistComponent implements OnInit {
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

  listOfUnitName = [
    { text: '总校填报员', value: '总校填报员' },
    { text: '总校审核员', value: '总校审核员' },
    { text: '分校填报员', value: '分校填报员' },
    { text: '分校审核员', value: '分校审核员' },
    { text: '校内专家', value: '校内专家' },
    { text: '校外专家', value: '校外专家' },
  ];

  listOfUnitTemp: string[] = [];
  listOfSearchUnitName: string[] = [];

  listOfData: any[] = [];
  listOfDisplayData: any[] = [];

  /**
   * 加载用户列表
   */
  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/users').subscribe((res: any[]) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      // this.cdr.detectChanges() 这句一定要加，否则列表不会刷新，导致看不到数据
      this.cdr.detectChanges();
    });
    
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchUnitName: string[]): void {
    this.listOfSearchUnitName = listOfSearchUnitName;
    this.search();
  }

  search(): void {
    // ** filter data **/
    const filterFunc = (item: { unitName: string; bname: string }) =>
      this.listOfSearchUnitName.length
        ? this.listOfSearchUnitName.some(unitName => item.unitName.indexOf(unitName) !== -1)
        : true;
    const data = this.listOfData.filter(item => filterFunc(item));
    // ** sort data **/
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1,
      );
    } else {
      this.listOfDisplayData = data;
    }
  }

  ngOnInit() {
    this.loadInfo();
  }

  addInfo() {
    this.modal.create(SysdataUserlistAddComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
      this.loadInfo();
    });
  }

  editInfo(record) {
    this.modal.create(SysdataUserlistEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
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
    this.http.delete('http://139.224.62.102:8080/api/users/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }
}
