import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sysdata-orgbranch-edit',
  templateUrl: './edit.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataOrgbranchEditComponent implements OnInit {
  // record 是列表页传递过来的
  record: any = {};
  validateForm: FormGroup;

  sinChecked = false;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  checkOptionsOne = [
    { label: '市区', value: '市区', checked: false },
    { label: '郊区', value: '郊区', checked: false },
    { label: '行业', value: '行业', checked: false },
    { label: '政企', value: '政企', checked: false },
    { label: '校企', value: '校企', checked: false },
  ];
  selectedOptions = [];

  ngOnInit(): void {
    // 这里是初始化表单参数，字段对应到HTML页面的formControlName
    // 比如login对应HTML页面里的 <input id="login" type="text" nz-input formControlName="login" />
    this.validateForm = this.fb.group({
      bno: [null, [Validators.required]],
      bname: [null, [Validators.required]],
      checkOptionsOne: [this.checkOptionsOne],
      status: [this.record.status],
    });

    const res = this.record.btype;
    const typeArr = res.split(',');
    typeArr.forEach(type => {
      this.checkOptionsOne.forEach(option => {
        if (option.label === type) {
          option.checked = true;
        }
      });
    });
  }

  checkOptionsOneChange(options: any[]): void {
    options.forEach(option => {
      if (option.checked) {
        if (this.selectedOptions.indexOf(option.label) < 0) this.selectedOptions.push(option.label);
      } else {
        const index = this.selectedOptions.indexOf(option.label);
        if (index > -1) {
          this.selectedOptions.splice(index, 1);
        }
      }
    });
    console.log(this.selectedOptions.toString());
  }

  submitForm(value: any) {
    // 通过this.form.value可以获取表单所有的值
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);

    const data = this.validateForm.value;

    const tempSelectedstrin = this.selectedOptions.toString();

    data.btype = tempSelectedstrin === '' ? this.record.btype : this.selectedOptions.toString();

    data.id = this.record.id;

    this.http.put('http://139.224.62.102:8080/api/branches', data).subscribe((res: any) => {
      this.msgSrv.success('修改部门成功');
      this.cdr.detectChanges();
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
