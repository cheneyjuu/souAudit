import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auditindex-index-mana-idedit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditindexIndexManaIdeditComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    public http: _HttpClient,
  ) {}

  activeNode: any = {};
  formNode: any = {}; // 只传给自动表单的
  validateForm: FormGroup;

  i: any;
  schema: SFSchema = {
    properties: {
      indexName: { type: 'string', title: '指标名称' },
      isLeaf: { type: 'boolean', title: '是否是观测点' },
      xzKind: { type: 'string', title: '指标性质', enum: ['P', 'T', 'Y', 'N'] },
      isStar: { type: 'boolean', title: '是否关键指标' },
      orderIndex: { type: 'number', title: '组内排序', minimum: 0 },
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
    console.log(this.activeNode);
    this.formNode.indexName = this.activeNode.title;
    this.formNode.isLeaf = this.activeNode.origin.isLeaf;
    this.formNode.isStar = this.activeNode.origin.isStar;
    this.formNode.xzKind = this.activeNode.origin.xzKind;
    this.formNode.orderIndex = this.activeNode.origin.orderIndex;
    this.i = this.formNode;
  }

  save(valueData: any) {
    valueData.id = this.activeNode.key;
    // console.log(valueData);
    this.http.put(`http://139.224.62.102:8080/api/indexes`, valueData).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
