import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-orgdepartment-add',
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataOrgdepartmentAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      bname: [null, [Validators.required]],
      status: [true, [Validators.required]],
    });
  }

  submitForm(): void {
    const data = this.validateForm.value;
    this.http.post('http://139.224.62.102:8080/api/departments', data).subscribe((res: any) => {
      this.msgSrv.success('添加部门成功');
      this.cdr.detectChanges();
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
