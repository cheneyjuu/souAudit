import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-sysdata-zx-synchdatatable-edit',
  templateUrl: './edit.component.html',
})
export class SysdataZxSynchdatatableEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      dtName: { type: 'string', title: '表名称' },
      fieldsNum: { type: 'number', title: '字段数', minimum: 1 },
      zdNameList: { type: 'string', title: '字段英文' },
      zdZhNameList: { type: 'string', title: '字段描述' },
      zdTypeList: { type: 'string', title: '字段类别' },
      descRules: { type: 'string', title: '填写规则' },
      checkRules: { type: 'string', title: '校验规则' },
      tableHtml: { type: 'string', title: '数据表头' },
    },
    required: ['dtName', 'descRules', 'checkRules', 'tableHtml'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $zdNameList: {
      widget: 'string',
      grid: { span: 24 },
    },
    $zdZhNameList: {
      widget: 'string',
      grid: { span: 24 },
    },
    $zdTypeList: {
      widget: 'string',
      grid: { span: 24 },
    },
    $descRules: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $checkRules: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $tableHtml: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    this.i = this.record;
  }

  save(value: any) {
    value.id = this.record.id;
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;

    value.modTime =
      date.getFullYear() +
      '-' +
      month +
      '-' +
      strDate +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();

    // console.log(value);
    this.http.put(`http://139.224.62.102:8080/api/data/tables`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
