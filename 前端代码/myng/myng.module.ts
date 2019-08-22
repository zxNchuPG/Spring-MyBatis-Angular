import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { MyngRoutingModule } from './myng-routing.module';
import { FirstComponent } from './first/first.component';
import { EditComponent } from './edit/edit.component';
import { MyngFirstInfoComponent } from './first/info/info.component';
import { MyngFirstUpdateComponent } from './first/update/update.component';

const COMPONENTS = [
  FirstComponent,
  EditComponent
];
const COMPONENTS_NOROUNT = [
  MyngFirstInfoComponent,
  MyngFirstUpdateComponent];

@NgModule({
  imports: [
    SharedModule,
    MyngRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MyngModule { }
