import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-sysdata-zx-handupfile-add',
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataZxHandupfileAddComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      fileName: { type: 'string', title: '文字资料名称' },
      esType: {
        type: 'string',
        title: '评估类别',
        enum: ['整体办学水平评估', '分校办学水平评估'],
        default: '整体办学水平评估',
      },
      remark: { type: 'string', title: '资料内容说明' },
    },
    required: ['fileName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 12 },
    },
    $fileName: {
      widget: 'string',
      grid: { span: 20 },
    },
    $esType: {
      widget: 'select',
      grid: { span: 12 },
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 20 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    this.i = this.record;
  }

  save(value: any) {
    // value.id = this.record.id;
    value.fileType = 'zxwz';
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

    value.modRecords = '';

    console.log(value);
    this.http.post(`http://139.224.62.102:8080/api/wzfile/files`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
