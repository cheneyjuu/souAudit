import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
// import { STColumn, STComponent } from '@delon/abc';
// import { SFSchema } from '@delon/form';

import { SysdataModlistViewComponent } from './view/view.component';
import { SysdataModlistEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-sysdata-modlist',
  templateUrl: './modlist.component.html',
  styleUrls: ['./modlist.component.less'],
})
export class SysdataModlistComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  visible = false;
  listOfData: any[] = [];

  // @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;

  loadInfo(): void {
    this.http.get('http://139.224.62.102:8080/api/menus/list').subscribe((res: any[]) => {
      this.listOfData = res;
      // this.cdr.detectChanges() 这句一定要加，否则列表不会刷新，导致看不到数据
      // this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.loadInfo();
  }

  openInfo(record) {
    this.modal.create(SysdataModlistViewComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }
}
