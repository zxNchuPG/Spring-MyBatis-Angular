import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'first', component: FirstComponent },
  { path: 'edit/:id', component: EditComponent, data: { title: "编辑用户信息", formStatus: 1 } },
  { path: 'add', component: EditComponent, data: { title: "新增用户信息", formStatus: 0 } },
  { path: 'search', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyngRoutingModule { }
