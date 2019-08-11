import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sysdata-orgdepartment-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataOrgdepartmentEditComponent implements OnInit {
  // record 是列表页传递过来的
  record: any = {};
  validateForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // 这里是初始化表单参数，字段对应到HTML页面的formControlName
    // 比如login对应HTML页面里的 <input id="login" type="text" nz-input formControlName="login" />
    this.validateForm = this.fb.group({
      bname: [null, [Validators.required]],
      status: [this.record.status, [Validators.required]],
    });
  }

  submitForm(value: any) {
    // 通过this.form.value可以获取表单所有的值
    const data = this.validateForm.value;
    data.id = this.record.id;

    this.http.put('http://139.224.62.102:8080/api/departments', data).subscribe((res: any) => {
      this.msgSrv.success('修改部门成功');
      this.cdr.detectChanges();
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
