import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

class Department {
  id = 0;
  name: string = null;
  userSet: any[] = [];
}

@Component({
  selector: 'app-sysdata-userlist-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataUserlistEditComponent implements OnInit {
  // record 是列表页传递过来的
  record: any = {};
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;

  listOfDept: any[] = [];
  listOfBranch: any[] = [];
  listOfDB: any[] = [];
  listOfUnit: any[] = [];

  checkOptions = [{ label: '总校', value: 'zx' }, { label: '分校', value: 'fx' }];
  selectedUnitNo = '';
  selectedUserFrom = '';
  selectedDB = '';

  ngOnInit(): void {
    this.loadInfo(this.record.userFrom);
    this.selectedUnitNo = this.record.unitNo;
    this.selectedUserFrom = this.record.userFrom;
    this.selectedDB = this.record.bno;

    this.validateForm = this.fb.group({
      userName: [this.record.userName, [Validators.required]],
      unitNo: [this.record.unitNo],
      userFrom: [this.record.userFrom],
      bno: [this.record.bno],
      bname: [this.record.bname],
      mob: [this.record.mob],
      offPhone: [this.record.offPhone],
      email: [this.record.email, [Validators.email]],
      userNo: [this.record.userNo, [Validators.required]],
      status: [this.record.status],
    });
  }

  loadInfo(tempValue: string): void {
    this.http.get('http://139.224.62.102:8080/api/departments').subscribe((res: any) => {
      this.listOfDept = res;
      if (tempValue === 'zx') {
        this.listOfDB = this.listOfDept;
        this.cdr.detectChanges();
      }
    });
    this.http.get('http://139.224.62.102:8080/api/units').subscribe((res: any) => {
      this.listOfUnit = res;
      this.cdr.detectChanges();
    });
    this.http.get('http://139.224.62.102:8080/api/branches').subscribe((res: any) => {
      this.listOfBranch = res;
      if (tempValue === 'fx') {
        this.listOfDB = this.listOfBranch;
        this.cdr.detectChanges();
      }
    });
  }

  userFromChange(value: string): void {
    this.listOfDB = value === 'fx' ? this.listOfBranch : this.listOfDept;
    this.selectedDB = this.listOfDB[0].value;
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;

    this.listOfDB.forEach(element => {
      if (element.bno === this.selectedDB) {
        data.bname = element.bname;
      }
    });

    this.listOfUnit.forEach(element => {
      if (element.unitNo === data.unitNo) {
        data.unitName = element.unitName;
      }
    });

    // 初始化id
    data.id = this.record.id;
    this.http.put('http://139.224.62.102:8080/api/users', data).subscribe((res: any) => {
      this.msgSrv.success('修改用户信息成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
