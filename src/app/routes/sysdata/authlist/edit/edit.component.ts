import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-authlist-edit',
  templateUrl: './edit.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataAuthlistEditComponent implements OnInit {
  record: any = {};
  validateForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      // unitNo: [null],
      unitName: [null, [Validators.required]],
      unitType: [this.record.unitType],
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
    data.id = this.record.id;
    this.http.put('http://139.224.62.102:8080/api/units', data).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
