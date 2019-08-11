import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-auditstep-data-synch',
  templateUrl: './data-synch.component.html',
})
export class AuditstepDataSynchComponent implements OnInit {
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
  typescript;
  salesData: any[] = new Array(12).fill({}).map((_i, idx) => ({
    x: `${idx + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  }));

  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [
    {
      id: 1,
      name: '分校基本信息',
      enname: 'branchinfo',
      age: 5,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 2,
      name: '行政班信息',
      enname: 'branchinfo',
      age: 17,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 3,
      name: '专业业培养计划信息',
      enname: 'branchinfo',
      age: 12,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 4,
      name: '课程基本信息',
      enname: 'branchinfo',
      age: 13,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 5,
      name: '学生基本信息',
      enname: 'branchinfo',
      age: 22,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 6,
      name: '专业基本信息',
      enname: 'branchinfo',
      age: 20,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 7,
      name: '学期开课信息',
      enname: 'branchinfo',
      age: 19,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 8,
      name: '分校学期开课信息',
      enname: 'branchinfo',
      age: 22,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 9,
      name: '学期教学班级信息',
      enname: 'branchinfo',
      age: 12,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 10,
      name: '学期教学班级学生信息',
      enname: 'branchinfo',
      age: 15,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 11,
      name: '毕业生总表',
      enname: 'branchinfo',
      age: 18,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 12,
      name: '计划内课程信息表',
      enname: 'branchinfo',
      age: 14,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
    {
      id: 13,
      name: '教师信息总表',
      enname: 'branchinfo',
      age: 14,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      description: '最近同步时间:2019-07-01 00:00:00；字段2019-07-01更新；共44条数据。',
    },
  ];
  salesPieData = [
    {
      x: '市区',
      y: 4544,
    },
    {
      x: '郊区',
      y: 3321,
    },
    {
      x: '行业',
      y: 3113,
    },
    {
      x: '非学历培训',
      y: 2341,
    },
    {
      x: '社区教育',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];
  total: string;

  visible = false;
  bvisible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  open1(): void {
    this.bvisible = true;
  }

  close1(): void {
    this.bvisible = false;
  }

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
