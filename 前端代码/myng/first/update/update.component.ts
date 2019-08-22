import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myng-first-update',
  templateUrl: './update.component.html',
})
export class MyngFirstUpdateComponent implements OnInit {
  record: any = {};
  user: any;
  form: FormGroup;
  headers: HttpHeaders = new HttpHeaders();
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private httpclient: HttpClient,
    private fb: FormBuilder
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
  ngOnInit(): void {
    //user已经从上个页面取值( paramName: 'user')
    // this.httpclient.get<any>("users/findUsersById", { params: { id: this.user.id }, headers: this.headers }).subscribe(res => this.user = res);
    this.setForm();
  }

  setForm() {
    this.form.reset({
      id: this.user.id,
      age: this.user.age,
      name: this.user.name,
    });
  }

  submit() {
    this._submitForm();
  }
  _submitForm() {
    let uri = "users/editUsers";
    let methodType = "post";
    const saveEntity: any = {};
    saveEntity.name = this.form.value.name;
    saveEntity.age = this.form.value.age;
    saveEntity.id = this.user.id;
    this.http.request(methodType, uri, { body: saveEntity }).subscribe(
      (res: any) => {
        this.msgSrv.success("保存成功");
        this.modal.close(this.user);
      }, err => {
        this.msgSrv.success("保存失败");
        this.close();
      }
    );
  }
  close() {
    this.modal.destroy();
  }
}
