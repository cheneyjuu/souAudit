import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auditstep-ad-start-edit',
  templateUrl: './edit.component.html',
})
export class AuditstepAdStartEditComponent implements OnInit {
  record: any = {};
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  validateForm: FormGroup;
  dateFormat = 'yyyy-MM-dd';
  listOfVer: any[] = [];
  selectedVer = this.record.verIndex;

  ngOnInit(): void {
    this.loadInfo();
    this.validateForm = this.fb.group({
      appName: [null, [Validators.required]],
      verIndex: [this.record.verIndex, [Validators.required]],
      startDate: [this.record.startDate, [Validators.required]],
      endDate: [this.record.endDate, [Validators.required]],
      dataFromDate: [this.record.dataFromDate, [Validators.required]],
      dataEndDate: [this.record.dataEndDate, [Validators.required]],
      isZx: [this.record.isZx],
    });
  }

  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/main/infos').subscribe((res: any) => {
      this.listOfVer = res;
    });
  }

  esFromChange(value: string): void {
    this.selectedVer = value;
  }

  zhDate(dateStrin: Date) {
    let month: string | number = dateStrin.getMonth() + 1;
    let strDate: string | number = dateStrin.getDate();
    month = month < 10 ? '0' + month : month;
    strDate = strDate < 10 ? '0' + strDate : strDate;
    return dateStrin.getFullYear() + '-' + month + '-' + strDate;
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const data = this.validateForm.value;
    this.listOfVer.forEach(element => {
      if (element.verIndex === this.selectedVer) {
        data.esType = element.esType;
      }
    });
    data.startDate = this.zhDate(data.startDate);
    data.endDate = this.zhDate(data.endDate);
    data.dataFromDate = this.zhDate(data.dataFromDate);
    data.dataEndDate = this.zhDate(data.dataEndDate);
    data.id = this.record.id;

    console.log(data);

    this.http.put('http://139.224.62.102:8080/api/adapply', data).subscribe((res: any) => {
      this.msgSrv.success('修改信息成功');
      this.close(res);
    });
  }

  close(res: any) {
    this.modal.close(res);
  }
}
