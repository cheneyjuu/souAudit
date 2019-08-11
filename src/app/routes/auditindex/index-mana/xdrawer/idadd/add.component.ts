import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-auditindex-index-mana-idadd',
  templateUrl: './add.component.html',
})
export class AuditindexIndexManaIdaddComponent implements OnInit {
  msg: any;
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public http: _HttpClient,
  ) {}
  record: any = {};
  activeNode: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      indexName: { type: 'string', title: '指标名称' },
      // indexNo: { type: 'string', title: '指标编码' },
      isLeaf: { type: 'boolean', title: '是否是观测点' },
      xzKind: { type: 'string', title: '指标性质', enum: ['P', 'T', 'Y', 'N'], default: 'N' },
      isStar: { type: 'boolean', title: '是否关键指标' },
      // remark: { type: 'string', title: '指标内涵' },
      // reportModel: { type: 'string', title: '报告模板' },
    },
    required: ['indexName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 130,
      grid: { span: 12 },
    },
    $indexName: {
      widget: 'string',
      grid: { span: 12 },
    },

    $xzKind: {
      widget: 'radio',
      grid: { span: 12 },
    },
  };

  ngOnInit(): void {
    this.i = this.record;
  }

  save(valueData: any) {
    valueData.verIndex = this.activeNode.verIndex;
    valueData.level = this.activeNode.level + 1;
    valueData.parentId = this.activeNode.key;
    console.log(valueData);
    this.http.post(`http://139.224.62.102:8080/api/indexes`, valueData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }
  submit(value: any) {
    this.msg.success(JSON.stringify(value));
  }
  close() {
    this.modal.destroy();
  }
}
