import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sysdata-zx-handupdatatable-view',
  templateUrl: './view.component.html',
})
export class SysdataZxHandupdatatableViewComponent implements OnInit {
  record: any = {};
  i: any;
  Catcha: SafeHtml;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.Catcha = this.sanitizer.bypassSecurityTrustHtml(this.record.tableHtml);
    // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
  }

  close() {
    this.modal.destroy();
  }
}
