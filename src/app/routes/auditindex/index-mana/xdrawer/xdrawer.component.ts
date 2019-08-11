import {
  NzFormatEmitEvent,
  NzMessageService,
  NzModalService,
  NzDrawerRef,
  NzDrawerService,
  NzTreeNode,
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

import { AuditindexIndexManaIdaddComponent } from './idadd/add.component';
import { AuditindexIndexManaIdeditComponent } from './idedit/edit.component';
import { AuditindexIndexManaIdotherSetUpComponent } from './idother/setup.component';
import { AuditindexIndexManaSetUpComponent } from './setlist/setup.component';

@Component({
  selector: 'app-auditindex-index-mana-xdrawer',
  templateUrl: './xdrawer.component.html',
  styleUrls: ['./xdrawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditindexIndexManaXdrawerComponent implements OnInit {
  activedNode: NzTreeNode;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private drawerRef: NzDrawerRef<string>,
    private nzContextMenuService: NzContextMenuService,
  ) {}

  searchValue = '';
  defaultExpandedKeys = ['0'];
  value: string;

  nodes: any = [];
  // nodes = [
  //   {
  //     title: '上海开放大学整体办学水平评估指标体系（2019版）',
  //     key: '0',
  //     expanded: true,
  //     children: [
  //       {
  //         title: 'A.?办学方向与管理水平',
  //         key: '0-0',
  //         expanded: true,
  //         children: [
  //           {
  //             title: 'A1.办学方向',
  //             key: '000',
  //             expanded: true,
  //             children: [
  //               { title: 'K1.党对高校全面领导的落实情况', key: '0000', isLeaf: true, isZtar: true },
  //               { title: 'K2.学校思政工作与立德树人根本任务的落实情况', key: '0001', isLeaf: true, isZtar: true },
  //               { title: 'K3.上海特点中国特色世界水平一流开放大学办学定位', key: '0002', isLeaf: true, isZtar: true },
  //               { title: 'K4.正确处理好学历教育/非学历教育与社区教育', key: '0003', isLeaf: true, isZtar: true },
  //             ],
  //           },
  //           {
  //             title: 'A2.管理水平',
  //             key: 'A0102',
  //             children: [
  //               { title: 'K5.规划管理水平', key: '0010', isLeaf: true, isZtar: false },
  //               { title: 'K6.办学系统管理水平', key: '0011', isLeaf: true, isZtar: true },
  //               { title: 'K7.教学质量保障水平', key: '0012', isLeaf: true, isZtar: true },
  //               { title: 'K8.财务管理水平', key: '0013', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         title: 'B.办学条件与资源',
  //         key: 'B01',
  //         children: [
  //           {
  //             title: 'B1.人才队伍',
  //             key: 'B0101',
  //             children: [
  //               { title: 'K9.师资队伍的数量与结构', key: '0100', isLeaf: true, isZtar: false },
  //               { title: 'K10.管理队伍的数量与结构', key: '0101', isLeaf: true, isZtar: false },
  //               { title: 'K11.双师型与社会兼职教师占比', key: '0102', isLeaf: true, isZtar: true },
  //               { title: 'K12.高水平人才与团队情况', key: '0103', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //           {
  //             title: 'B2.支撑平台',
  //             key: 'B0102',
  //             children: [
  //               { title: 'K13.合作办学项目数', key: '0110', isLeaf: true, isZtar: true },
  //               { title: 'K14.具有重要影响力的开放教育类期刊', key: '0111', isLeaf: true, isZtar: true },
  //               { title: 'K15.信息化基础设施及平台建设', key: '0112', isLeaf: true, isZtar: true },
  //               { title: ' K16.省部级及以上教学科研平台数', key: '0113', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //           {
  //             title: 'B3.教学资源',
  //             key: 'B0103',
  //             children: [
  //               { title: 'K17.教学仪器设备值', key: '0120', isLeaf: true, isZtar: false },
  //               { title: 'K18.(含虚拟)实验室/实训室数', key: '0121', isLeaf: true, isZtar: false },
  //               { title: 'K19.电子图书资源建设', key: '0122', isLeaf: true, isZtar: false },
  //               { title: 'K20.专业布局与优化', key: '0123', isLeaf: true, isZtar: true },
  //               { title: 'K21.课程建设', key: '0124', isLeaf: true, isZtar: true },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         title: 'C.办学质量与水平',
  //         key: 'C01',
  //         children: [
  //           {
  //             title: 'C1.人才培养',
  //             key: 'C0101',
  //             children: [
  //               { title: 'K22.学生培养规模', key: '0200', isLeaf: true, isZtar: false },
  //               { title: 'K23.高水平师资为学生上课比例', key: '0201', isLeaf: true, isZtar: false },
  //               { title: 'K24.学生获国内外奖项数', key: '0202', isLeaf: true, isZtar: false },
  //               { title: 'K25.毕业率、学位获得率与流失率', key: '0203', isLeaf: true, isZtar: true },
  //             ],
  //           },
  //           {
  //             title: 'C2.创新成果',
  //             key: 'C0102',
  //             children: [
  //               { title: 'K26.承担国家和地方改革试点与合作情况', key: '0210', isLeaf: true, isZtar: true },
  //               { title: 'K27.教学成果奖获奖数', key: '0211', isLeaf: true, isZtar: false },
  //               { title: 'K27.省部级及以上科研奖项数', key: '0212', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //           {
  //             title: 'C3.国际交流',
  //             key: 'C0103',
  //             children: [
  //               { title: 'K29.开放教育领域国际影响力', key: '0220', isLeaf: true, isZtar: true },
  //               { title: 'K30.师生国际交流开展情况', key: '0221', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //           {
  //             title: 'C4.社会服务',
  //             key: 'C0104',
  //             children: [
  //               { title: 'K31.上海社区教育与学习型社会建设情况', key: '0230', isLeaf: true, isZtar: true },
  //               { title: 'K32.“学分银行”实施情况', key: '0231', isLeaf: true, isZtar: true },
  //               { title: 'K33.社会培训与考试服务人时数', key: '0232', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         title: 'D.办学声誉与特色',
  //         key: 'D01',
  //         children: [
  //           {
  //             title: 'D1.办学声誉',
  //             key: 'D0101',
  //             children: [
  //               { title: 'K34.学习者满意度', key: '0300', isLeaf: true, isZtar: true },
  //               { title: 'K35.社会知晓度与认可度', key: '0301', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //           {
  //             title: 'D2.办学特色',
  //             key: 'D0102',
  //             children: [
  //               { title: 'K36.办学特色', key: '0310', isLeaf: true, isZtar: true },
  //               { title: '0-3-1-1', key: '0311', isLeaf: true, isZtar: false },
  //               { title: '0-3-1-2', key: '0312', isLeaf: true, isZtar: false },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo(): void {
    console.log('hello=' + this.value);
    this.http.get('http://139.224.62.102:8080/api/indexes/' + this.value).subscribe((res: any) => {
      this.nodes = res.nodes;
      console.log(this.nodes);
      this.cdr.detectChanges();
    });
  }

  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  // add indexes
  addInfo(activeNode: any): void {
    activeNode.verIndex = this.value;
    this.modal.create(AuditindexIndexManaIdaddComponent, { activeNode }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }
  // 修改指标
  editInfo(activeNode: any[]) {
    // activeNode.verIndex = this.value;
    this.modal.create(AuditindexIndexManaIdeditComponent, { activeNode }, { size: 'lg' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  deleteConfirm(activedNode: any): void {
    console.log(activedNode);
    this.modalService.confirm({
      nzTitle: '<i>是否要删除数据</i>',
      nzContent: '<b>连同该指标下全部指标将删除，确认要删除吗？</b>',
      nzOnOk: () => this.deleteInfo(activedNode.origin.id),
    });
  }

  deleteInfo(key: number) {
    // console.log(key);
    this.http.delete('http://139.224.62.102:8080/api/indexes/' + key).subscribe((res: any) => {
      this.msgSrv.success('删除指标成功');
      this.loadInfo();
    });
  }

  viewInfo(record: any[]) {
    // this.modal.create(AuditindexIndexManaViewComponent, { record }, { size: 'lg' }).subscribe((res: any) => {
    //   this.loadInfo();
    // });
  }

  setContent(activeNode: any): void {
    // 设置属性类别：01对应部门，
    // 02对应总校数据同步采集表， 03对应总校数据填报表， 04对应总校上传文件资料；
    // 05对应分校数据采集表，06对应分校填报表，07对于应分校上传资料；
    // 08对应数据统计分析项，09对应设置的指标阀值，10对应数据统计图表种类；
    activeNode.verIndex = this.value;
    this.modal.create(AuditindexIndexManaSetUpComponent, { activeNode }, { size: 'xl' }).subscribe((res: any) => {
      this.loadInfo();
    });
  }

  setOther(activeNode: any): void {
    // 设置属性类别：01对应部门，
    // 02对应总校数据同步采集表， 03对应总校数据填报表， 04对应总校上传文件资料；
    // 05对应分校数据采集表，06对应分校填报表，07对于应分校上传资料；
    // 08对应数据统计分析项，09对应设置的指标阀值，10对应数据统计图表种类；
    activeNode.verIndex = this.value;
    this.modal
      .create(AuditindexIndexManaIdotherSetUpComponent, { activeNode }, { size: 'lg' })
      .subscribe((res: any) => {
        this.loadInfo();
      });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
