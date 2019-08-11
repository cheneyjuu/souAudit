import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { SysdataOrgbranchEditComponent } from './edit/edit.component';
import { SysdataOrgbranchAddComponent } from './add/add.component';

@Component({
  selector: 'app-sysdata-orgbranch',
  templateUrl: './orgbranch.component.html',
  styleUrls: ['./orgbranch.component.less'],
})
export class SysdataOrgbranchComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
  ) {}

  listOfData: any[] = [];
  visible = false;
  sortName: string | null = null;
  sortValue: string | null = null;

  listOfType = [
    { text: '市区', value: '市区' },
    { text: '郊区', value: '郊区' },
    { text: '行业', value: '行业' },
    { text: '政企', value: '政企' },
    { text: '校企', value: '校企' },
  ];
  listOfSearchType: string[] = [];
  listOfDisplayData: any[] = [];

  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/branches').subscribe((res: any[]) => {
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

  filter(listOfSearchType: string[]): void {
    this.listOfSearchType = listOfSearchType;
    this.search();
  }

  search(): void {
    // ** filter data **/
    const filterFunc = (item: { btype: string; bno: string }) =>
      this.listOfSearchType.length ? this.listOfSearchType.some(btype => item.btype.indexOf(btype) !== -1) : true;
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
    this.modal.create(SysdataOrgbranchAddComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
      this.loadInfo();
    });
  }

  editInfo(record) {
    this.modal.create(SysdataOrgbranchEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
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
    this.http.delete('http://139.224.62.102:8080/api/branches/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }
}
