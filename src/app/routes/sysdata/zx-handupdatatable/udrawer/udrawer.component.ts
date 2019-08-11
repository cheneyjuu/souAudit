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
  selector: 'app-sysdata-zxhandupdatatable-udrawer',
  templateUrl: './udrawer.component.html',
  styleUrls: ['./udrawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataZxHandupdatatableUdrawerComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
  ) {}

  value: any = {};

  ngOnInit() {}

  close(): void {
    this.drawerRef.close(this.value);
  }
}
