import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-auditindex-index-rule',
  templateUrl: './index-rule.component.html',
})
export class AuditindexIndexRuleComponent implements OnInit {
  // url = `/user`;
  // searchSchema: SFSchema = {
  //   properties: {
  //     no: {
  //       type: 'string',
  //       title: '编号'
  //     }
  //   }
  // };
  // @ViewChild('st') st: STComponent;
  // columns: STColumn[] = [
  //   { title: '编号', index: 'no' },
  //   { title: '调用次数', type: 'number', index: 'callNo' },
  //   { title: '头像', type: 'img', width: '50px', index: 'avatar' },
  //   { title: '时间', type: 'date', index: 'updatedAt' },
  //   {
  //     title: '',
  //     buttons: [
  //       // { text: '查看', click: (item: any) => `/form/${item.id}` },
  //       // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
  //     ]
  //   }
  // ];

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [
    {
      id: 4,
      adType: '总校办学水平评估',
      adName: '上海开放大学办学水平评估体系（2021年）',
      adYear: 202103,
      expand: false,
      adStatus: '在用',
      adTimeline: '近5年数据',
      adVerion: 'sou-bxsp-zx-Ver202101',
      description: '',
    },
    {
      id: 5,
      adType: '分校办学水平评估',
      adName: '上海开放大学分校办学水平评估体系（2021年）',
      adYear: 202103,
      expand: false,
      adStatus: '在用',
      adTimeline: '近5年数据',
      adVerion: 'sou-bxsp-fx-Ver202101',
      description: '',
    },
    {
      id: 3,
      adType: '专业建设评估',
      adName: '上海开放大学专业评估体表体系（2020年）',
      adYear: 202006,
      expand: false,
      adStatus: '在用',
      adTimeline: '近6年数据',
      adVerion: 'sou-zyjs-Ver202001',
      description: '',
    },
    {
      id: 1,
      adType: '总校办学水平评估',
      adName: '上海开放大学办学水平评估体系（2019年）',
      adYear: 201909,
      expand: false,
      adStatus: '停用',
      adTimeline: '近3年数据',
      adVerion: 'sou-bxsp-zx-Ver201901',
      description: '',
    },
    {
      id: 2,
      adType: '分校办学水平评估',
      adName: '上海开放大学分校办学水平评估体系（2019年）',
      adYear: 201909,
      expand: false,
      adStatus: '停用',
      adTimeline: '近3年数据',
      adVerion: 'sou-bxsp-fx-Ver201901',
      description: '',
    },
  ];

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
