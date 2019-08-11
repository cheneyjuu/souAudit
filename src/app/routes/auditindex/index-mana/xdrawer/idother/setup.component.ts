import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-auditindex-index-mana-xdrawer-idother-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class AuditindexIndexManaIdotherSetUpComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;
  activeNode: any = {};

  indexesTempValue: Observable<any>;
  // indexesTempValue: any = {};

  listOfDept = [];
  // listOfDept: any = {};

  remarkTempValue = ''; // remark数据库查询初始值
  listOfSelectedDept = [7, 8]; // dutyDept数据库查询初始值
  reportModelTempValue = ''; // reportModel数据库查询初始值

  ngOnInit(): void {
    this.loadInfo();
    // 获取indexes的remark、reportModel、dutyDept、importData
    this.http.get('http://139.224.62.102:8080/api/indexes/remark/' + this.activeNode.key).subscribe((res: any) => {
      // this.indexesTempValue = res;
      this.indexesTempValue = of(res);
      console.log(this.indexesTempValue);
    });

    this.indexesTempValue.subscribe((res: any) => {
      console.log('get result value');
      console.log(res.remark);
      console.log(res.dutyDept);
    });

    this.validateForm = this.fb.group({
      remark: ['zhuzhjkkkk', [Validators.required]],
      dutyDept: [this.listOfSelectedDept, [Validators.required]],
    });
  }

  loadInfo(): void {
    // ---------------------------------
    const children: Array<{ id: number; status: boolean; bno: string; bname: string }> = [];
    if (this.activeNode.verIndex.substring(4, 6) === 'zx') {
      // 第一步：总校的加载总校部门
      this.http.get('http://139.224.62.102:8080/api/departments').subscribe((res: any) => {
        this.listOfDept = res;
        this.listOfDept.push({ id: 1, status: true, bno: 'fx', bname: '分校' });
        // this.listOfSelectedDept = ['S01'];
      });
      // 加载 end------------------------------------------
    } else {
      // 分校的不加载部门，只显示一个分校
      children.push({ id: 1, status: true, bno: 'fx', bname: '分校评估无需选择部门' });
      this.listOfDept = children;
      // this.listOfSelectedDept = ['fx'];
      // 加载 end------------------------------------------
    }
  }

  esFromChange(value: any): void {
    console.log(value);
    this.listOfSelectedDept = value;
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    data.id = this.activeNode.key;
    console.log(data);

    this.http.put(`http://139.224.62.102:8080/api/indexes`, data).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
