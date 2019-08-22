import { OnInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
    title: string;
    form: FormGroup;
    formStatus = 0;//页面状态，0：新增，1：编辑(数据来自模块路由配置那个data)
    nzDisabled = false;
    numberValidate = false;
    Disabled = true;
    loading: boolean = false;
    headers: HttpHeaders = new HttpHeaders();
    entity: any = {};
    constructor(
        private fb: FormBuilder,
        private httpBaseService: _HttpClient,
        private httpclient: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: NzMessageService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
    ) {
        this.createForm();
    }
    createForm() {
        this.form = this.fb.group({
            id: [null],
            age: [null, [Validators.required]],
            name: [null, [Validators.required]],
        });
    }
    ngOnInit() {
        let routeDate = this.route.data['value'];
        this.formStatus = routeDate.formStatus;
        this.title = routeDate.title;
        if (this.formStatus == 1) { //编辑
            this.route.paramMap.pipe(switchMap((params: ParamMap) => {
                let id = params.get("id");
                this.nzDisabled = false;
                return this.httpclient.get<any>("users/findUsersById", { params: { id: id }, headers: this.headers });
            })).subscribe((res) => {
                this.entity = res;
                this.setForm();
            });
        } else {    //增加
            // this.entity = new MaterialGroup();
            //不用setForm 是因为没有MaterialGroup对象，entity未初始化,在setForm中使用id,name,age抛undefined异常
            this.setForm2();
            this.nzDisabled = false;
        }
    }

    setForm() {
        this.form.reset({
            id: this.entity.id,
            age: this.entity.age,
            name: this.entity.name,
        });
    }
    setForm2() {
        this.form.reset({
            id: "",
            name: "",
            age: "",
        });
    }
    _submitForm() {
        for (let i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        if (this.form.invalid) {
            this.loading = false;
            return;
        }
        let uri = "";
        let methodType = "post";
        const token = this.tokenService.get();

        // const saveEntity: MaterialGroup = new MaterialGroup();
        const saveEntity: any = {};
        saveEntity.name = this.form.value.name;
        saveEntity.age = this.form.value.age;

        if (this.formStatus == 0) {//新增
            uri = "users/addUser";
        } else {//编辑
            uri = "users/editUsers";
            saveEntity.id = this.entity.id;
        }

        this.httpBaseService.request(methodType, uri, { body: saveEntity }).subscribe(
            (res: any) => {
                this.messageService.success("保存成功");
                // this.ngOnInit();
                this.router.navigate(['/myng/first']);
            }, err => {
                this.messageService.success("保存失败");
                this.loading = false
                this.ngOnInit();
            }
        );
    }
}