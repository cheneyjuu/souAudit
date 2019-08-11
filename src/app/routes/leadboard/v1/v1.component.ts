import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-leadboard-v1',
  templateUrl: './v1.component.html',
})
export class LeadboardV1Component implements OnInit {
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
  chartData: any[] = [];
  radarData: any[] = [];

  salesPieData = [
    {
      x: '家用电器',
      y: 4544,
    },
    {
      x: '食用酒水',
      y: 3321,
    },
    {
      x: '个护健康',
      y: 3113,
    },
    {
      x: '服饰箱包',
      y: 2341,
    },
    {
      x: '母婴产品',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];
  total: string;

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {
    for (let i = 0; i < 20; i += 1) {
      this.chartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }

    this.total = `&yen ${this.salesPieData.reduce((pre, now) => now.y + pre, 0).toFixed(2)}`;

    const radarOriginData = [
      {
        name: '个人',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7,
      },
      {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
      },
      {
        name: '部门',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
      },
    ];
    const radarTitleMap = {
      ref: '引用',
      koubei: '口碑',
      output: '产量',
      contribute: '贡献',
      hot: '热度',
    };
    radarOriginData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'name') {
          this.radarData.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key],
          });
        }
      });
    });
  }

  format(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
