import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sysdata-datalist',
  templateUrl: './datalist.component.html',
})
export class SysdataDatalistComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  tabs = [
    '评估类别',
    '评估阶段',
    '评估周期',
    '统计类型',
    '图表',
    '数据来源',
    '职称',
    '学历',
    '学位',
    '职工类型',
    '工作性质',
    '高水平团队',
    '高水平人才',
    '合作办学单位性质',
  ];
  tabsY = [
    'pglb',
    'pgjd',
    'pgzq',
    'tjlx',
    'tbzl',
    'sjly',
    'zc',
    'xl',
    'xw',
    'zglx',
    'gzxz',
    'gsptd',
    'gsprc',
    'hzdwxz',
  ];

  showDatas: any[] = [];
  listOfData: any[] = [];

  changeDataSet(index: number): void {
    console.log(index);

    this.http.get('http://139.224.62.102:8080/api/data/types?typeNo=' + this.tabsY[index]).subscribe((res: any[]) => {
      this.showDatas = res;
    });
  }

  ngOnInit() {
    this.http.get('http://139.224.62.102:8080/api/data/types?typeNo=pglb').subscribe((res: any[]) => {
      this.showDatas = res;
    });
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
