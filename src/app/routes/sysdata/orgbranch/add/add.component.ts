import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-sysdata-orgbranch-add',
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataOrgbranchAddComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;

  checkOptionsOne = [
    { label: '市区', value: '市区', checked: false },
    { label: '郊区', value: '郊区', checked: false },
    { label: '行业', value: '行业', checked: false },
    { label: '政企', value: '政企', checked: false },
    { label: '校企', value: '校企', checked: false },
  ];
  selectedOptions = [];

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      bno: [null, [Validators.required]],
      bname: [null, [Validators.required]],
      checkOptionsOne: [this.checkOptionsOne],
      status: [true],
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

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);

    const data = this.validateForm.value;

    data.btype = this.selectedOptions.toString();

    this.http.post('http://139.224.62.102:8080/api/branches', data).subscribe((res: any) => {
      this.msgSrv.success('添加部门成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
