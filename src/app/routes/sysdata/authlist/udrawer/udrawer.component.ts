import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNodeOptions,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-authlist-udrawer',
  templateUrl: './udrawer.component.html',
  styleUrls: ['./udrawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataAuthlistUdrawerComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  treeCheckList: any[] = [];
  defaultCheckedKeys = [];
  defaultExpandedKeys = [];
  defaultSelectedKeys = [];
  nodes: any[] = [];
  value: string;

  ngOnInit() {
    // this.defaultCheckedKeys = [];
    console.log('得到的=' + this.value);
    this.http.get('http://139.224.62.102:8080/api/units/' + this.value).subscribe((res: any) => {
      this.defaultCheckedKeys = res; // 默认checked
      // this.defaultSelectedKeys = res[0];
      console.log('得到的=' + this.defaultCheckedKeys);
      // this.cdr.detectChanges();
    });

    this.http.get('http://139.224.62.102:8080/api/menus/tree').subscribe((res: any) => {
      this.nodes = res.menu;
      this.cdr.detectChanges();
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
    this.treeCheckList = event.keys;
    this.cdr.detectChanges();
  }

  submitTree(): void {
    const unitdata: any = {};
    unitdata.unitNo = this.value;
    unitdata.menuKeys = this.treeCheckList;

    console.log(unitdata);

    this.http.post('http://139.224.62.102:8080/api/units/grant', unitdata).subscribe((res: any) => {
      this.msgSrv.success('权限设置成功！');
      this.close();
    });
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
