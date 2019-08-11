import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
// import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  app: any = {
    name: `souAudit`,
    description: `上海开放大学评估系统`,
  };
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  // private viaHttp(resolve: any, reject: any) {
  //   zip(this.httpClient.get('assets/tmp/app-data.json'))
  //     .pipe(
  //       catchError(([appData]) => {
  //         resolve(null);
  //         return [appData];
  //       }),
  //     )
  //     .subscribe(
  //       ([appData]) => {
  //         // Application data
  //         const res: any = appData;
  //         // Application information: including site name, description, year
  //         this.settingService.setApp(res.app);
  //         // User information: including name, avatar, email address
  //         this.settingService.setUser(res.user);
  //         // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
  //         this.aclService.setFull(true);
  //         // Menu data, https://ng-alain.com/theme/menu
  //         this.menuService.add(res.menu);
  //         // Can be set page suffix title, https://ng-alain.com/theme/title
  //         this.titleService.suffix = res.app.name;
  //       },
  //       () => {},
  //       () => {
  //         resolve(null);
  //       },
  //     );
  // }

  private viaHttp(resolve: any, reject: any) {
    zip(this.httpClient.get('http://139.224.62.102:8080/api/menus/'), this.httpClient.get('/user/current'))
      .pipe(
        catchError(([appData, accountData]) => {
          resolve(null);
          return [appData];
        }),
      )
      .subscribe(
        ([appData, accountData]) => {
          // Application data
          const res: any = appData;
          // Application information: including site name, description, year
          this.settingService.setApp(this.app);
          // User information: including name, avatar, email address
          this.settingService.setUser({
            name: accountData.firstName,
            avatar:
              accountData.imageUrl && accountData.imageUrl.length === 0
                ? './assets/tmp/img/avatar.jpg'
                : accountData.imageUrl,
            email: accountData.email,
            authorities: accountData.authorities,
          });
          // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
          this.aclService.setFull(false);
          this.aclService.setRole(accountData.authorities);
          // Menu data, https://ng-alain.com/theme/menu
          const restMenu = [
            {
              text: '主导航',
              group: true,
              hideInBreadcrumb: true,
              children: res.menu,
            },
          ];
          this.menuService.add(restMenu);
          console.log(restMenu);

          // Can be set page suffix title, https://ng-alain.com/theme/title
          this.titleService.suffix = this.app.name;
        },
        () => {},
        () => {
          resolve(null);
        },
      );
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `souAudit`,
      description: `上海开放大学评估系统`,
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'audit@shtvu.edu.cn',
      token: '123456789',
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: '总校功能区',
        group: true,
        children: [
          {
            text: '组织结构管理',
            // link: '/sysorg',
            icon: { type: 'icon', value: 'anticon-cluster' },
            children: [
              {
                text: '总校职能部门',
                link: '/sysdata/orgdepartment',
                // i18n: 'menu.dashboard.v1',
              },
              {
                text: '分校信息管理',
                link: '/sysdata/orgbranch',
                // i18n: 'menu.dashboard.analysis',
              },
              {
                text: '用户列表管理',
                link: '/sysdata/userlist',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
          {
            text: '数据材料清单',
            // link: '/sysorg',
            icon: { type: 'icon', value: 'appstore' },
            children: [
              {
                text: '总校采集表',
                link: '/sysdata/zx-synchdatatable',
                // i18n: 'menu.dashboard.v1',
              },
              {
                text: '总校填报表',
                link: '/sysdata/zx-handupdatatable',
                // i18n: 'menu.dashboard.analysis',
              },
              {
                text: '总校材料单',
                link: '/sysdata/zx-handupfile',
                // i18n: 'menu.dashboard.monitor',
              },
              {
                text: '分校采集表',
                link: '/sysdata/fx-synchdatatable',
                // i18n: 'menu.dashboard.v1',
              },
              {
                text: '分校填报表',
                link: '/sysdata/fx-handupdatatable',
                // link: '/sysdata/fx-handupdatatable',
                // i18n: 'menu.dashboard.analysis',
              },
              {
                text: '分校材料单',
                link: '/sysdata/fx-handupfile',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
          {
            text: '评估指标体系',
            // link: '/sysorg',
            icon: { type: 'icon', value: 'anticon-menu-unfold' },
            children: [
              {
                text: '评估指标管理',
                link: '/auditindex/index-mana',
                // i18n: 'menu.dashboard.v1',
              },
              {
                text: '指标评估规则',
                link: '/auditindex/index-rule',
                // i18n: 'menu.dashboard.analysis',
              },
              {
                text: '指标评估范本',
                link: '/auditindex/index-file',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
          {
            text: '总校评估过程',
            // link: '/sysorg',
            icon: { type: 'icon', value: 'anticon-bank' },
            children: [
              {
                text: '评估任务管理',
                link: '/auditstep/ad-start',
                // i18n: 'menu.dashboard.v1',
              },
              {
                text: '数据采集管理',
                link: '/auditstep/data-synch',
                // i18n: 'menu.dashboard.analysis',
              },
              {
                text: '部门数据填报',
                link: '/auditstep/data-upload',
                // i18n: 'menu.dashboard.monitor',
              },
              {
                text: '部门数据审核',
                link: '/auditstep/data-checkup',
                // i18n: 'menu.dashboard.monitor',
              },
              {
                text: '评估报告预览',
                link: '/auditstep/p-preview',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
          {
            text: '分校评估过程',
            // link: '/sysorg',
            icon: { type: 'icon', value: 'anticon-branches' },
            children: [
              {
                text: '分校数据填报',
                link: '/fxaudit/data-upload',
                // i18n: 'menu.dashboard.monitor',
              },
              {
                text: '分校数据审核',
                link: '/fxaudit/data-checkup',
                // i18n: 'menu.dashboard.monitor',
              },
              {
                text: '分校报告预览',
                link: '/fxaudit/f-preview',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
          {
            text: '专家网上评审',
            link: '/webreview/viewindex',
            icon: { type: 'icon', value: 'audit' },
            shortcutRoot: true,
          },
          {
            text: '评估报告概览',
            link: '/auditreport/fileshow',
            icon: { type: 'icon', value: 'file-ppt' },
            shortcutRoot: true,
          },
          {
            text: '领导层驾驶舱',
            link: '/dashboard',
            icon: { type: 'icon', value: 'windows' },
            // shortcutRoot: true,
            children: [
              {
                text: '仪表盘',
                link: '/leadboard/v1',
                // i18n: 'menu.dashboard.monitor',
              },
              {
                text: '分析页',
                link: '/leadboard/v1',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
          {
            text: '系统基础管理',
            // link: '/sysdata',
            icon: { type: 'icon', value: 'setting' },
            children: [
              {
                text: '系统菜单管理',
                link: '/sysdata/modlist',
                // i18n: 'menu.dashboard.v1',
              },
              {
                text: '角色权限设置',
                link: '/sysdata/authlist',
                // i18n: 'menu.dashboard.analysis',
              },
              {
                text: '基础数据设置',
                link: '/sysdata/datalist',
                // i18n: 'menu.dashboard.monitor',
              },
            ],
          },
        ],
      },
    ]);

    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMock(resolve, reject);
    });
  }
}
