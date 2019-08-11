import { NzFormatEmitEvent, NzMessageService, NzModalService, NzDrawerService } from 'ng-zorro-antd';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SysdataAuthlistEditComponent } from './edit/edit.component';
import { SysdataAuthlistAddComponent } from './add/add.component';
import { SysdataAuthlistUdrawerComponent } from './udrawer/udrawer.component';

@Component({
  selector: 'app-sysdata-authlist',
  templateUrl: './authlist.component.html',
  styleUrls: ['./authlist.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SysdataAuthlistComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
  ) {}
  NzTreeNodeOptions: any;
  visible = false;
  listOfData: any[] = [];
  value: string;

  // @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;

  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/units').subscribe((res: any[]) => {
      this.listOfData = res;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.loadInfo();
  }

  addInfo() {
    this.modal.create(SysdataAuthlistAddComponent, { size: 'md' }).subscribe((res: any) => {
      console.log('success add user');
      this.loadInfo();
    });
  }

  editInfo(record) {
    this.modal.create(SysdataAuthlistEditComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  deleteConfirm(id: number): void {
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>删除数据后无法恢复，确认要删除？</b>',
      nzOnOk: () => this.deleteInfo(id),
    });
  }

  deleteInfo(id: number) {
    this.http.delete('http://139.224.62.102:8080/api/units/' + id).subscribe((res: any) => {
      this.msgSrv.success('删除用户成功');
      this.cdr.detectChanges();
      this.loadInfo();
    });
  }

  openComponent(record: any): void {
    const drawerRef = this.drawerService.create<SysdataAuthlistUdrawerComponent, { value: string }, string>({
      nzTitle: '【' + record.unitName + '】权限设置',
      nzWidth: 360,
      // nzClosable: false,
      nzContent: SysdataAuthlistUdrawerComponent,
      nzContentParams: {
        // value: this.value,
        value: record.unitNo,
      },
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log('关闭=' + data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  // openDrawer(record): void {
  //   // this.loadTreeInfo(record.unitNo);
  //   // console.log(record.unitName);
  //   this.visible = true;  }

  // closeDrawer(): void {
  //   this.visible = false;
  // }
}
