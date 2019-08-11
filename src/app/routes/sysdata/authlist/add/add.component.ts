import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-authlist-add',
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataAuthlistAddComponent implements OnInit {
  selectedValue = '总校';
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
      unitNo: [null, [Validators.required]],
      unitName: [null, [Validators.required]],
      unitType: [null, [Validators.required]],
      remark: [null],
    });
    // this.loadDepartment();
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    this.http.post('http://139.224.62.102:8080/api/units', data).subscribe((res: any) => {
      this.msgSrv.success('添加用户成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
