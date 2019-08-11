import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { XlsxService } from '@delon/abc';

@Component({
  selector: 'app-auditstep-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.less'],
})
export class AuditstepDataUploadComponent implements OnInit {
  constructor(private http: _HttpClient, private xlsx: XlsxService, private modal: ModalHelper) {}

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
  data: any;
  mapOfExpandData: { [key: string]: boolean } = {};
  listOfData = [
    {
      id: 2,
      name: '表2.总校教师基本情况',
      enname: 'branchinfo',
      age: 17,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；<br>2020年分校办学水平填报；',
    },
    {
      id: 3,
      name: '表3.总校教师基本信息',
      enname: 'branchinfo',
      age: 12,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；',
    },
    {
      id: 4,
      name: '表4.专职工作人员基本信息',
      enname: 'branchinfo',
      age: 13,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；',
    },
    {
      id: 5,
      name: '表5.辅导员基本信息',
      enname: 'branchinfo',
      age: 22,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；<br>2020年分校办学水平填报；',
    },
    {
      id: 6,
      name: '表6.高水平团队基本情况',
      enname: 'branchinfo',
      age: 20,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；<br>2020年分校办学水平填报；',
    },
    {
      id: 7,
      name: '表7.高水平人才基本情况',
      enname: 'branchinfo',
      age: 19,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；<br>2020年分校办学水平填报；',
    },
    {
      id: 14,
      name: '表14.各类教师获奖情况',
      enname: 'branchinfo',
      age: 14,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；<br>2020年分校办学水平填报；',
    },
    {
      id: 15,
      name: '表15.师生国际交流情况',
      enname: 'branchinfo',
      age: 14,
      expand: false,
      address: '对应《总校办学水平评估指标》1-2；',
      address1: '最后修改时间：2019-09-02 10:57:02',
      description: '2019年总校办学水平填报；<br>2019年分校办学水平填报；<br>2020年分校办学水平填报；',
    },
  ];
  fileList = [
    {
      uid: 1,
      name: '文件资料1.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: 2,
      name: '文件资料2.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: 3,
      name: '文件资料3.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ];
  visible = false;
  outvisible = false;
  invisible = false;
  users: any[] = Array(9)
    .fill({})
    .map((_item: any, idx: number) => {
      return {
        id: idx + 1,
        name: `name ${idx + 1}`,
        age: Math.ceil(Math.random() * 10) + 20,
      };
    });
  columns: STColumn[] = [{ title: '编号', index: 'id', type: 'checkbox' }, { title: '字段', index: 'name' }];
  url() {
    this.xlsx.import(`./assets/demo.xlsx`).then(res => (this.data = res));
  }

  download() {
    const data = [this.columns.map(i => i.title)];
    this.users.forEach(i => data.push(this.columns.map(c => i[c.index as string])));
    this.xlsx.export({
      sheets: [
        {
          data,
          name: 'sheet name',
        },
      ],
    });
  }

  change(e: Event) {
    const node = e.target as HTMLInputElement;
    this.xlsx.import(node.files![0]).then(res => (this.data = res));
    node.value = '';
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openout(): void {
    this.outvisible = true;
  }

  closeout(): void {
    this.outvisible = false;
  }

  openin(): void {
    this.invisible = true;
  }

  closein(): void {
    this.invisible = false;
  }
  ngOnInit() {}

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
}
