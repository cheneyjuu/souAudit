import { SFSchema, SFUISchema } from '@delon/form';
import {
  NzFormatEmitEvent,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzModalRef,
  NzDrawerService,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auditindex-index-mana-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class AuditindexIndexManaSetUpComponent implements OnInit {
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  record: any = {};
  activeNode: any = {};
  validateForm: FormGroup;
  current = 0;

  indexesTempValue: any = {};
  indexesSetslists: any = {};

  listOfDept: any = {};
  listOfSelectedDept = [];

  listOfSjtb: any = {};
  listOfSelectedSjtb = [];
  listOfSjcj: any = {};
  listOfSelectedSjcj = [];
  listOfFile: any = {};
  listOfSelectedFile = [];

  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  listOfFZControl: Array<{ id: number; controlInstance: string }> = [];

  ngOnInit() {
    this.validateForm = this.fb.group({
      remark: [null, [Validators.required]],
      dutyDept: ['S01'],
    });
    console.log(this.activeNode);

    // 获取indexes的remark、reportModel、dutyDept、importData
    this.http.get('http://139.224.62.102:8080/api/indexes/remark/' + this.activeNode.key).subscribe((res: any) => {
      this.indexesTempValue = res;
      console.log(this.indexesTempValue);
    });

    // 获取indexes_sets的conType\typeNO\TypeName\typeValue
    this.http
      .get('http://139.224.62.102:8080/api/indexes/sets?indexId=' + this.activeNode.key)
      .subscribe((res: any) => {
        this.indexesSetslists = res;
        console.log(this.indexesSetslists);
      });

    // ---------------------------------
    const children: Array<{ id: number; status: boolean; bno: string; bname: string }> = [];
    if (this.activeNode.verIndex.substring(4, 6) === 'zx') {
      // 第一步：总校的加载总校部门
      this.http.get('http://139.224.62.102:8080/api/departments').subscribe((res: any) => {
        this.listOfDept = res;
        this.listOfDept.push({ id: 1, status: true, bno: 'fx', bname: '分校' });
        this.listOfSelectedDept = ['S01'];
      });
      // 加载 总校数据填报表、总校数据采集表、总校文字单片材料
      this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=zxtb').subscribe((res: any[]) => {
        this.listOfSjtb = res;
      });
      this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=zxcj').subscribe((res: any[]) => {
        this.listOfSjcj = res;
      });
      this.http.get('http://139.224.62.102:8080/api/wzfile/files?fileType=zxwz').subscribe((res: any[]) => {
        this.listOfFile = res;
      });
      // 加载 end------------------------------------------
    } else {
      // 分校的不加载部门，只显示一个分校
      children.push({ id: 1, status: true, bno: 'fx', bname: '分校评估无需选择部门' });
      this.listOfDept = children;
      this.listOfSelectedDept = ['fx'];
      // 加载 分校数据填报表、分校数据采集表、分校文字单片材料
      this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=fxtb').subscribe((res: any[]) => {
        this.listOfSjtb = res;
      });
      this.http.get('http://139.224.62.102:8080/api/data/tables?dtType=fxcj').subscribe((res: any[]) => {
        this.listOfSjcj = res;
      });
      this.http.get('http://139.224.62.102:8080/api/wzfile/files?fileType=fxwz').subscribe((res: any[]) => {
        this.listOfFile = res;
      });
      // 加载 end------------------------------------------
    }

    this.validateForm = this.fb.group({});
    this.addField();
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `tjlx${id}`,
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required),
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[name];
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        document.getElementById('stepAct1').style.display = 'block';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'none';
        document.getElementById('stepAct4').style.display = 'none';

        break;
      }
      case 1: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'block';
        document.getElementById('stepAct3').style.display = 'none';
        document.getElementById('stepAct4').style.display = 'none';
        break;
      }
      case 2: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'block';
        document.getElementById('stepAct4').style.display = 'none';
        break;
      }
      case 3: {
        document.getElementById('stepAct1').style.display = 'none';
        document.getElementById('stepAct2').style.display = 'none';
        document.getElementById('stepAct3').style.display = 'none';
        document.getElementById('stepAct4').style.display = 'block';
        break;
      }
      default: {
        // this.index = 'error';
      }
    }
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log(this.validateForm.value);
    console.log('done');
  }
  close(res: any) {
    this.modal.close(res);
  }
}
