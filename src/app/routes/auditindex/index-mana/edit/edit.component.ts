import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-auditindex-index-mana-edit',
  templateUrl: './edit.component.html',
})
export class AuditindexIndexManaEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      esName: { type: 'string', title: '体系名称' },
      verIndex: { type: 'string', title: '版本号' },
      esType: { type: 'string', title: '体系类别', enum: ['整体办学水平评估', '分校办学水平评估'] },
      dataFromDate: { type: 'string', title: '数据开始日期' },
      dataEndDate: { type: 'string', title: '数据截止日期' },
      releaseDate: { type: 'string', title: '发布日期' },
      status: { type: 'boolean', title: '是否在用' },
    },
    required: ['esName', 'verIndex', 'dataFromDate', 'dataEndDate'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 12 },
    },
    $esName: {
      widget: 'string',
      grid: { span: 20 },
    },
    $verIndex: {
      widget: 'string',
      grid: { span: 10 },
    },
    $esType: {
      widget: 'select',
      grid: { span: 10 },
    },
    $dataFromDate: {
      widget: 'date',
      grid: { span: 10 },
    },
    $dataEndDate: {
      widget: 'date',
      grid: { span: 10 },
    },
    $releaseDate: {
      widget: 'date',
      grid: { span: 10 },
    },
    $status: {
      widget: 'checkbox',
      grid: { span: 10 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    this.i = this.record;
  }

  save(value: any) {
    value.id = this.record.id;
    value.dataFromDate = value.dataFromDate.substring(0, 10);
    value.dataEndDate = value.dataEndDate.substring(0, 10);
    value.releaseDate = value.releaseDate.substring(0, 10);

    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;

    value.lastModTime =
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

    console.log(value);
    this.http.put(`http://139.224.62.102:8080/api/main/infos`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
