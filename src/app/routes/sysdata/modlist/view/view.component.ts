import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sysdata-modlist-view',
  templateUrl: './view.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataModlistViewComponent implements OnInit {
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
    // this.validateForm = this.fb.group({
    //   unitNo: [null, [Validators.required]],
    //   unitName: [null, [Validators.required]],
    //   unitType: [this.record.unitType],
    //   remark: [null],
    // });
    // this.loadDepartment();
  }

  close(res: any) {
    this.modal.close(res);
  }
}
