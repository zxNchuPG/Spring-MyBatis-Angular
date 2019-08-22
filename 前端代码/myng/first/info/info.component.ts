import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-myng-first-info',
  templateUrl: './info.component.html',
})
export class MyngFirstInfoComponent implements OnInit {
  record: any = {};
  user: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void { }

  close() {
    this.modal.destroy();
  }
}
