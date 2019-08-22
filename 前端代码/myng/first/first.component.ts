import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STChange, STData, STComponent } from '@delon/abc';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MyngFirstInfoComponent } from './info/info.component';
import { MyngFirstUpdateComponent } from './update/update.component';

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
})
export class FirstComponent implements OnInit {
    loading: boolean = false;
    nzDisabled = false;
    uri = "users/findUsersAll";
    headers: HttpHeaders = new HttpHeaders();
    checkedList: Array<any>;
    delectList: Array<any>;
    editData: any;
    form: FormGroup;
    data: any[] = [];
    @ViewChild('st', { static: true })
    st: STComponent;
    selectedRows: STData[] = [];
    columns: STColumn[] = [
        { title: "勾选", index: "id", type: "checkbox", width: "30px" },
        { title: '编号', index: 'id' },
        { title: '姓名', index: 'name' },
        { title: '年龄', index: 'age' },
        {
            title: '操作', width: "100px",
            buttons: [
                {
                    text: '查看',
                    type: 'modal',
                    component: MyngFirstInfoComponent,
                    paramName: 'user',
                },
                {
                    text: '编辑',
                    type: 'modal',
                    component: MyngFirstUpdateComponent,
                    paramName: 'user',
                    click: () => this.getData(),//回调,模态框需要有返回值才会调用
                },
                {
                    text: '删除',
                    type: 'del',
                    paramName: 'user1',
                    click: (user1: any) => this.httpclient.get<any>("users/delUserById",
                        { params: { id: user1.id }, headers: this.headers }).subscribe(res => {
                            if (res.sum == 1) {
                                this.messageService.success("删除成功");
                            }
                            this.getData();
                        }),
                },
            ],
        },
    ];

    constructor(
        private httpBaseServise: _HttpClient,
        private router: Router,
        private messageService: NzMessageService,
        private httpclient: HttpClient,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private modal: ModalHelper,
    ) {
        this.createForm();
    }
    createForm() {
        this.form = this.fb.group({
            fid: [null],
            fage: [null],
            fname: [null],
        });
    }
    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = true;
        this.httpBaseServise.get(this.uri).subscribe(res => {
            this.data = res;
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    add() {
        this.router.navigate(['/myng/add']);
    }

    edit() {
        if (this.checkedList != null && this.checkedList.length > 0) {
            this.messageService.info("选中" + this.checkedList.length + "条数据" + "\n" + "默认编辑第一条");
            this.editData = this.checkedList[0];
            this.router.navigate(['/myng/edit', this.editData.id])
        } else {
            this.messageService.warning("请至少勾选一条数据");
        }
    }

    delete() {
        if (this.checkedList != null && this.checkedList.length > 0) {
            //注释部分只能删除多选的第一个用户
            // this.editData = this.checkedList[0];
            // this.httpclient.get<any>("users/delUserById", { params: { id: this.editData.id }, headers: this.headers })
            //     .subscribe(res => {
            //         this.messageService.success("删除成功");
            //         // this.st.load(1);
            //         this.getData();
            //     })
            this.delectList = this.checkedList;
            this.httpBaseServise.request("post", "users/batchDelUser", { body: this.delectList }).subscribe(
                (res: any) => {
                    this.messageService.success("删除" + res.sum + "条数据");
                    this.getData();
                }
            );
        } else {
            this.messageService.warning("请至少勾选一条用户数据");
        }

    }

    stChange(e: STChange) {
        switch (e.type) {
            case 'checkbox':
                this.selectedRows = e.checkbox!;
                this.checkedList = e.checkbox!;
                this.cdr.detectChanges();
                break;
        }
    }

    search() {
        this.loading = true;
        const searchEntity: any = {};
        searchEntity.id = this.form.value.fid;
        searchEntity.name = this.form.value.fname;
        searchEntity.age = this.form.value.fage;
        this.httpBaseServise.request("post", "users/search", { body: searchEntity }).subscribe(
            (res: any) => {
                this.data = res;
                this.cdr.detectChanges();
                this.loading = false;
            }
        );
    }
}
